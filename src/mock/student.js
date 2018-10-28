// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;

import {response} from './config'

//取医师数据模型
import {student} from './model'

//登陆
Mock.mock('/home/login', req=>{
    console.log("传入参数：",req)
    let res = response

    if(req.body && JSON.parse(req.body).studentID !== ''){
        const studentID = JSON.parse(req.body).studentID
        const password = JSON.parse(req.body).password
        const model = student

        let list = []

        for(let i of model){
            if(i.studentID === studentID){
                if(i.password === password){
                    res.data = true
                    res.messages = '登陆成功'
                    return res
                }else{
                    res.data = false
                    res.messages = '密码错误'
                    return res
                }
            }
        }
        res.data = false
        res.messages = '账号不存在'
        return res
    }else{
        res.messages = '登陆失败，账号为空'
        res.success = false
        return res
    }
})

//取学生详细信息
//登陆
Mock.mock('/home/getStudentModel', req=>{
    console.log("传入参数：",req)
    let res = response

    if(req.body && JSON.parse(req.body).studentID !== ''){
        const studentID = JSON.parse(req.body).studentID
        const model = student

        for(let i of model){
            if(i.studentID === studentID){
                res.data = i
            }
        }
        res.messages = '取学生详细信息成功'
        return res
    }else{
        res.messages = '请求数据为空，请检查'
        res.success = false
        return res
    }
})