<template>
    <div>
         <div class="floormgnt-breadcrumb">
             <div class="floor-curlocation">
                 <span><i class="el-icon el-icon-location-outline"></i><span>您当前的位置:</span> </span>
             </div>
             <el-breadcrumb separator="/">
                <el-breadcrumb-item>业主管理</el-breadcrumb-item>
                <el-breadcrumb-item>楼宇管理</el-breadcrumb-item>
                <el-breadcrumb-item>楼宇查询</el-breadcrumb-item>
             </el-breadcrumb>
         </div>
         <div class="floormgnt-qry-form">
             <el-form  ref="floormgntQryForm" :model="floormgntQryForm" :rules="rules">
                <el-form-item prop="communitName" label="社区名称">
                    <el-select v-model="floormgntQryForm.communitName" placeholder="请选择社区名称">
                        <el-option label="维多利亚" value="维多利亚"></el-option>
                        <el-option label="普罗旺斯" value="普罗旺斯"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="floorName" label="楼宇名称">
                    <el-input placeholder="请输入楼宇名称" type="text"  v-model="floormgntQryForm.floorName" ></el-input>
                </el-form-item>
                <el-form-item prop="floorAddress" label="楼宇地址">
                    <el-input placeholder="请输入楼宇地址" type="text"  v-model="floormgntQryForm.floorAddress" ></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="floorListQry">查询</el-button>
                    <el-button type="info" @click="qryFormClear">清除</el-button>
                </el-form-item>
            </el-form>
         </div>
         <div class="floor-qry-list">
             <el-table :data="floorList" border stripe style="width:100%" :cell-style="cellStyle" :header-cell-style="headerCellStyle" >
                <el-table-column label="选择" >
                    <template slot-scope="scope">
                    <el-radio v-model="selectedFloor" :label="scope.row">点击</el-radio>
                  </template>
                </el-table-column>
                <el-table-column label="社区名称"  prop="CommunitName">
                </el-table-column>
                <el-table-column label="楼宇名称" prop="FloorName">
                </el-table-column>
                <el-table-column label="楼号" prop="FloorNum">
                </el-table-column>
                <el-table-column label="单元数" prop="UnitCount">
                </el-table-column>
                <el-table-column label="层数" prop="LayerCount">
                </el-table-column>
                <el-table-column label="楼宇地址" prop="FloorAddress">
                </el-table-column>
            </el-table>
            <el-pagination class="floormgnt-pg"  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[1,2,6]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
         </div>
         <div class="floormgnt-manipulation" v-if="floorList.length!==0">
             <el-button @click="gotoFloorAdd">新增</el-button>
             <el-button @click="gotoFloorUpdate">修改</el-button>
             <el-button @click="delSelectedFloor">删除</el-button>
         </div>
    </div>
