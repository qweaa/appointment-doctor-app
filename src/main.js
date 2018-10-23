// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import store from './store/'
import './utils/rem'
import './assets/styles/common.less'
import  { ToastPlugin, Loading, ConfirmPlugin, LoadingPlugin } from 'vux'
// import AjaxPlugin from './utils/http'
import { mapState } from 'vuex'
Vue.use(ToastPlugin)
// Vue.use(AjaxPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)

import './utils/mock'


require('es6-promise').polyfill() //Promise 兼容低版本浏览器
FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  components: {
    Loading
  },
  computed: {
    ...mapState({
      isLoading: state => state.Loading.isLoading
    })
  },
  methods:{
  },
  mounted(){
    //获取用户坐标--跨域问题--
    // $.getJSON('http://api.map.baidu.com/location/ip?ak=leHgn3ZeVIK6bGVunKDxCKGfkVGHDMKf',function(data){console.log('定位',data)})
  }
}).$mount('#app-box')
export{
  Vue
}