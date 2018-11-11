const express = require('express')
const router = express.Router()
const conn = require('../model')
const resp = require('../config').respond

//取订单列表
router.get('/getOrderList', (req,res)=>{
    const respond = JSON.parse(JSON.stringify(resp))
    // console.log("req.params: ",req.params)
    // console.log("req.query: ",req.query)
    let status = req.query.status,
        studentID = req.headers.studentID,
        rows = req.query.rows || 10,
        page = req.query.page || 1

    if(!status){
        res.json(Object.assign(respond, {
            messages: '请传入status变量值'
        }))
        return
    }
    if(!studentID){
        res.json(Object.assign(respond, {
            messages: '缺少studentID值'
        }))
        return
    }

    conn.query(`SELECT * from order where student_id = ${studentID} AND status = ${status} limit ${(page - 1) * rows} , ${page * rows}`, function (error, results, fields) {
        if (!error){
            res.json(Object.assign(respond, {
                success: true,
                data: results,
                messages: '取订单列表成功',
            }))
        }else{
            res.json(Object.assign(respond, {
                data: error,
                messages: '取订单列表失败',
            }))
        }
    });

})

//提交订单

router.post('/submitOrder', (req,res)=>{
    const respond = JSON.parse(JSON.stringify(resp))
    const studentID = req.headers.studentID

    if(!studentID){
        res.json(Object.assign(respond, {
            messages: '缺少studentID值'
        }))
        return
    }

    const keys = [
        'student_name',
        'doctor_id',
        'doctor_name',
        'book_id',
        'book_date',
        'book_price',
        'idcard',
        'phone',
    ]

    const data = req.query
    const status = 0            //状态0：待付款

    //存储传过来错误的变量名
    let errorKeys = []
    //["name = ?", "id = ?] => name = ?,id = ?
    let sql = []
    let sqlValue = []
    
    //遍历传入的请求对象
    for(let i in data){
        if(studentTableKeys.indexOf(i) > -1){
            sql.push(i + ' = ?')
            sqlValue.push(data[i])
        }else{
            errorKeys.push(i)
       


})

module.exports = router
