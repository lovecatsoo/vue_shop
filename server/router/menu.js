const express = require('express')
const router = express.Router()
const passport = require('passport')
router.get('/menulist', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send({
    meta: { status: 200, msg: '获取菜单列表成功' },
    menulist: [
      { id: 125,
        authName: '用户管理',
        order: 1,
        path: 'users',
        child: [
          { id: 1251, authName: '用户列表', order: 1, path: 'userlist', child: [] }
        ] },
      { id: 103,
        authName: '业主管理',
        order: 1,
        path: 'owners',
        child: [
          { id: 1031, authName: '楼宇管理', order: 1, path: 'buildings', child: [] },
          { id: 1032, authName: '房产管理', order: 1, path: 'estates', child: [] },
          { id: 1033, authName: '业主信息', order: 1, path: 'ownerinfo', child: [] }
        ] },
      { id: 102,
        authName: '商品管理',
        order: 1,
        path: 'goods',
        child: [
          { id: 1021, authName: '商品列表', order: 1, path: 'goodlist', child: [] },
          { id: 1022, authName: '分类参数', order: 1, path: 'classifiedArgs', child: [] },
          { id: 1023, authName: '商品分类', order: 1, path: 'classifiedgoods', child: [] }
        ] },
      { id: 101,
        authName: '订单管理',
        order: 1,
        path: 'orders',
        child: [
          { id: 1011, authName: 'xx管理', order: 1, path: 'rights', child: [] },
          { id: 1012, authName: 'xx管理', order: 1, path: 'rights', child: [] },
          { id: 1013, authName: 'xx管理', order: 1, path: 'rights', child: [] }
        ] },
      { id: 145,
        authName: '数据统计',
        order: 1,
        path: 'statistics',
        child: [
          { id: 1451, authName: 'xx管理', order: 1, path: 'rights', child: [] },
          { id: 1452, authName: 'xx管理', order: 1, path: 'rights', child: [] },
          { id: 1453, authName: 'xx管理', order: 1, path: 'rights', child: [] }
        ] },
      { id: 111,
        authName: 'ctbernman',
        order: 1,
        path: 'study',
        child: [
          { id: 111, authName: '个人词汇', order: 1, path: 'vocabulary', child: [] }
        ] }

    ]
  })
})

module.exports = router
