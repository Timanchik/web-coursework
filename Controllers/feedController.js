const Posts = require('../models/Posts')
const Subscribers = require('../models/Subscribers')
const Likes = require("../models/Likes")
const Comments = require('../models/Comments')

class feedController{
    async getFeed(req, res){
        try{
            const subscription = await Subscribers.find({followerId: req.user.id})
            const followedList = []
            subscription.forEach(element => {
                followedList.push(element.followedId.toString())
            })
            if (followedList.length === 0){
                return res.json([])
            }
            const postsList = []
            const posts = await Posts.find({creator: {$in: followedList}}).sort({'date': -1}).populate('creator')
            for (const element of posts){
                const likeCheck = await Likes.findOne({post_id: element._id, user_id: req.user.id})
                const commentsCount = await Comments.find({post_id: element._id}).count()
                postsList.push({
                    _id: element._id,
                    creator: element.creator.username,
                    creatorImg: element.creator.userPic,
                    description: element.description,
                    likes: element.likes,
                    date: element.date,
                    imgUrl: element.imgUrl,
                    commentsCount: commentsCount,
                    isLike: likeCheck ? true : false
                })
            }
           return res.json(postsList)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new feedController()