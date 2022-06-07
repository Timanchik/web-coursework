const {Schema, model} = require('mongoose')

const Subscribers = new Schema({
    followerId: {type: Schema.Types.ObjectId, ref: 'Users', required: true},
    followedId:{type: Schema.Types.ObjectId, ref: 'Users', required: true},
})

Subscribers.index({followerId: 1, followedId: 1}, {unique: true})

module.exports = model('Subscribers', Subscribers)