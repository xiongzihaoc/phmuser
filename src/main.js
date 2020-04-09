import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import jquery from 'jquery'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './css/main.css'
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant)
// 导入axios
import axios from 'axios'

// // 配置axios
axios.defaults.baseURL = 'http://192.168.0.142:8086/zhuoya-sheet/'
// axios请求拦截器
axios.interceptors.request.use(function (config) {
  // Nprogress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
}, function (error) {
  console.log(error);
})
// axios响应拦截器
axios.interceptors.response.use(function (config) {
  if (config.status != 200) return this.$message.error('服务器异常')
  // Nprogress.done()
  return config;
}, function (error) {
  console.log(error)
})
// 全局挂载axios this.$http调用即可
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  jquery,
  render: h => h(App)
}).$mount('#app')