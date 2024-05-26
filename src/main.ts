import {createApp} from 'vue'
import App from '@/App.vue'
import '@/style/reset.scss'

import HospitalTop from '@/components/hospital_top/index.vue';
import HospitalBottom from '@/components/hospital_bottom/index.vue';
import router from "@/router";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const app = createApp(App);
app.component('HospitalTop', HospitalTop);
app.component('HospitalBottom', HospitalBottom);

app.use(ElementPlus, {
    locale: zhCn,
})
app.use(router);
app.mount('#app')
