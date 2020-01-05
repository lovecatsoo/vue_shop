const express = require('express')
const mongoose = require('mongoose')
const bodyParse = require('body-parser')
const userRouter = require('./router/user')
const app = express()
app.use(bodyParse.urlencoded({extended:false}))
app.use(bodyParse.json())

//链接数据库
require('./db')(mongoose)
//挂载路由
app.use('/api/private/v1',userRouter)

app.listen(3000,() => {
    console.log('服务器已经启动')
})

app.post('/register',(req,res) => {
    console.log(req.body)
    res.send({status:'200',msg:'收到你请求了'})
})