<template>
    <div>
        <div class="estate-breadcrumb">
             <div class="estate-curlocation">
                 <span><i class="el-icon el-icon-location-outline"></i><span>您当前的位置:</span> </span>
             </div>
             <el-breadcrumb separator="/">
                <el-breadcrumb-item>业主管理</el-breadcrumb-item>
                <el-breadcrumb-item>房产管理</el-breadcrumb-item>
             </el-breadcrumb>
        </div>
        <div class="estatemgnt-qry-form">
             <el-form :inline="true"  ref="estatemgntQryForm" v-model="estatemgntQryForm" label-width="100px" class="demo-form-inline">
                <el-form-item prop="CommunityName" label="社区ID" >
                    <el-input placeholder="请输入社区ID" type="text"  v-model="estatemgntQryForm.CommunityId" ></el-input>
                </el-form-item>
                <el-form-item prop="FloorName" label="楼宇ID" >
                    <el-input placeholder="请输入楼宇名称" type="text"  v-model="estatemgntQryForm.FloorName" ></el-input>
                </el-form-item>
                <el-form-item prop="UnitNum" label="单元" >
                    <el-input placeholder="请输入楼宇名称" type="text"  v-model="estatemgntQryForm.UnitNum" ></el-input>
                </el-form-item>
                <el-form-item prop="Storey" label="楼层" >
                    <el-input placeholder="请输入楼宇名称" type="text"  v-model="estatemgntQryForm.Storey" ></el-input>
                </el-form-item>
                <el-form-item prop="RoomNum" label="房间号" >
                    <el-input placeholder="请输入房间号" type="text"  v-model="estatemgntQryForm.RoomName" ></el-input>
                </el-form-item>
                <el-form-item prop="RoomStatus" label="房屋状态" >
                    <el-input placeholder="请输入房屋状态" type="text"  v-model="estatemgntQryForm.RoomStatus" ></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" >清除</el-button>
                    <el-button type="primary" @click="estateListQry">查询</el-button>
                </el-form-item>
            </el-form>
         </div>

         <div class="estate-qry-list">
             <el-table :data="allRooms" border stripe style="width:100%" :cell-style="cellStyle" :header-cell-style="headerCellStyle" >
                <el-table-column label="选择">
                    <template slot-scope="scope">
                    <el-radio v-model="selectedRoom" :label="scope.row">点击</el-radio>
                  </template>
                </el-table-column>
                <el-table-column label="社区名称"  prop="CommunityName">
                </el-table-column>
                <el-table-column label="楼宇名称" prop="FloorName">
                </el-table-column>

                <el-table-column label="单元" prop="UnitNum">
                </el-table-column>
                <el-table-column label="楼层" prop="Storey">
                </el-table-column>
                <el-table-column label="房间号" prop="RoomNum">
                </el-table-column>
                <el-table-column label="建筑面积" prop="RoomArea">
                </el-table-column>
                <el-table-column label="房屋类型" prop="RoomType">
                </el-table-column>
                <el-table-column label="房屋状态" prop="RoomStatus">
                </el-table-column>
            </el-table>
            <el-pagination class="estatemgnt-pg"  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[1,2,6]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
         </div>
         <div class="estatemgnt-manipulation" v-if="allRooms.length!==0">
             <el-button icon="el-icon-circle-plus-outline">新增</el-button>
             <el-button icon="el-icon-folder-checked">批量录入</el-button>
             <el-button icon="el-icon-edit-outline">修改</el-button>
             <el-button icon="el-icon-delete" >删除</el-button>
         </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      estatemgntQryForm: {

      },
      allRooms: [],
      selectedRoom: '',
      pageSize: 6,
      pageNum: 1,
      total: 200
    }
  },
  methods: {
    async estateListQry () {
      let res = await this.$axios.get('http://127.0.0.1:3000/pcformadp/homeMgmt.qryAllRoom.do')
      this.allRooms = res.data.RoomList
    },
    qryFormClear () {

    },
    cellStyle (row, column, rowIndex, columnIndex) { // 用来设置表格td样式的回调函数
      return 'text-align:center'
    },
    headerCellStyle (row, column, rowIndex, columnIndex) { // 用来设置表头样式的回调函数
      return 'text-align:center'
    },
    handleSizeChange (size) { // 修改pageSize
      this.pageSize = size
      this.estateListQry()
    },
    handleCurrentChange (num) {
      this.pageNum = num
      this.estateListQry()
    }
  }
//    rules: {
//         communitName: [
//           { required: false, message: '请填写', trigger: 'blur' }
//         ],
//         floorName: [
//           { required: false, message: '请填写', trigger: 'blur' }
//         ],
//         unit: [
//           { required: false, message: '请填写', trigger: 'blur' }
//         ],
//         floorNum: [
//           { required: false, message: '请填写', trigger: 'blur' }
//         ],
//         estateType: [
//           { required: false, message: '请填写', trigger: 'blur' }
//         ],
//         estateStatus: [
//           { required: false, message: '请填写', trigger: 'blur' }
//         ]
}
</script>
<style lang="scss" >
    .estate-breadcrumb{
        display: flex;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #eee;
    }
    .estate-breadcrumb .estate-curlocation>span i{
        font-size: 13px;
        color: #666;
    }
    .estate-breadcrumb .estate-curlocation>span span{
        font-size: 13px;
        color: #333
    }
    .estate-breadcrumb .el-breadcrumb{
        line-height: 42px;
        font-size: 12px;
        color: #666;
        margin-left: 10px;
    }

    .estatemgnt-qry-form{
        position: relative;
        height: 300px;
    }
    .estatemgnt-qry-form .el-form{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        width: 525px;
        height: 284px;
        margin: auto;

    }
    .estatemgnt-qry-form .el-form .el-input, .estatemgnt-qry-form .el-form .el-select{
        width: 150px;

    }
    .estatemgnt-qry-form .el-form .el-input>.el-input__inner, .estatemgnt-qry-form .el-form .el-select>.el-input__inner{
        border: 1px solid #ddd;
        border-radius: 2px;
        height: 40px;
    }

    .estatemgnt-qry-form .el-form .el-button.el-button--primary{
        background: linear-gradient(90deg,#F53636,#F86B33);
        border-radius: 0;
        border:1px solid #F64E35;
        color: #fff;
        width: 80px;
        height: 32px;
        line-height: 32px;
        padding: 0px;
    }
     .estatemgnt-qry-form .el-form .el-button:first-child{
        margin-left: 170px;
        margin-right: 30px;
        background: #fff;
        color: #F64E35;

    }

    .estatemgnt-pg{
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
    .estate-qry-list .el-table--striped .el-table__body tr.el-table__row--striped td{
        background: rgba(244,246,245,1)!important;
    }
    .estate-qry-list .el-table--striped th{
        background: rgba(244,246,245,1);
    }
    .estate-qry-list .el-radio__label{
        display: none;
    }
    .estate-qry-list .el-radio__input.is-checked .el-radio__inner{
        border-color: #F53F35;
        background: #F53F35;

    }
    .estate-qry-list .el-radio__inner:hover{
        border-color: #F53F35;
    }
    .estatemgnt-manipulation {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
    .estatemgnt-manipulation .el-button{
        width: 164px;
        height: 40px;
        margin: 0 30px;
    }
    .estatemgnt-manipulation .el-button:focus, .estatemgnt-manipulation .el-button:hover{
      color:#fff;
      border-color: rgba(248,107,51,0.1);
      background: rgba(248,107,51,0.4);
    }

</style>
