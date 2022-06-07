const Users = require('../models/Users')

class apiController{
     async uploadAvatar(req, res){
         try {
             if (req.file) {
                 const path =  req.file.path.toString().replace("public", "").replace(/\\/gi, '/')
                 await Users.updateOne({_id: `${req.user.id}`}, {$set: {
                         userPic: path
                     }})
                 res.json('success');
             }
             else {
                 res.send("Ошибка при загрузке файла");
             }
         } catch (e) {
             console.log(e)
         }
     }

     async uploadPostImg(req, res){
         try {
             if (req.file) {
                 const path = req.file.path.toString().replace("public\\", "").replace(/\\/gi, '/')
                 res.json({
                     path: path
                 });
             }
             else {
                 res.send("Ошибка при загрузке файла");
                 console.log("No file")
             }
         } catch (e) {
             console.log(e)
         }
     }
}

module.exports = new apiController()