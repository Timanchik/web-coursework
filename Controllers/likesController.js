const Likes = require("../models/Likes")
const Posts = require('../models/Posts')

class likesController{
    async like(req, res){
        try {
            const checkLike = await Likes.findOne({post_id: req.body.id, user_id: req.user.id})
            if (!checkLike) {
                const newLike = Likes({post_id: req.body.id, user_id: req.user.id})
                newLike.save()
                const likesCount = await Posts.findById(req.body.id)
                await Posts.updateOne({_id: `${req.body.id}`}, {$set: {
                        likes: likesCount['likes'] + 1
                    }})
                res.json("success like")
            }
            else {
                const likesCount = await Posts.findById(req.body.id)
                await Posts.updateOne({_id: `${req.body.id}`}, {$set: {
                        likes: likesCount['likes'] - 1
                    }})
                await  Likes.deleteOne({post_id: req.body.id, user_id: req.user.id})
                res.json("success unlike")
            }
        } catch (e) {
            console.log(e)
            res.status(400).json("erorr")
        }
    }

    async getLikes(req, res){
        const likes = await Likes.find().populate('user_id').populate('post_id')
        res.json(likes)
    }
}

module.exports = new likesController()