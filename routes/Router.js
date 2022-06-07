const express = require('express')
const router = express.Router()
const controller = require('../Controllers/authController')
const settings = require('../Controllers/settingsController')
const posts = require('../Controllers/postsController')
const subs = require('../Controllers/subscribersController')
const users = require('../Controllers/usersController')
const comment = require('../Controllers/commentsController')
const likeController = require('../Controllers/likesController')
const feedController = require('../Controllers/feedController')
const {check} = require('express-validator')
const authMiddleware = require("../middleware/authMiddleware")
const fileMiddleware = require('../middleware/fileMiddleware')

router.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль доложен быть от 8 до 16 символов").isLength({min: 8, max:16})
], controller.registration)
router.post('/login', controller.login)
router.post('/logout', authMiddleware, controller.logout)
router.post('/info-update', authMiddleware, settings.setInformation)
router.post('/create-post', authMiddleware, fileMiddleware.single('postImage'), posts.createPost)
router.post('/delete-post', authMiddleware, posts.deletePost)
router.post('/subscribe', authMiddleware, subs.newSubscribe)
router.post('/add-comment', authMiddleware, comment.addComment)
router.post('/del-comment', authMiddleware, comment.delComment)
router.post('/get-post-comments', authMiddleware, comment.getPostComments)
router.post('/get-user-by-id', authMiddleware, users.getUserById)
router.post('/get-users-list', authMiddleware, users.getUsersList)
router.post('/get-user-by-username', authMiddleware, users.getUserByUsername)
router.post('/get-user-data', authMiddleware, users.getUserData)
router.post('/like', authMiddleware, likeController.like)
router.post('/likeTest', authMiddleware, likeController.getLikes)
router.post('/get-feed', authMiddleware, feedController.getFeed)

module.exports = router
