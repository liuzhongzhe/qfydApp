import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入axios
import axios from "axios";
//导入全局样式表
import  './plugins/global.css'
//导入全局js组件
import {err} from './plugins/global.js'

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

//引入进度条
import NProgress from 'nprogress'
//阻止显示生产模式的消息
Vue.config.productionTip = false
// 配置请求的跟路径
Vue.prototype.$http = axios
axios.defaults.baseURL = "/api";


//请求拦截
axios.interceptors.request.use(config => {
    NProgress.start();
    config.headers['Access-Token'] = window.sessionStorage.getItem('token')
    return config
});
//响应拦截
axios.interceptors.response.use(config => {
    NProgress.done()
    return config
}, err)


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
