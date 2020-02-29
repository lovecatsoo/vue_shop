import Mock from 'mockjs'

// 引入楼宇管理
import './buildings'

// 模拟get请求
Mock.mock('http://localhost:3000/api/private/v1/test', 'get', {
  status: 200,
  messgae: '获取数据成功',
  'data|19': [
    { lsid: '@increment(1)', name: '@cword(2,8)', price: '@natural(2,8)', count: '@natural(100,999)', img: '@dataImage(78x78)' }
  ]
})
// 模拟post请求
Mock.mock('http://localhost:3000/api/private/v1/test1', 'post', function (option) {
  console.log(option)
  return {
    status: 200,
    msg: '提交成功'
  }
})
