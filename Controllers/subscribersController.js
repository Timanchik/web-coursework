const Subscribers = require('../models/Subscribers')
const Users = require('../models/Users')

class SubscribersController {
    async newSubscribe(req, res){
        try {
            const checkSub = await Subscribers.findOne({followerId: req.user.id, followedId: req.body.id})
            if (!checkSub) {
                const newSubs = Subscribers({followerId: req.user.id, followedId: req.body.id,})
                await newSubs.save()
                return res.json("subscribe success")
            }
            else {
                await Subscribers.deleteOne({followerId: req.user.id, followedId: req.body.id})
                return res.json("unsubscribe successes")
            }
        }catch (e) {
            console.log(e)
            return res.status(400).json("Error")
        }
    }
}

module.exports = new SubscribersController()