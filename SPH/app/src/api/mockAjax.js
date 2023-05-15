import axios from "axios";
// 引入进度条
import nProgress from "nprogress";
import 'nprogress/nprogress.css'

// 二次封装axios

const request = axios.create({
    baseURL: '/mock',
    timeout: 5000,
});
// 请求拦截器
request.interceptors.request.use((config) => {
    // 进度条开始
    nProgress.start()
    // cofig为配置对象，里面有一个属性很重要，header请求头
    return config
});

request.interceptors.response.use((res) => {
    // 进度条结束
    nProgress.done()
    return res.data
},
    (error) => {
        return Promise.reject(new error('faile'))
    })

export default request;