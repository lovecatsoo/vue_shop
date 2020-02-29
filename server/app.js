const express = require('express')
const mongoose = require('mongoose')
const bodyParse = require('body-parser')
const passport = require('passport')
const userRouter = require('./router/user')// 用户路由
const menuRouter = require('./router/menu')// 菜单路由
const cors = require('cors')
const app = express()
app.use(bodyParse.urlencoded({ extended: false }))
app.use(bodyParse.json())
app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
// 链接数据库
require('./db')(mongoose)
// 初始化passport
app.use(passport.initialize())
require('./config/passport')(passport)
// 挂载路由
app.use('/api/private/v1/user', userRouter)
app.use('/api/private/v1/menu', menuRouter)

app.listen(3000, () => {
  console.log('服务器已经启动')
})

app.post('/register', (req, res) => {
  console.log(req.body)
  res.send({ status: '200', msg: '收到你请求了' })
})
