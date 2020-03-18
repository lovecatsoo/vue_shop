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
// 根据id查询用户
router.get('/user/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  let id = req.params.id
  User.findById(id).then(user => {
    let obj = {}
    obj.name = user.name
    obj.email = user.email
    res.send({ status: 200, msg: '查询成功', data: obj })
  })
    .catch(err => {
      console.log(err)
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
// 修改用户状态
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
// 添加用户
router.post('/users', (req, res) => {
  // 先看一下邮箱里面是否存在这个账号
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        res.send({ status: 400, msg: '该邮箱已经被注册' })
      } else {
        console.log(req.body)
        let obj = {
          name: req.body.params.username,
          email: req.body.params.email,
          password: req.body.params.password,
          status: false
        }

        let newUser = new User(obj)

        bcrypt.genSalt(10, function (err, salt) {
          if (err) throw err
          bcrypt.hash(newUser.password, salt, function (err, hash) {
            if (err) throw err
            newUser.password = hash
            newUser.save()
              .then(user => {
                res.send({ status: 200, msg: '添加成功', user })
              })
              .catch(err => {
                console.log(err)
              })
          })
        })
      }
    })
})
// 修改用户信息
router.post('/edit', passport.authenticate('jwt', { session: false }), async (req, res) => {
  let { id, email, originEmail } = req.body
  if (originEmail === email) {
    res.send({ msg: '修改成功', status: 200 })
  } else {
    let user = await User.findOne({ email })
    if (!user) {
      let raw = await User.where({ _id: id }).update({ email })
      res.send({ msg: '修改成功', status: 200 })
    } else {
      res.send({ msg: '邮箱已存在', status: 400 })
    }
  }
  // User.where({ _id: id }).updateOne({ email })
  //   .then(user => {
  //     res.send({ msg: '修改成功', status: 200 })
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
})
// 删除用户
router.post('/deleteUser', passport.authenticate('jwt', { session: false }), async (req, res) => {
  let { id } = req.body

  User.deleteOne({ _id: id }).then(raw => {
    res.send({ msg: '删除成功', status: 200 })
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
