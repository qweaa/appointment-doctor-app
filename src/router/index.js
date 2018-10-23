import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
// import HelloFromVux from '@/pages/HelloFromVux'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/map', //地图
      name: 'map',
      component: function (resolve) {
        require(['../pages/map.vue'], resolve)
      }
    }, {
      path: '/',
      name: 'home',
      component: function (resolve) {
        require(['../pages/home.vue'], resolve)
      }
    },{
      path: '/store', //门店
      name: 'store',
      component: function (resolve) {
        require(['../pages/store.vue'], resolve)
      }
    }, {
      path: '/storeInfo',
      name: 'storeInfo',
      component: function (resolve) {
        require(['../pages/storeInfo.vue'], resolve)
      }
    },
    {
      path: '/payCenter',
      name: 'payCenter',
      component: resolve => {
        require(['../pages/payCenter.vue'], resolve)
      }
    },
    {
      path: '/setting',
      name: 'setting',
      component: resolve => {
        require(['../pages/setting.vue'], resolve)
      }
    },
    {
      path: '/appointment',
      name: 'appointment',
      component: function (resolve) {
        require(['../pages/appointment.vue'], resolve)
      }
    },
    {
      path: '/doctor',
      name: 'doctor',
      component: function (resolve) {
        require(['../pages/doctor.vue'], resolve)
      }
    },
    {
      path: 'userinfo/:username/pay'
    },
    {
      path: '/user',
      name: 'user',
      component: function (resolve) {
        require(['../pages/user.vue'], resolve)
      }
    },
    {
      path: '/user/:username/personalSettings',
      name: 'personalSettings',
      component: function (resolve) {
        require(['../pages/personalSettings.vue'], resolve)
      }
    },
    {
      path: '/user/:username/voucherCenter',
      name: 'voucherCenter',
      component: function (resolve) {
        require(['../pages/voucherCenter.vue'], resolve)
      }
    },
    {
      path: '/order',
      name: 'order',
      component: function (resolve) {
        require(['../pages/order.vue'], resolve)
      }
    },
    {
      path: '/paySuccess',
      name: 'paySuccess',
      component: function (resolve) {
        require(['../pages/paySuccess.vue'], resolve)
      }
    },
    {
      path: '/myEvaluate',
      name: 'myEvaluate',
      component: function (resolve) {
        require(['../pages/myEvaluate'], resolve)
      }
    },
    {
      path: '/submitEvaluate',
      name: 'submitEvaluate',
      component: function (resolve) {
        require(['../pages/submitEvaluate'], resolve)
      }
    },
    {
      path: '/login',
      name: 'login',
      component: function (resolve) {
        require(['../pages/login'], resolve)
      }
    },
    {
      path: '/voucherSuccess',
      name: 'voucherSuccess',
      component: function (resolve) {
        require(['../pages/voucherSuccess'], resolve)
      }
    },
  ]
})


// 页面切换显示 Loading
router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {
    isLoading: true
  })
  console.log('如有',to.query)
  var token = to.query.token;
  var mpToken = to.query.mpToken;
  var upMpToken = to.query.upMpToken;
  if (token) {
    store.commit('login', {
      token: token
    })
  }
  if (mpToken) {
    store.commit('login', {
      mpToken: mpToken
    })
  }
  if (upMpToken) {
    store.commit('login', {
      mpToken: upMpToken
    })
  }
  console.log('如有',token,mpToken,upMpToken)
  next()
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {
    isLoading: false
  })
})

export default router
