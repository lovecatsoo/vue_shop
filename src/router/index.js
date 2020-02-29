import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Welcome from '../components/welcome.vue'
import UserList from '../components/users/userlist.vue'
import floorQry from '../components/owners/floorqry.vue'
import floorAdd from '../components/owners/flooradd.vue'
import floorUpdate from '../components/owners/floorupdate.vue'
import Estate from '../components/owners/estate.vue'
import Ownerinfo from '../components/owners/ownerinfo.vue'
import Roles from '../components/rights/roles.vue'
import Vocabulary from '../components/vocabulary/momo.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home',
    component: Home,
    redirect: '/home/welcome',
    children: [
      { path: '/home/welcome', component: Welcome },
      { path: '/home/userlist', component: UserList },
      { path: '/home/buildings', name: 'floorQry', component: floorQry },
      { path: '/home/floorAdd', name: 'floorAdd', component: floorAdd },
      { path: '/home/floorUpdate', name: 'floorUpdate', component: floorUpdate },
      { path: '/home/estates', component: Estate },
      { path: '/home/ownerinfo', component: Ownerinfo },
      { path: '/home/roles', component: Roles },
      { path: '/home/vocabulary', component: Vocabulary }
    ] }
]

const router = new VueRouter({
  routes
})
// 路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  const token = window.sessionStorage.getItem('token')
  if (!token) {
    return next('/login')
  }
  next()
})
export default router
