<template>
    <el-container>
        <el-header>
            <div>
                <img src="../assets/heima.jpg" alt="">
                <span>黑马物业管理系统</span>
            </div>
            <el-button type=“info” @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <el-aside :width="menuWidth+'px'"><!--这个是侧边菜单栏-->
                <el-menu background-color="#373d41" router :collapse-transition="false" unique-opened text-color="#fff" :default-active="defaultActive" active-text-color="#409eff" :collapse="isMenuCollapse" >
                    <div class="menu-toggler" @click="collpaseMenu">|||</div>
                    <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
                        <template slot="title">
                            <i :class="getIconClass[item.id]"></i>
                            <span>{{item.authName}}</span>
                        </template>
                        <el-menu-item :index="subItem.path+''" v-for="subItem in item.child" :key="subItem.id" @click="setDefaultActive(subItem.path)">
                            <i class="el-icon-menu"></i> {{subItem.authName}}
                        </el-menu-item>
                    </el-submenu>
                </el-menu>

            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
  data () {
    return {
      menulist: [],
      isMenuCollapse: false,
      menuWidth: 200
    }
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/')
    },
    collpaseMenu () {
      this.isMenuCollapse = !this.isMenuCollapse
      this.menuWidth = this.menuWidth === 200 ? 60 : 200
    },
    async getMenulist () {
      // 先从本地去取，本地没有
      let menulist = JSON.parse(window.sessionStorage.getItem('menulist'))
      if (!menulist) {
        let { data: res } = await this.$axios.get('/menu/menulist')
        this.menulist = res.menulist
        window.sessionStorage.setItem('menulist', JSON.stringify(res.menulist))
        return
      }
      this.menulist = menulist
    },
    setDefaultActive (path) {
      window.sessionStorage.setItem('defaultActive', path)
    }
  },
  computed: {
    getIconClass () { // 此方法返回一个对象，存放左侧菜单列表所需的类
      let obj = {}
      this.menulist.forEach(item => {
        obj[item.id] = 'iconfont icon-' + item.path
      })
      return obj
    }
  },
  created () {
    this.getMenulist()
    let defaultActive = window.sessionStorage.getItem('defaultActive')
    this.defaultActive = defaultActive || ''
  }
}
</script>
<style lang="scss">
        .iconfont{
          margin-right: 10px;
        }
        .el-container{
            height: 100%;
            .el-main{
              padding-top: 20px;
            }
        }
        .el-header{
            text-align: center;
            background: #373d41;
            line-height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 !important;
            > div{
                display: flex;
                align-items: center;
                >img{
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    margin-right: 10px;
                }
            }
        }
        .el-aside{
            background: #373d41;
            .el-menu{
              border-right: none;
              .menu-toggler{
                background: #4a5064;
                text-align: center;
                color: #fff;
                height: 20px;
                line-height: 20px;
                cursor: pointer;
              }
            }
        }
</style>
