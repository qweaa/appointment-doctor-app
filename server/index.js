const express = require('express')
const app = express()

//actions
const student = require('./action/student')
const auth = require('./action/auth')
const doctor = require('./action/doctor')
const book = require('./action/book')


app.use('/student',student)
app.use('/auth',auth)
app.use('/doctor',doctor)
app.use('/book',book)



app.get('/',(req,res)=>{
    res.send('Hello Node.js')
})

const server = app.listen(9093, _=>{
    console.log('node server start at http://localhost:9093')
})