import {
  AjaxPlugin
} from 'vux'
import store from '../store/index'
import router from '../router'


// 全局的默认值
AjaxPlugin.$http.defaults.timeout = 0;
// 判断是本地测试还是线上测试
if(window.location.href.indexOf('192.168.3')===-1){
  AjaxPlugin.$http.defaults.baseURL = 'http://x_zyys.b2co.cn';
}else{
  AjaxPlugin.$http.defaults.baseURL = 'http://192.168.3.101';
}
// AjaxPlugin.$http.defaults.headers.token = store.state.token.token;
// AjaxPlugin.$http.defaults.headers.mpToken = store.state.token.mpToken
// Object.assign(AjaxPlugin.$http.defaults.headers.common, tokenObj);
// 添加请求拦截器
AjaxPlugin.$http.interceptors.request.use(
  config => {
    console.log('发送请求的路由:',router.currentRoute.fullPath)
    console.log(store.state.token.token,store.state.token.mpToken)
    console.log('请求配置=：',config.url)
    const tokenObj = {
      token: store.state.token.token,
      mpToken: store.state.token.mpToken,
      page:router.currentRoute.fullPath
    }
    Object.assign(config.headers.common, tokenObj);
    return config;
  },
  err => {
    return Promise.reject(err);
  }
)

// 添加响应拦截器
AjaxPlugin.$http.interceptors.response.use((res) => {
  console.log('响应拦截器',res.data)
  if (res.data.message === 'login') {
    if (window.localStorage.getItem("userInfo")) {
      window.localStorage.removeItem("userInfo")
    }
    window.location.href = res.data.data;
  } else {
    return res;
  }
}, (error) => {
  return Promise.reject(error);
});



export default AjaxPlugin;
