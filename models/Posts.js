const {Schema, model} = require('mongoose')

const Post = new Schema({
    creator: {type: Schema.Types.ObjectId, ref: 'Users', required: true},
    description: {type: String},
    likes: {type: Number, required: true, default: 0},
    date: {type: Date, required: true},
    imgUrl: {type: String, required: true}
})

module.exports = model('Posts', Post)