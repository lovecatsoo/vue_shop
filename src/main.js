import Vue from 'vue'
import ElementUi from 'element-ui'
import App from './App.vue'
import store from './store'
import router from './router/index'
import Axios from 'axios'
import './mock/index'
import './assets/css/global.css'
import './assets/font_8dnrhhe39tv/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
let { Message } = ElementUi
Axios.defaults.baseURL = 'http://localhost:3000/api/private/v1'
Axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Axios.interceptors.response.use(response => {
  return response
},
err => {
  if (err.response.status === 401 && err.response.statusText === 'Unauthorized') {
    Message.error('token已过期，请重新登陆')
    return router.push('/')
  }
}
)
Vue.use(ElementUi)
Vue.prototype.$message = Message
Vue.prototype.$axios = Axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
