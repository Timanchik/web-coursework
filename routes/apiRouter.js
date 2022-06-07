const express = require('express')
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const apiController = require('../Controllers/apiController')
const fileMiddleware = require('../middleware/fileMiddleware')

router.post('/upload-post-img', authMiddleware, fileMiddleware.single('postImage'), apiController.uploadPostImg)
router.post('/upload-avatar', authMiddleware, fileMiddleware.single('avatar'), apiController.uploadAvatar)

module.exports = router