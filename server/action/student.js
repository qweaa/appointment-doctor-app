const express = require('express')
const router = express.Router()
const conn = require('../model')
const respond = require('../config').respond

router.get('/getStudentModel', (req,res)=>{
    // console.log("req.params: ",req.params)
    // console.log("req.query: ",req.query)
    const studentID = req.query.studentID
    if(studentID){
        conn.query(`SELECT * from student where studentID = ${studentID}`, function (error, results, fields) {
            if (!error){
                res.json(Object.assign(respond, {
                    success: true,
                    data: results,
                    messages: '取学生信息详情成功',
                }))
            }else{
                res.json(Object.assign(respond, {
                    data: error,
                    messages: '取学生信息详情失败',
                }))
            }
        });
    }else{
        res.json(Object.assign(respond, {
            messages: '请求参数不能为空',
        }))
    }
})

module.exports = router