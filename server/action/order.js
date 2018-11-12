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
    const studentID = req.headers.studentid

    if(!studentID){
        res.json(Object.assign(respond, {
            messages: '缺少studentID值'
        }))
        return
    }

    //code status create_time
    const keys = [
        'doctorID',
        'book_id',
        'book_date',
        'book_price',
        'name',
        'idcard',
        'phone',
    ]

    const data = req.query
    const status = 0            //状态0：待付款

    //存储传过来错误的变量名
    let errorKeys = [],
        sqlK = ['studentID'],       //["name", "id"] => name,id
        sqlV = ['?'],               //['?','?'] => ?,?
        sqlValue = [studentID]
    
    //遍历传入的请求对象
    for(let i in data){
        if(keys.indexOf(i) > -1){
            sqlK.push(i)
            sqlV.push('?')
            sqlValue.push(data[i])
        }else{
            errorKeys.push(i)
        }
    }

    
    if(sqlK.length === 1){
        res.json(Object.assign(respond, {
            messages: '请提供需要修改的键值对',
        }))
        return
    }

    //如果提交的表单含有错误变量，返回错误提示
    if(errorKeys.length > 0){
        res.json(Object.assign(respond, {
            data: errorKeys,
            messages: '提交的参数中含有错误的变量名，请检查拼写是否正确',
        }))
        return
    }

    
    const addSql = 'INSERT INTO order('+sqlK.join(',')+') VALUES('+sqlV.join(',')+')'
       
    conn.query(addSql,sqlValue,function (err, result) {
        if(!err){
            res.json(Object.assign(respond, {
                success: true,
                data: result,
                messages: '插入成功',
            }))
        }else{
            res.json(Object.assign(respond, {
                data: err,
                messages: '插入失败 ',
            }))
        }
    });

})

module.exports = router
