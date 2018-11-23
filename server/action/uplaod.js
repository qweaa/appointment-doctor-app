const express = require('express')
const router = express.Router()
const conn = require('../model')
const resp = require('../config').respond

const multer = require('multer')
const path = require('path')

//所有请求过来，都去项目当前的public目录下寻找所请求的文件，找到就返回
// app.use(express.static('../upload'));

//选择diskStorage存储
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('../upload/images'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));//增加了文件的扩展名
    }
});

const upload = multer({storage: storage});

app.post('/image', upload.single('avatar'), function(req, res, next) {
    const respond = JSON.parse(JSON.stringify(resp))
    res.send({
        err: null,
        //filePath:就是图片在项目中的存放路径
        filePath: 'uploads/' + path.basename(req.file.path)
    });
});

//取公告列表
router.get('/image', (req,res)=>{
    const respond = JSON.parse(JSON.stringify(resp))

    conn.query(`SELECT * from note where used = 1`, function (error, results, fields) {
        if (!error){
            res.json(Object.assign(respond, {
                success: true,
                data: results,
                messages: '取公告列表成功',
            }))
        }else{
            res.json(Object.assign(respond, {
                data: error,
                messages: '取公告列表失败',
            }))
        }
    });
})

module.exports = router
