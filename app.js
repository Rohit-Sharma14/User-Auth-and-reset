const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 5000
const {MONGOURI} = require('./config/key')

mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected',() => {
    console.log("connected to mongodb")
})
mongoose.connection.on('error',(err) => {
    console.log('error connecting to mongodb')
})


require('./models/user')
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/profile'))

app.listen(port, ()=>{
    console.log('server on', port )
})