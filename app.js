/* set up an app */
const express = require('express')
const cors = require('cors')
const campaignRoutes = require('./src/routes/campaign')
const mongoose = require('mongoose')


const dotenv = require('dotenv')
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

console.log(process.env.PORT)


app.use(cors())
app.use(express.json())
// app.use(auth)


app.use('/campaign', campaignRoutes)

console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('MongoDb connected')
    app.listen(PORT, ()=>{
        console.log(`server running at http://localhost:${PORT}`)
    })
})
.catch((e)=>{
    console.error('Db connection error: ',e)
})


module.exports = app