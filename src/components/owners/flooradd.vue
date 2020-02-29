<template>
    <div>
        <div class="floormgnt-breadcrumb">
             <div class="floor-curlocation">
                 <span><i class="el-icon el-icon-location-outline"></i><span>您当前的位置:</span> </span>
             </div>
             <el-breadcrumb separator="/">
                <el-breadcrumb-item>业主管理</el-breadcrumb-item>
                <el-breadcrumb-item>楼宇管理</el-breadcrumb-item>
                <el-breadcrumb-item>新增楼宇</el-breadcrumb-item>
             </el-breadcrumb>
         </div>
         <el-steps class="floormgnt-steps" :active="active" finish-status="success" :align-center="true"  :space="250">
            <el-step title="信息录入"></el-step>
            <el-step title="信息确认"></el-step>
            <el-step title="提交结果"></el-step>
        </el-steps>
        <!--信息录入-->
        <div class="floormgnt-add-pre" v-show="active===0">
            <div class="floormgnt-add-pre-form">
             <el-form  ref="floormgntAddPreForm" :model="floormgntAddPreForm" :rules="rules" :label-width="'70px'">
                <el-form-item prop="CommunitName" label="所属社区">
                    <el-select v-model="floormgntAddPreForm.CommunitName" placeholder="请选择社区名称">
                        <el-option label="维多利亚" value="维多利亚"></el-option>
                        <el-option label="普罗旺斯" value="普罗旺斯"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="FloorName" label="楼宇名称">
                    <el-input type="text"  v-model="floormgntAddPreForm.FloorName" ></el-input>
                </el-form-item>
                <el-form-item prop="FloorNum" label="楼号">
                    <el-input  type="text"  v-model="floormgntAddPreForm.FloorNum" ></el-input>
                </el-form-item>
                <el-form-item prop="UnitCount" label="单元数">
                    <el-input  type="text"  v-model="floormgntAddPreForm.UnitCount" ></el-input>
                </el-form-item>
                <el-form-item prop="LayerCount" label="层数">
                    <el-input type="text"  v-model="floormgntAddPreForm.LayerCount" ></el-input>
                </el-form-item>
                <el-form-item prop="FloorAddress" label="楼宇地址">
                    <el-input  type="text"  v-model="floormgntAddPreForm.FloorAddress" ></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="gotoFloorAddConfirm">确定</el-button>
                    <el-button type="info" @click="$router.go(-1)">返回</el-button>
                </el-form-item>
            </el-form>
         </div>
        </div>
        <!--信息确认-->
        <div class="floormgnt-add-confirm" v-show="active===2">
            <div class="confirm-list">
              <ul>
                <li ><span>所属社区</span><span>{{floormgntAddPreForm.CommunitName}}</span> </li>
                <li ><span>楼宇名称</span><span>{{floormgntAddPreForm.FloorName}}</span> </li>
                <li ><span>楼号</span><span>{{floormgntAddPreForm.FloorNum}}</span> </li>
                <li ><span>单元数</span><span>{{floormgntAddPreForm.UnitCount}}</span> </li>
                <li ><span>层数</span><span>{{floormgntAddPreForm.LayerCount}}</span> </li>
                <li ><span>楼宇地址</span><span>{{floormgntAddPreForm.FloorAddress}}</span> </li>
              </ul>
            </div>
            <div class="confirm-manipulation">
              <el-button @click="gotoFloorAddUpdate">提交</el-button>
              <el-button @click="before">返回</el-button>
            </div>
        </div>
        <!--提交结果-->
        <div class="floormgnt-add-res" v-show="active===4">
            <div class="update-res">
                <div class="success-icon">
                  <i class="el-icon el-icon-success"></i>
                </div>
                <p class="one">您好，新增成功</p>
                <p class="two">您可在用户管理页面查看新增信息</p>
                <el-button @click="finishFloorAdd()">返回</el-button>
            </div>
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
    let checkFloorNum = function (rule, value, callback) {
      if (!value) {
        return callback(new Error('楼号不能为空'))
      }
      callback()
    }
    let checkUnitCount = function (rule, value, callback) {
      if (!value) {
        return callback(new Error('单元数不能为空'))
      }
      callback()
    }
    let checkLayerCount = function (rule, value, callback) {
      if (!value) {
        return callback(new Error('单元数不能为空'))
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
      active: 0,
      floormgntAddPreForm: {// 表单数据

      },
      rules: {// 表单验证规则
        CommunitName: [
          { validator: checkCummunitName, trigger: 'blur' }
        ],
        FloorName: [
          { validator: checkFloorName, trigger: 'blur' }
        ],
        FloorNum: [
          { validator: checkFloorNum, trigger: 'blur' }
        ],
        UnitCount: [
          { validator: checkUnitCount, trigger: 'blur' }
        ],
        LayerCount: [
          { validator: checkLayerCount, trigger: 'blur' }
        ],
        FloorAddress: [
          { validator: checkFloorAddress, trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    next () {
      this.active++
      this.active += 1
      window.sessionStorage.setItem('floormgntActive', this.active)
    },
    before () {
      this.active--
      this.active -= 1
      window.sessionStorage.setItem('floormgntActive', this.active)
    },
    gotoFloorAddConfirm () {
      // 跳转之前先前端验证一下表单
      this.$refs['floormgntAddPreForm'].validate((valid) => {
        if (valid) {
          var str = JSON.stringify(this.floormgntAddPreForm)
          window.sessionStorage.setItem('floormgntAddPreForm', str)
          this.next()
        }
      })
    },
    gotoFloorAddUpdate () {
      this.next()
      this.floormgntAddPreForm = {}
      window.sessionStorage.removeItem('floormgntAddPreForm')
    },
    finishFloorAdd () {
      this.$router.push({ name: 'floorQry' })
      window.sessionStorage.removeItem('floormgntActive')
      window.sessionStorage.removeItem('floormgntAddPreForm')
    }
  },
  created () {
    // 当前录入进度的下标用active表示，存在sessionStorage里面
    this.active = Number(window.sessionStorage.getItem('floormgntActive') || 0)
    // 表单填好后我也存一下，防止刷新的时候丢失
    this.floormgntAddPreForm = JSON.parse(window.sessionStorage.getItem('floormgntAddPreForm') || '{}')
  }
}
</script>
<style lang="css">
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
    .floormgnt-steps{
        width: 770px;
        margin: auto;
    }
   .floormgnt-steps .el-step__title.is-success{
       color: #F53F35;
   }
   .floormgnt-steps .el-step__head.is-success{
       color: #F53F35;
       border-color: #F53F35;
   }
   .floormgnt-steps  .el-step__title.is-process{
       color: #F53F35;
   }
   .floormgnt-steps  .el-step__head.is-process{
       color: #F53F35;
       border-color: #F53F35;
   }

   .floormgnt-add-pre-form{
        position: relative;
        height: 500px;
    }
    .floormgnt-add-pre-form .el-form{
        position: absolute;
        left: 0;
        top: 60px;
        right: 60px;
        bottom: 0;
        width: 450px;
        height: 500px;
        margin: auto;

    }
    .floormgnt-add-pre-form .el-form .el-input, .floormgnt-add-pre-form .el-form .el-select{
        width: 340px;

    }
    .floormgnt-add-pre-form .el-form .el-input>.el-input__inner, .floormgnt-add-pre-form .el-form .el-select>.el-input__inner{
        border: 1px solid #ddd;
        border-radius: 2px;
        height: 40px;
    }

    .floormgnt-add-pre-form .el-form .el-button{
        margin-left: 60px;
    }
    .floormgnt-add-pre-form .el-form .el-button.el-button--primary{
        background: linear-gradient(90deg,#F53636,#F86B33);
        border-radius: 0;
        border:1px solid #F64E35;
        color: #fff;
        width: 80px;
        height: 32px;
        line-height: 32px;
        padding: 0px;
    }
     .floormgnt-add-pre-form .el-form .el-button.el-button--info{
        background: #fff;
        border-radius: 0;
        border:1px solid #F64E35;
        color: #F64E35;
        width: 80px;
        height: 32px;
        line-height: 32px;
        padding: 0px;
    }
    /*楼宇录入确认*/
    .floormgnt-add-confirm  .confirm-list{
      width: 470px;
      margin: auto;
    }
    .floormgnt-add-confirm  .confirm-list ul{
      padding: 0
    }
    .floormgnt-add-confirm  .confirm-list li{
      display: flex;
      height: 40px;
      line-height: 40px;
    }
    .floormgnt-add-confirm  .confirm-list li span:first-child{
      flex: 1;
      background: rgb(249, 249, 249);
      border: 1px solid rgba(221, 221, 221, 1);
      text-align: center;
      border-right: none;
    }
    .floormgnt-add-confirm  .confirm-list li span:not(:first-child){
      flex: 2;
      background: #fff;
      border: 1px solid rgba(221, 221, 221, 1);
      text-align: center;
    }
    .floormgnt-add-confirm  .confirm-manipulation{
      width: 470px;
      margin: auto;
    }
    .floormgnt-add-confirm  .confirm-manipulation .el-button{
      margin-left: 110px;
      border-radius: 0;
    }
    .floormgnt-add-confirm  .confirm-manipulation .el-button:first-child{
      background: #F53F35;
      color: #fff;
      width: 88px;
      height: 32px;
      line-height: 32px;
      padding: 0;

    }
    .floormgnt-add-confirm  .confirm-manipulation .el-button:not(:first-child){
      background: #fff;
      color: #F53F35;
      width: 88px;
      height: 32px;
      line-height: 32px;
      padding: 0;
    }
    .floormgnt-add-res .update-res{
      width: 300px;
      margin: auto;
      text-align: center;
    }
    .floormgnt-add-res .update-res p{
      margin: 0px;
    }
    .floormgnt-add-res .update-res p.one{
      font-size: 20px;
      color: #222;
    }
    .floormgnt-add-res .update-res p.two{
      color: #999999;
      font-size: 14px;
      margin-top: 10px;
      margin-bottom: 40px;
    }
    .floormgnt-add-res .update-res .el-button{
      width: 200px;
      height: 40px;
      background: linear-gradient(to right,#F86B33,#F53636);
      color:#fff;
    }
    .floormgnt-add-res .update-res .success-icon {
      margin-bottom: 30px;
    }
    .floormgnt-add-res .update-res .success-icon .el-icon{
      font-size: 68px;
      color: #5BC749;
    }
</style>
