/**
 * http配置
 */
// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
import { Loading, Message } from 'element-ui'
// 超时时间
axios.defaults.timeout = 5000
// http请求拦截器
var loadinginstace
// axios.interceptors.request.use(config => {
//   // element ui Loading方法
//   loadinginstace = Loading.service({ fullscreen: true })
//   return config
// }, error => {
//   loadinginstace.close()
//   Message.error({
//     message: '加载超时'
//   })
//   return Promise.reject(error)
// })
// // http响应拦截器
// axios.interceptors.response.use(data => {// 响应成功关闭loading
//   loadinginstace.close()
//   return data
// }, error => {
//   loadinginstace.close()
//   Message.error({
//     message: '加载失败'
//   })
//   return Promise.reject(error)
// })

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 400: err.message = '请求错误(400)' ; break;
                case 401:
                    // 这里写清除token的代码
                    err.message = '未授权，请重新登录(401)';
//                     router.replace({
//                         path: 'login',
//                         query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
//                     })

                    break;
                case 403: err.message = '拒绝访问(403)'; break;
                case 404: err.message = `请求出错(404)`; break;
                case 408: err.message = '请求超时(408)'; break;
                case 500: err.message = '服务器错误(500)'; break;
                case 501: err.message = '服务未实现(501)'; break;
                case 502: err.message = '网络错误(502)'; break;
                case 503: err.message = '服务不可用(503)'; break;
                case 504: err.message = '网络超时(504)'; break;
                case 505: err.message = 'HTTP版本不受支持(505)'; break;
                default: err.message = `连接出错(${err.response.status})!`;

            }
        }
        return Promise.reject(error.response.data) //请求错误时，直接结束

        //return Promise.resolve(error);//请求错误时，不会直接结束，将会继续传到then里面,无论请求成功还是失败，在成功的回调中都能收到通知

    });

export default axios