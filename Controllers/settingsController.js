const Users = require('../models/Users')

class SettingsController {
    async setInformation(req, res) {
        try {
            const {aboutUser, email, name, lastName} = req.body
            await Users.updateOne({_id: `${req.user.id}`}, {$set: {
                    aboutUser: aboutUser,
                    email: email,
                    name: name,
                    lastName: lastName,
                }})
            return res.json("Settings update")
        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = new SettingsController()