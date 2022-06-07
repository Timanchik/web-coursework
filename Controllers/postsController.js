const Posts = require('../models/Posts')
const Likes = require("../models/Likes")
const Comments = require('../models/Comments')

class PostsController {
    async createPost(req, res){
       try {
           if (req.file){
               const path = req.file.path.toString().replace("public", "").replace(/\\/gi, '/')
               const {description} = req.body
               const post = Posts({creator: req.user.id, description, date: Date.now(), imgUrl: path})
               await post.save()
               return res.json("success")
           } else {
               res.json("Ошибка создания потса")
           }
       } catch (e) {
           console.log(e)
       }
    }

    async getAllPosts(req, res){
        try {

        } catch (e) {
            console.log(e)
        }
    }

    async deletePost(req, res){
       try {
           await Posts.deleteOne({_id: req.body.id})
           await Likes.deleteMany({ post_id: req.body.id})
           await Comments.deleteMany({ post_id: req.body.id})
           res.json('success')
       }
        catch (e) {
           console.log(e)
       }
    }
}

module.exports = new PostsController()