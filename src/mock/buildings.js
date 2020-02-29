// 楼宇管理的假数据
import Mock from 'mockjs'
Mock.mock(/http:\/\/localhost:3000\/api\/private\/v1\/floormgnt.floorListQry\?pageSize=(\d+)&pageNum=(\d+)/, 'get', function (option) {
  let arr = /http:\/\/localhost:3000\/api\/private\/v1\/floormgnt.floorListQry\?pageSize=(\d+)&pageNum=(\d+)/.exec(option.url)
  let pageSize = Number(arr[1])
  let total = 200
  let obj = {}
  switch (pageSize) {
    case 1:
      obj = Mock.mock({
        status: 200,
        msg: '数据获取成功',
        'buildings|1': [
          {
            FloorId: '@increment(1)',
            FloorArea: '100',
            FloorAddress: '安徽省合肥市包河区维多利亚社区1栋1单元28层',
            LayerCount: 28,
            UnitCount: 1,
            FloorNum: 1,
            FloorName: '1号楼宇',
            CommunitName: '维多利亚'
          }
        ]
      })

      break
    case 2:
      obj = Mock.mock({
        status: 200,
        msg: '数据获取成功',
        'buildings|2': [
          {
            FloorId: '@increment(1)',
            FloorArea: '100',
            FloorAddress: '安徽省合肥市包河区维多利亚社区1栋1单元28层',
            LayerCount: 28,
            UnitCount: 1,
            FloorNum: 1,
            FloorName: '1号楼宇',
            CommunitName: '维多利亚'
          }
        ]
      })
      break
    case 6:
      obj = Mock.mock({
        status: 200,
        msg: '数据获取成功',
        'buildings|6': [
          {
            FloorId: '@increment(1)',
            FloorArea: '100',
            FloorAddress: '安徽省合肥市包河区维多利亚社区1栋1单元28层',
            LayerCount: '@increment(1)',
            UnitCount: 1,
            FloorNum: 1,
            FloorName: '1号楼宇',
            CommunitName: '维多利亚'
          }
        ]
      })
      break
    case 10:
      obj = Mock.mock({
        status: 200,
        msg: '数据获取成功',
        'buildings|10': [
          {
            FloorId: '@increment(1)',
            FloorArea: '100',
            FloorAddress: '安徽省合肥市包河区维多利亚社区1栋1单元28层',
            LayerCount: '@increment(1)',
            UnitCount: 1,
            FloorNum: 1,
            FloorName: '1号楼宇',
            CommunitName: '维多利亚'
          }
        ]
      })
      break
  }
  obj.total = total
  return obj
})
// 新增楼宇录入

Mock.mock('http://127.0.0.1:3000/pcformadp/floormgnt.floorAddPre.do', 'post', function (option) {
  return {
    status: 200,
    msg: '录入'
  }
})
// 新增楼宇确认
Mock.mock('http://127.0.0.1:3000/pcformadp/floormgnt.floorAddConfirm.do', 'post', function (option) {
  return {
    status: 200,
    msg: '确认'
  }
})
// 新增楼宇提交
Mock.mock('http://127.0.0.1:3000/pcformadp/floormgnt.floorAdd.do', 'post', function (option) {
  return {
    status: 200,
    msg: '添加成功'
  }
})

// 楼宇修改
Mock.mock('http://127.0.0.1:3000/pcformadp/floormgnt.floorUpdatePre.do', 'post', function (option) {
  return {
    status: 200,
    msg: '修改'
  }
})
// 楼宇修改确认
Mock.mock('http://127.0.0.1:3000/pcformadp/floormgnt.floorUpdateConfirm.do', 'post', function (option) {
  return {
    status: 200,
    msg: '修改确认'
  }
})
// 楼宇修改成功
Mock.mock('http://127.0.0.1:3000/pcformadp/floormgnt.floorUpdate.do', 'post', function (option) {
  return {
    status: 200,
    msg: '修改成功'
  }
})

// 楼宇删除确认
Mock.mock('http://127.0.0.1:3000/pcformadp/floormgnt.floorDelConfirm.do', 'post', function (option) {
  return {
    status: 200,
    msg: '删除确认'
  }
})
Mock.mock('http://127.0.0.1:3000/pcformadp/floormgnt.floorDel.do', 'post', function (option) {
  return {
    status: 200,
    msg: '删除成功'
  }
})

// 房产管理的假数据
Mock.mock('http://127.0.0.1:3000/pcformadp/homeMgmt.qryAllRoom.do', 'get', function (option) {
  return Mock.mock({
    msg: '获取成功',
    status: 200,
    'RoomList|6': [
      { BuildingRoomId: 1, CommunityId: 1, CommunityName: '维多利亚', FloorId: 1, FloorName: '1号楼', UnitNum: 1, Storey: 18, RoomNum: '@increment(1)', RoomArea: 140, RoomType: '住宅', RoomStatus: '已入住' }
    ]
  })
})

// 新增房屋确认
Mock.mock('http://127.0.0.1:3000/pcformadp/homeMgmt.addRoomConfirm.do', 'get', function (option) {
  return {
    msg: '已确认',
    status: 200
  }
})
// 新增房屋提交
Mock.mock('http://127.0.0.1:3000/pcformadp/homeMgmt.addRoom.do', 'post', function (option) {
  return {
    msg: '提交成功',
    status: 200
  }
})
// 修改房屋提交
Mock.mock('http://127.0.0.1:3000/pcformadp/homeMgmt.updateRoom.do', 'post', function (option) {
  return {
    msg: '提交成功',
    status: 200
  }
})
// 删除房屋提交
Mock.mock('http://127.0.0.1:3000/pcformadp/homeMgmt.deleteRoom.do', 'post', function (option) {
  return {
    msg: '删除成功',
    status: 200
  }
})
// 批量录入初始
Mock.mock('http://127.0.0.1:3000/pcformadp/homeMgmt.batchAddRoomPre.do', 'post', function (option) {
  return {
    url: 'xxxx',
    status: 200
  }
})
// 批量录入确认
Mock.mock('http://127.0.0.1:3000/pcformadp/homeMgmt.batchAddRoomConfirm.do', 'post', function (option) {
  return {
    msg: '确认完毕',
    status: 200,
    'RoomList|6': [
      { BuildingRoomId: 1, CommunityId: 1, CommunityName: '维多利亚', FloorId: 1, FloorName: '1号楼', UnitNum: '@increment(1)', Storey: 18, RoomNum: 101, RoomArea: 140, RoomType: '住宅', RoomStatus: '已入住' }
    ]
  }
})
// 批量录入提交
Mock.mock('http://127.0.0.1:3000/pcformadp/homeMgmt.batchAddRoom.do', 'post', function (option) {
  return {
    msg: '录入成功',
    status: 200
  }
})