</template>
<script>
export default {
  data () {
    let checkCummunitName = function (rule, value, callback) {
      if (!value) {
        return callback(new Error('社区名不能为空'))
      }
      callback()
    }
    let checkFloorName = function (rule, value, callback) {
      if (!value) {
        return callback(new Error('楼宇名不能为空'))
      }
      callback()
    }
    let checkFloorAddress = function (rule, value, callback) {
      if (!value) {
        return callback(new Error('楼宇地址不能为空'))
      }
      callback()
    }
    return {
      pageSize: 6,
      pageNum: 1,
      total: 0, // 总共有多少条数据
      floorList: [], // 楼宇列表
      selectedFloor: '', // 点击radio按钮，希望去修改的楼宇
      floormgntQryForm: {// 表单数据
        communitName: '',
        floorName: '',
        floorAdress: ''
      },
      rules: {// 表单验证规则
        communitName: [
          { validator: checkCummunitName, trigger: 'blur' }
        ],
        floorName: [
          { validator: checkFloorName, trigger: 'blur' }
        ],
        floorAddress: [
          { validator: checkFloorAddress, trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    floorListQry () {
      this.$refs['floormgntQryForm'].validate(async (valid) => {
        // 如果有一项没通过验证就中断
        console.log(valid)
        if (!valid) {
          console.log('验证不通过')
        }
        // 发ajax请求
        let res = await this.$axios.get('/floormgnt.floorListQry?' + 'pageSize=' + this.pageSize + '&pageNum=' + this.pageNum)
        this.floorList = res.data.buildings
        this.total = res.data.total
      })
    },
    qryFormClear () { // 清除表单
      this.$refs['floormgntQryForm'].resetFields()
    },
    cellStyle (row, column, rowIndex, columnIndex) { // 用来设置表格td样式的回调函数
      return 'text-align:center'
    },
    headerCellStyle (row, column, rowIndex, columnIndex) { // 用来设置表头样式的回调函数
      return 'text-align:center'
    },
    handleSizeChange (size) { // 修改pageSize
      this.pageSize = size
      this.floorListQry()
    },
    handleCurrentChange (num) {
      this.pageNum = num
      this.floorListQry()
    },
    gotoFloorAdd () { // 跳转到新增楼宇页面
      this.$router.push({ name: 'floorAdd' })
    },
    gotoFloorUpdate () { // 跳转到修改楼宇
      if (!this.selectedFloor) {
        return this.$message({ message: '请选择要修改的条目', type: 'warning' })
      }
      this.$router.push({ name: 'floorUpdate', params: { selectedFloor: this.selectedFloor } })
    },
    delSelectedFloor () {
      if (!this.selectedFloor) {
        return this.$message({ message: '请选择要删除的条目', type: 'warning' })
      }
      this.$confirm('确认删除当前楼宇？', '温馨提示', { confirmButtonText: '确定', cancelButtonText: '取消', center: true, customClass: 'delFloor-msg-box' })
        .then(() => {
          this.$message({ message: '删除成功', type: 'success' })
          this.floorListQry()
        })
        .catch(() => {
          this.$message({ message: '删除取消', type: 'info' })
        })
    }
  },
  created () {

  }
}
</script>
<style lang="css" scoped>
    .el-form-item__label{
        color: #333 !important;
        font-size: 14px;
    }
    .floormgnt-breadcrumb{
        display: flex;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #eee;
    }
    .floormgnt-breadcrumb .floor-curlocation>span i{
        font-size: 13px;
        color: #666;
    }
    .floormgnt-breadcrumb .floor-curlocation>span span{
        font-size: 13px;
        color: #333
    }
    .floormgnt-breadcrumb .el-breadcrumb{
        line-height: 42px;
        font-size: 12px;
        color: #666;
        margin-left: 10px;
    }
    .floormgnt-qry-form{
        position: relative;
        height: 300px;
    }
    .floormgnt-qry-form .el-form{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        width: 450px;
        height: 284px;
        margin: auto;

    }
    .floormgnt-qry-form .el-form .el-input, .floormgnt-qry-form .el-form .el-select{
        width: 340px;

    }
    .floormgnt-qry-form .el-form .el-input>.el-input__inner, .floormgnt-qry-form .el-form .el-select>.el-input__inner{
        border: 1px solid #ddd;
        border-radius: 2px;
        height: 40px;
    }

    .floormgnt-qry-form .el-form .el-button{
        margin-left: 100px;
    }
    .floormgnt-qry-form .el-form .el-button.el-button--primary{
        background: linear-gradient(90deg,#F53636,#F86B33);
        border-radius: 0;
        border:1px solid #F64E35;
        color: #fff;
        width: 80px;
        height: 32px;
        line-height: 32px;
        padding: 0px;
    }
    .floormgnt-qry-form .el-form .el-button.el-button--info{
        background: #fff;
        border-radius: 0;
        border:1px solid #F64E35;
        color: #F64E35;
        width: 80px;
        height: 32px;
        line-height: 32px;
        padding: 0px;
    }
    .floormgnt-pg{
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
    .floor-qry-list .el-table--striped .el-table__body tr.el-table__row--striped td{
        background: rgba(244,246,245,1)!important;
    }
    .floor-qry-list .el-table--striped th{
        background: rgba(244,246,245,1);
    }
   .floor-qry-list .el-radio__input.is-checked .el-radio__inner{
        border-color: #F53F35;
        background: #F53F35;

    }
    .floor-qry-list .el-radio__inner:hover{
        border-color: #F53F35;
    }
    .floormgnt-manipulation {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
    .floormgnt-manipulation .el-button{
        width: 164px;
        height: 40px;
    }
    .floormgnt-manipulation .el-button:focus, .floormgnt-manipulation .el-button:hover{
      color:#fff;
      border-color: rgba(248,107,51,0.1);
      background: rgba(248,107,51,0.4);
    }
    .floormgnt-manipulation .el-button:nth-child(2){
        margin: 0px 30px;
    }
    .delFloor-msg-box {
      width: 360px;
      height: 194px;
      box-sizing: border-box;

    }
    .delFloor-msg-box .el-message-box__title{
      color: #222;
      font-size: 18px;
    }
    .delFloor-msg-box  .el-message-box__message{
      color: #666;
      font-size: 15px;
      margin-top: 4px;
    }
    .delFloor-msg-box  .el-message-box__btns {
      text-align: left !important;
    }
    .delFloor-msg-box  .el-message-box__btns .el-button{
      margin-left: 35px;
      width: 140px;
      height: 40px;
      padding: 0;

    }
    .delFloor-msg-box  .el-message-box__btns .el-button:not(:first-child){
      background: linear-gradient(to right,#F53636,#F86B33);
      border:none;
    }
</style>
