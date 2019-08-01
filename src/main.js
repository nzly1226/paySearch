// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import qs from 'qs'
import "babel-polyfill"



Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.prototype.baseURL = "http://cs.szgyxny.com:8090/charging";
//Vue.prototype.baseURL = "http://218.90.138.98:8086/charging";
//Vue.prototype.baseURL = 'http://192.168.0.250:8087/charging';

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
