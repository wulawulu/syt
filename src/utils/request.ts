//对于axios函数库进行二次封装
import axios from 'axios'
import {ElMessage} from "element-plus";

const request = axios.create({
    baseURL: '/api',
    timeout: 5000,
});
//请求拦截器
request.interceptors.request.use((config) => {
    //config:请求拦截器回调注入的对象(配置对象),配置对象的身上最重要的: 配置headers属性

    return config;
});

//响应拦截器
request.interceptors.response.use((response) => {
    //响应拦截器成功的回调,一般会进行简化数据
    return response.data;
}, (error) => {
    //处理http网络错误
    let status = error.response.status;
    switch (status) {
        case 404:
            ElMessage({
                type: 'error',
                message: '请求失败路径出现问题'
            })
            break;
        case 501 | 502 | 503 | 504 | 505:
            ElMessage({
                type: 'error',
                message: '服务器挂了'
            })
            break;
    }
    return Promise.reject(new Error(error.message));
})


export default request;