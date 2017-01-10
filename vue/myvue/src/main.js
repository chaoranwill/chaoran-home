import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import VueResource from 'vue-resource'

//开启debug模式
Vue.config.debug = true;

Vue.use(VueRouter);
Vue.use(VueResource);

import fircom from './components/fir_com.vue'
import seccom from './components/sec_com.vue'
//创建一个路由器实例
const router = new VueRouter({
	mode:'history',
	// base:_dirname,
	routes:[
	{
		path:'/first',
		component:fircom
	},
	{
		path:'/second',
		component:seccom
	}]
})


const app = new Vue({
	router:router,
    render: h => h(App)
}).$mount('#app')
