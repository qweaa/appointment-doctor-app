// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;

import {response} from './config'

//取医师数据模型
import {doctors, book, time} from './model'

//取医师详细信息
Mock.mock('/home/getDoctorDetail', req=>{
    console.log("传入参数：",req)
    
    let res = response,
        id = JSON.parse(req.body).id,
        list

    const model = doctors

    for(let i of model){
        if(i.id === id) list = i
    }
    res.data = list
    res.messages = '取医师详细信息成功'
    return res
})

//取医师预约时间列表
Mock.mock('/home/getDoctorBooks', req=>{
    console.log("传入参数：",req)
    
    let res = response,
        body = JSON.parse(req.body),
        id = body.id,
        date = new Date(body.date + ' 00:00:00').getTime(),
        list = []

    const _book = book            //预约列表
    const _time = time            //时间列表

    for(let i of _book){
        let _book_date = new Date(i.date + ' 00:00:00').getTime()
        if(i.doctor_id === id && date == _book_date){
            for(let j of _time){
                if(j.id ===  i.time_id){
                    list.push(Object.assign(i,j))
                }
            }
        }
    }
    res.data = list
    res.messages = '取医师预约时间列表'
    return res
})