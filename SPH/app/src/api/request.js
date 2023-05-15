import axios from "axios";
// 引入进度条
import nProgress from "nprogress";
import 'nprogress/nprogress.css'


// 引入store模块
import store from "@/store";
import { getToken } from "@/utils/token";

// 二次封装axios

const request = axios.create({
    baseURL: 'http://gmall-h5-api.atguigu.cn/api',
    timeout: 5000,
});
// 请求拦截器
request.interceptors.request.use((config) => {
    if (store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token

    }
    if (getToken()) {
        // console.log(getToken());
        config.headers.token = getToken()
    }
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