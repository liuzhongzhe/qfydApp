import Vue from 'vue'

import 'element-ui/lib/theme-chalk/index.css'
import 'nprogress/nprogress.css';
import Moment from 'moment'
import ElementUI from 'element-ui';

Vue.prototype.$moment = Moment

Vue.use(ElementUI)

// 定义全局时间戳过滤器
Vue.filter('formatDate', function (value) {
    return Moment(value).format('YYYY-MM-DD HH:mm:ss')
})

const err = (error) => {
    if (error.response) {
        let data = error.response.data
        const token = window.sessionStorage.getItem('token')
        console.log("------异常响应------", token)
        console.log("------异常响应------", error.response.status)
        switch (error.response.status) {
            case 500:
                if (data.message == "Token失效,请重新登录") {
                    ElementUI.Message.error("登录超时，请重新登录")
                    window.sessionStorage.removeItem('token')
                    window.location.reload()
                }
                break
            default:
                break
        }
    }
    return Promise.reject(error)
};

export {
    err
}
