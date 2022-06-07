const Users = require('../models/Users')
const Subscribers = require('../models/Subscribers')
const Posts = require('../models/Posts')
const Likes = require("../models/Likes")
const Comments = require('../models/Comments')

class usersController{

    async getUserByUsername(req, res){
        try {
            const user = await Users.findOne({username: req.body.username})
            if (user) {
                const subCheck = await Subscribers.findOne({followerId: req.user.id, followedId: user.id})
                let subStatus = true
                if (!subCheck) {
                    subStatus = false
                }
                const myFollowed = await Subscribers.find({followerId: user.id}).populate('followedId')
                const myFollower = await Subscribers.find({followedId: user.id}).populate('followerId')
                const subscriptions = []
                const subscribers = []
                myFollowed.forEach(element => {
                    subscriptions.push({id: element.followedId._id,
                        username: element.followedId.username,
                        userPic: element.followedId.userPic})
                })
                myFollower.forEach(element => {
                    subscribers.push({id: element.followerId._id,
                        username: element.followerId.username,
                        userPic: element.followerId.userPic})
                })
                const postsList = []
                const posts = await Posts.find({creator: user.id})
                for (const element of posts){
                    const likeCheck = await Likes.findOne({post_id: element._id, user_id: req.user.id})
                    const commentsCount = await Comments.find({post_id: element._id}).count()
                    postsList.push({
                        _id: element._id,
                        creator: element.creator,
                        description: element.description,
                        likes: element.likes,
                        date: element.date,
                        imgUrl: element.imgUrl,
                        commentsCount: commentsCount,
                        isLike: !!likeCheck
                    })
                }
                const findUser = {
                    id: user.id,
                    username: user.username,
                    aboutUser: user.aboutUser,
                    name: user.name,
                    lastName: user.lastName,
                    userPic: user.userPic,
                    subStatus: subStatus,
                    posts: postsList,
                    subscribers: subscribers,
                    subscriptions: subscriptions
                }
                res.json(findUser)
            }else {
                res.json("Пользователь не существует")
            }
        } catch (e) {
            console.log(e)
        }
    }


    async getUserById(req, res){
        try{
            const user = await Users.findById(req.body.id)
            const subCheck = await Subscribers.findOne({followerId: req.user.id, followedId: req.body.id})
            let subStatus = true
            if (!subCheck) {
                subStatus = false
            }
            const findUser = {
                id: user.id,
                username: user.username,
                aboutUser: user.aboutUser,
                name: user.name,
                lastName: user.lastName,
                userPic: user.userPic,
                subStatus: subStatus,
            }
            res.json(findUser)
        } catch (e) {
            console.log(e)
        }
    }

    async getUserData(req, res){
        try {
            const user = await Users.findById(req.user.id)
            const posts = await Posts.find({creator: user._id})
            const myFollowed = await Subscribers.find({followerId: req.user.id})
            const myFollower = await Subscribers.find({followedId: req.user.id})
            const subscriptions = []
            const subscribers = []
            for (const element of myFollowed) {
                subscriptions.push({id: element['followedId'], username: element['followedName']})
            }
            for (const element of myFollower) {
                subscribers.push({id: element['followerId'], username: element['followerName']})
            }
            const findUser = {
                id: user.id,
                username: user.username,
                aboutUser: user.aboutUser,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                userPic: user.userPic,
                posts: posts,
                subscribers: subscribers,
                subscriptions: subscriptions
            }
            res.json(findUser)
        } catch (e) {
            console.log(e)
        }
    }

    async getUsersList(req, res){
        const users = await Users.find({username: {$regex: `^${req.body.username}`, $options:"mi"}}).limit(5)
        const userList = []
        users.forEach(element => {
            if (element._id.toString() !== req.user.id){
                userList.push(element.username)
            }
        })
        res.json({userList})
    }
}

module.exports = new usersController()