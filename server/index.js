const express = require('express')
const app = express()

//actions
const studnet = require('./action/student')


app.use('/studnet',studnet)



app.get('/',(req,res)=>{
    res.send('Hello Node.js')
})

app.listen(9093, _=>{
    console.log('node server start at http://localhost:9093')
})