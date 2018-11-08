const express = require('express')
const router = express.Router()
const conn = require('../model')
const respond = require('../config').respond

//取医师详细信息
router.get('/getDoctorModule', (req,res)=>{
    // console.log("req.params: ",req.params)
    // console.log("req.query: ",req.query)
    const doctorID = req.query.doctorID
    if(doctorID){
        conn.query(`SELECT * from doctor where doctorID = ${doctorID}`, function (error, results, fields) {
            if (!error){
                res.json(Object.assign(respond, {
                    success: true,
                    data: results,
                    messages: '取医师详细信息成功',
                }))
            }else{
                res.json(Object.assign(respond, {
                    data: error,
                    messages: '取医师详细信息失败',
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
