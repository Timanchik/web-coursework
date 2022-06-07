const {Schema, model} = require('mongoose')

const Like = new Schema({
    post_id: { type: Schema.Types.ObjectId, ref: 'Posts' },
    user_id: { type: Schema.Types.ObjectId, ref: 'Users' }
})

Like.index({post_id: 1, user_id: 1}, {unique: true})

module.exports = model('Likes', Like)
