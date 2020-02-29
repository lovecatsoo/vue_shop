<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar">
                <img src="../assets/logo.png" alt="">
            </div>
            <el-form class="login_form" ref="loginForm" :model="loginForm" :rules="rules">
                <el-form-item prop="email">
                    <el-input placeholder="请输入邮箱" prefix-icon="iconfont icon-admin" v-model="loginForm.email"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="请输入密码" type="password" prefix-icon="iconfont icon-search" v-model="loginForm.password" ></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登陆</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, message: 'email is required', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'password is required', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      this.$refs.loginForm.resetFields()
    },
    login () {
      this.$refs.loginForm.validate(async valid => {
        // 如果验证不成功
        if (!valid) {
          return false
        }
        // 验证通过的情况
        let { data } = await this.$axios.post('/user/login', this.loginForm)
        if (data.status === 200) {
          this.$message.success('登陆成功')
          window.sessionStorage.setItem('token', data.token)
          this.$router.push('/home')
        } else {
          this.$message.error(data.msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
    .login_container{
        background: #2b4b6b;
        height: 100%;
        .login_box{
            width:450px;
            height: 284px;
            background: #fff;
            border-radius: 3px;
            position: absolute;
            left:0px;
            top: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            .avatar{
                box-sizing: border-box;
                background: #fff;
                border-radius: 50%;
                padding:10px;
                width: 130px;
                height: 130px;
                position: absolute;
                left: 50%;
                transform: translate(-50%,-50%);
                border: 1px solid #eee;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    border: 1px solid #eee
                }
            }
            }
            .btns{
                display: flex;
                justify-content: flex-end;
            }
            .login_form{
                box-sizing: border-box;
                position: absolute;
                bottom: 0;
                width: 100%;
                padding: 0 20px;
            }
    }
</style>
