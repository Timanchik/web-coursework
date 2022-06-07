const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Router = require('../routes/Router')
const apiRouter = require('../routes/apiRouter')
const cors = require('cors');
const port = 3000
const cookieParser = require('cookie-parser')


app.use(cookieParser("secret key"))
app.use(express.json())
app.use("/", Router)
app.use('/api', apiRouter)
app.use(express.static('public'))
app.use(cors({
}))

const start = async () =>{
    try {
        await mongoose.connect(`mongodb+srv://timanchik:kirill2001@cluster0.egyz7vu.mongodb.net/?retryWrites=true&w=majority`)
        app.listen(port, () => console.log(`Example app listening on port ${port}`))
    } catch (e) {
        console.log(e)
    }
}

start()


