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
                    <el-button type="primary">添加用户</el-button>
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
                    <template slot-scope="">
                        <el-button size="small" class="el-icon-edit" type="primary"></el-button>
                        <el-button size="small" class="el-icon-delete" type="danger"></el-button>
                        <el-button size="small" class="el-icon-setting" type="warning"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.pageNum" :page-sizes="[1, 2, 4, 6]" :page-size="params.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
        </el-card>
    </div>
</template>
<script>
export default {
  data () {
    return {
      params: {
        query: '',
        pageNum: 1,
        pageSize: 2
      },
      total: 0,
      userlist: []

    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    test () {
      alert('你妈死了')
    },
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
