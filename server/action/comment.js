const express = require('express')
const router = express.Router()
const conn = require('../model')
const resp = require('../config').respond
const serverConfig = require('../config').server

const server_address = serverConfig.host

//取banner
router.post('/submitComment', (req,res)=>{
    const data = req.query
    const respond = JSON.parse(JSON.stringify(resp))
    const studentID = req.headers.studentid

    if(!data.doctorID){
        res.json(Object.assign(respond, {
            messages: '请传入doctorID值',
        }))
        return
    }

    const now = new Date().getTime()

    const  addSql = 'INSERT INTO comment(student_id,doctor_id,order_code,content,evaluate,create_time) VALUES(?,?,?,?,?,?)';
    const  addSqlParams = [studentID, data.doctorID,data.orderCode,data.content,data.evaluate,now];
    //增
    conn.query(addSql,addSqlParams,function (err, result) {
        if(!err){
            res.json(Object.assign(respond, {
                success: true,
                data: result,
                messages: '评论成功',
            }))
        }else{
            res.json(Object.assign(respond, {
                data: err,
                messages: '评论失败 ',
            }))
        }
    });
})

//取评论列表

module.exports = router
