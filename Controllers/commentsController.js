const Comments = require('../models/Comments')

class CommentsController{

    async addComment(req, res) {
        try {
            const {postID, commentData} = req.body
            const comment = Comments({
                creator_id: req.user.id,
                post_id: postID,
                commentData: commentData,
                date: Date.now()})
            await comment.save()
            return res.json("success")
        }catch (e) {
            console.log(e)
        }
    }

    async delComment(req, res) {
        try {
            await Comments.deleteOne({_id: req.body.commentId})
            return res.json("success")
        }catch (e) {
            console.log(e)
        }
    }

    async getPostComments(req, res) {
        try {
            const comments = await Comments.find({post_id: req.body.postID})
                .populate('creator_id')
                .sort({'date': 1})
            const commentsList = []
            comments.forEach(element => {
                commentsList.push({
                    creatorID: element.creator_id._id,
                    creatorName: element.creator_id.username,
                    creatorImg: element.creator_id.userPic,
                    postID: element._id,
                    commentData: element.commentData,
                    date: element.date,
                    yours: (req.user.id === element.creator_id._id.toString())
                })
            })
            return res.json(commentsList)
        }catch (e) {
            console.log(e)
        }
    }
}

module.exports = new CommentsController()