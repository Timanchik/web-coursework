const multer = require('multer')
const bcrypt = require('bcryptjs')

const storage = multer.diskStorage({
    destination(req, file, cb){
        if(file.fieldname === 'postImage'){
            cb(null, 'public/uploads/postimages')
        } else {
            cb(null, 'public/uploads/avatars')
        }
    },
    filename(req, file, cb){
        const type = '.' + file.mimetype.toString().split('/').slice(-1)
        cb(null, bcrypt.hashSync(new Date().toISOString(), 1).replace(/[$.\/]/gi, '') + type)
    }
})

const types = ['image/png', 'image/jpg', 'image/jpeg']

const fileFilter = (req, file, cb) => {
    if(types.includes(file.mimetype)){
        cb(null, true)
    }else {
        cb(null, false)
    }
}

module.exports = multer({storage, fileFilter})

