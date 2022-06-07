const {Schema, model} = require('mongoose')

const Comments = new Schema({
    creator_id: {type: Schema.Types.ObjectId, ref: 'Users', required: true},
    post_id: {type: Schema.Types.ObjectId, ref: 'Posts', required: true},
    commentData: {type: String, required: true},
    date: {type: Date, required: true}
})

module.exports = model('Comments', Comments)