const {Schema, model} = require('mongoose')

const User = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    aboutUser: {type: String, default: null},
    email: {type: String,  default: null},
    name: {type: String,  default: null},
    lastName: {type: String,  default: null},
    userPic: {type: String, default: null}
})

module.exports = model('Users', User)