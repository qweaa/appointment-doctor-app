const express = require('express')
const app = express()

//actions
const student = require('./action/student')
const auth = require('./action/auth')


app.use('/student',student)
app.use('/auth',auth)



app.get('/',(req,res)=>{
    res.send('Hello Node.js')
})

app.listen(9093, _=>{
    console.log('node server start at http://localhost:9093')
})