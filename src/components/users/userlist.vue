<template>
    <div>
        <el-breadcrumb :separator="'>'">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="params.query">
                        <el-button slot="append" @click="getUserList" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="dialogVisible=true">添加用户</el-button>
                </el-col>
            </el-row>
            <el-table :data="userlist" border stripe style="width:100%" :cell-style="cellStyle" :header-cell-style="headerCellStyle" >
                <el-table-column label="姓名"  prop="username">

                </el-table-column>
                <el-table-column label="邮箱" prop="email">
                </el-table-column>
                <el-table-column label="角色" prop="rolename">

                </el-table-column>
                <el-table-column label="状态" prop="">
                  <template slot-scope="scope">
                    <el-switch v-model="scope.row.status" @change="handleStatusChange(scope.row)"> </el-switch>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button size="small" class="el-icon-edit" type="primary" @click="showEditDialog(scope.row)"></el-button>
                        <el-button size="small" class="el-icon-delete" type="danger" @click="deleteConfirm(scope.row.id)" ></el-button>
                        <el-button size="small" class="el-icon-setting" type="warning"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.pageNum" :page-sizes="[1, 2, 4, 6]" :page-size="params.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>
        <el-dialog  title="添加用户" :visible.sync="dialogVisible" width="50%" @close="handleClose">
          <!--添加用户的表单-->
          <el-form status-icon :model="addUserForm" :rules="addUserRule" :label-position="'left'" ref="addUserForm" label-width="70px"  class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
              <el-input type="text" v-model="addUserForm.username" auto-complete="off"></el-input>
           </el-form-item>
          <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="addUserForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
              <el-input v-model="addUserForm.email"></el-input>
          </el-form-item>
         </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
          </span>
        </el-dialog>
        <!--编辑用户的对话框-->
        <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="closeEditDialog">
          <el-form status-icon :model="editForm" :rules="addUserRule" :label-position="'left'" ref="editForm" label-width="70px"  class="demo-ruleForm">
            <el-form-item label="用户名">
              <el-input type="text" v-model="editForm.username" :disabled="true" auto-complete="off"></el-input>
           </el-form-item>
         <el-form-item label="邮箱" prop="email">
              <el-input v-model="editForm.email"></el-input>
          </el-form-item>
         </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editConfirm">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
  data () {
    let checkEmail = function (rule, value, callback) {
      let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!reg.test(value)) {
        return callback(new Error('请输入正确邮箱格式'))
      }
      callback()
    }
    let checkPhone = function (rule, value, callback) {
      let reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
      if (!reg.test(value)) {
        return callback(new Error('请输入正确手机格式'))
      }
      callback()
    }
    return {
      dialogVisible: false,
      editDialogVisible: false,
      params: {
        query: '',
        pageNum: 1,
        pageSize: 6
      },
      total: 0,
      userlist: [],
      addUserForm: {},
      editForm: {},
      addUserRule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 18, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机名', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      let { data: res } = await this.$axios.get('/user/userlist', { params: this.params })

      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      if (res.meta.status === 200) {
        this.userlist = res.users
        this.total = res.total
      }
    },
    cellStyle (row, column, rowIndex, columnIndex) {
      return 'text-align:center'
    },
    headerCellStyle (row, column, rowIndex, columnIndex) {
      return 'text-align:center'
    },
    handleSizeChange (size) {
      this.params.pageSize = size
      this.getUserList()
    },
    handleCurrentChange (num) {
      this.params.pageNum = num
      this.getUserList()
    },
    async handleStatusChange (info) {
      let { email, status } = info
      let { data: res } = await this.$axios.put('/user/statusChange', { email, status })
      if (res.status === 200) {
        this.$message.success('状态修改成功')
      } else {
        this.$message.error('修改失败')
        info.status = !info.status
      }
    },
    handleClose () {
      this.$refs.addUserForm.resetFields()
    },
    // 添加用户的方法
    addUser () {
      this.$refs.addUserForm.validate(async valid => {
        if (!valid) return false
        // 可以发ajax了
        let res = await this.$axios.post('/user/users', { params: this.addUserForm })
        if (res.status === 200) {
          this.dialogVisible = false
          return this.$message('添加成功，请在用户列表查询')
        }
        this.$message(res.msg)
      })
    },
    // 显示编辑用户对话框
    async showEditDialog (info) {
      let { data: res } = await this.$axios.get('/user/user/' + info.id)
      if (res.status === 200) {
        this.editDialogVisible = true
        this.editForm = res.data
        this.editForm.id = info.id
        this.editForm.originEmail = info.email
        this.editForm.username = this.editForm.name
        console.log(res)
      }
    },
    // 关闭对话框
    closeEditDialog () {
      this.$refs.editForm.resetFields()
    },
    // 提交修改
    editConfirm () {
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          let { data: res } = await this.$axios.post('/user/edit', this.editForm)
          if (res.status === 200) {
            this.editDialogVisible = false
            this.getUserList()
          }
          this.$message({ type: 'success', message: res.msg })
        }
      })
    },
    // 删除确认
    async deleteConfirm (id) {
      let confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      if (confirmResult === 'confirm') {
        let { data: res } = await this.$axios.post('/user/deleteUser', { id })
        this.$message({ message: res.msg, type: 'success' })
        this.getUserList()
      }
    }

  }
}
</script>
<style lang="scss" scoped>
    .el-card{
        margin-top: 10px;
        box-shadow: 0 1px 1px 0 rgba(0,0,0,.15) !important;
    }
    .el-table{
      margin-top: 30px;
    }
    .el-pagination{
      margin-top: 10px;
    }
</style>
