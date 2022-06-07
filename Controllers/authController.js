const Users = require('../models/Users')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const {secret} = require("../config")

const generateAccessToken = (id, username) => {
    const payload = {
        id,
        username
    }
    return jwt.sign(payload, secret, {expiresIn: "12h"})
}

class AuthController {
    async registration(req, res){
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                return res.status(400).json({message: "Ошибки при регистрации", errors})
            }
            const {username, password} = req.body
            const candidate = await Users.findOne({username})
            if (candidate) {
                return res.status(400).json({message: "A user with this username already exists"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = Users({username, password: hashPassword})
            await user.save()
            return res.json("The user is registered")
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Registration error"})
        }
    }

    async login(req, res){
        try {
            const {username, password} = req.body
            const user = await Users.findOne({username})
            if (!user){
                res.status(400).json({message: `Пользователь ${username} не найден`})
            }
            const validatePassword = bcrypt.compareSync(password, user.password)
            if (!validatePassword){
                res.status(400).json({message: "Введен неверный пароль"})
            }
            const token = generateAccessToken(user._id, user.username)
            res.cookie('token', token)
            return res.json("successes")
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Login error"})
        }
    }

    async logout(req, res) {
        try {
            res.clearCookie("token")
            return res.json("clearCookie complete")
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new AuthController()