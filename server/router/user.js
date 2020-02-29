const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passport = require('passport')
// 引入用户模型
const User = require('../model/User')
// 用户登陆接口
router.post('/login', (req, res) => {
  let email = req.body.email
  let password = req.body.password
  // 我去数据库查一下这个用户是否存在
  User.findOne({ email })
    .then(user => {
      if (!user) {
        res.send({ msg: '用户不存在' })
      } else {
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              const rules = {
                id: user.id,
                name: user.name
              }
              jwt.sign(rules, 'secret', { expiresIn: 3600 }, (err, token) => {
                if (err) throw err
                res.send({
                  status: 200,
                  token: 'Bearer ' + token
                })
              })
            } else {
              res.send({ status: 400, msg: '密码错误' })
            }
          })
      }
    })
})
// 用户注册接口
router.post('/register', (req, res) => {
  // 先看一下邮箱里面是否存在这个账号
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        res.send({ status: 400, msg: '该邮箱已经被注册' })
      } else {
        let obj = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          status: req.body.status
        }

        let newUser = new User(obj)
        bcrypt.genSalt(10, function (err, salt) {
          if (err) throw err
          bcrypt.hash(newUser.password, salt, function (err, hash) {
            if (err) throw err
            newUser.password = hash
            newUser.save()
              .then(user => {
                res.send(user)
              })
              .catch(err => {
                console.log(err)
              })
          })
        })
      }
    })
})
// 获取用户列表
router.get('/userlist', passport.authenticate('jwt', { session: false }), async (req, res) => {
  let { query, pageNum, pageSize } = req.query
  pageSize = parseInt(pageSize)
  pageNum = parseInt(pageNum)
  query = checkQuery(query)
  if (!query) {
    return res.send({ meta: { msg: '查询失败，请检查关键字', status: 400 } })
  }
  let total = await User.countDocuments(query)
  User.find(query).skip((pageNum - 1) * pageSize).limit(pageSize)
    .then(userlist => {
      let arr = []
      userlist.forEach(user => {
        let obj = {}
        obj.id = user.id
        obj.rolename = '测试角色',
        obj.username = user.name,
        obj.status = user.status,
        obj.email = user.email
        obj.create_time = new Date(user.date).toLocaleString()
        arr.push(obj)
      })
      res.send({ users: arr, total, pageNum, meta: { msg: '获取用户列表成功', status: 200 } })
    })
    .catch(err => {
      res.send({ meta: { msg: '获取用户列表失败', status: 400 } })
    })
})
router.put('/statusChange', (req, res) => {
  let { email, status } = req.body
  User.findOneAndUpdate({ email }, { $set: { status } })
    .then(doc => {
      res.send({ status: 200, msg: '修改成功', user: doc })
    })
    .catch(err => {
      console.log(err)
    })
})
// 这个函数用来判断用户输入的是用户名还是邮箱
function checkQuery (str) {
  let obj = {}
  let regBox = {
    regEmail: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, // ....邮箱
    regName: /^[a-z0-9_-]{3,16}$/ // ....用户名
  }
  if (str.length === 0) { // 如果你什么也不输入
    return {}
  } else if (regBox.regEmail.test(str)) {
    obj.email = new RegExp(str)
    return obj
  } else if (regBox.regName.test(str) && !Number(str)) {
    obj.name = new RegExp(str)
    return obj
  } else {
    return false
  }
}
module.exports = router
