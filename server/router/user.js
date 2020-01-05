const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//引入用户模型
const User = require('../model/User')
//用户登陆接口
router.post('/login',(req,res) => {
    let email = req.body.email
    let password = req.body.password
    //我去数据库查一下这个用户是否存在
    User.findOne({email})
    .then(user => {
        if(!user){
            res.send({status:400,msg:'用户不存在'})
        }else{
            bcrypt.compare(password,user.password)
            .then( isMatch => {
                if (isMatch){
                    const rules = {
                        id:user.id,
                        name:user.name,
                    } 
                    jwt.sign(rules,'secret',{expiresIn:3600},(err,token)=>{
                       if (err) throw err
                       res.send({
                           status:200,
                           token:'Bearer'+token
                       }) 
                    })
                }else{
                    res.send({status:400,msg:'密码错误'})
                }
            })
        }
    })
})
//用户注册接口
router.post('/register',(req,res) => {
    //先看一下邮箱里面是否存在这个账号
    User.findOne({email:req.body.email})
    .then((user) => {
        if (user){
            res.send({status:400,msg:'该邮箱已经被注册'})
        }else{
            let obj = {
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
            }
            //密码加密
            bcrypt.genSalt(10,(err,salt) =>{
                bcrypt.hash(obj.password,salt,(err,hash) => {
                    if (err) throw err
                    obj.password = hash
                    User.insertMany(obj)
                    .then((user)=>{
                        res.send(user)
                    })
                    .catch(err =>{
                        console.log(err)
                    })
                })
            })

        }
    })
})
module.exports = router