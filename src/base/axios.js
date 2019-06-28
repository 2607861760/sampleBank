// 引入服务器请求模块
import Axios from 'axios';
import router from '../router/index';


Axios.defaults.withCredentials = true;
//Axios.defaults.headers.common['Authorization'] = "Bearer" + '';
// ajax 请求拦截
Axios.interceptors.request.use(
    config => {
        // 如果数据为JSON对象
        // console.log("我是拦截器")
        // config.data = JSON.parse(JSON.stringify(config));
        const token = sessionStorage.getItem('token')
        if (token) {
            config.headers.common['Authorization'] = token;
        }
        return config;
    },
    err => {}
);

// ajax 响应拦截
Axios.interceptors.response.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error.response);
    }
);
// 全局访问请求对象
window.$ajax = Axios;