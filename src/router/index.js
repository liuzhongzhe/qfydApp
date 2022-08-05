import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Mine from '../views/Mine.vue'
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import RetrievePwd from '../views/RetrievePwd.vue';
import PayInfo from '../views/payInfo.vue';
import InfoAnnounce from '../views/InfoAnnounce.vue';
import GreenChannelApply from '../views/GreenChannelApply.vue';
import GreenChannel from '../views/GreenChannel.vue';
import PreSchoolInfo from '../views/PreSchoolInfo.vue';
import Dormitory from '../views/Dormitory.vue';
import ClassGrade from '../views/ClassGrade.vue';
import SwitchMajor from '../views/SwitchMajor.vue';
// import NProgress from 'nprogress'
Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/home',
		name: 'home',
		component: Home
	},
	{
		path: '/mine',
		name: 'mine',
		component: Mine
	},
	{
		path: '/login',
		name: 'login',
		component: Login
	},
	{
		path: '/infoAnnounce',
		name: 'InfoAnnounce',
		component: InfoAnnounce
	}, {
		path: '/classGrade',
		name: 'ClassGrade',
		component: ClassGrade
	},
	{
		path: '/switchMajor',
		name: 'SwitchMajor',
		component: SwitchMajor
	},
	{
		path: '/greenChannelApply',
		name: 'greenChannelApply',
		component: GreenChannelApply
	},
	{
		path: '/greenChannel',
		name: 'greenChannel',
		component: GreenChannel
	},
	{
		path: '/preSchoolInfo',
		name: 'preSchoolInfo',
		component: PreSchoolInfo
	},
	{
		path: '/register',
		name: 'register',
		component: Register
	},
	{
		path: '/retrievePwd',
		name: 'retrievePwd',
		component: RetrievePwd
	},
	{
		path: '/dormitory',
		name: 'dormitory',
		component: Dormitory
	},

	{
		path: '/payinfo',
		name: 'payinfo',
		component: PayInfo
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})


// 挂载路由导航守卫
router.beforeEach(async (to, from, next) => {
	// to 将要访问的路径
	// from 代表从哪个路径跳转而来
	// next 是一个函数，表示放行
	//     next()  放行    next('/login')  强制跳转
	const tokenStr = window.sessionStorage.getItem('token')
	if ((to.path === '/login' || to.path === '/register' || to.path === '/retrievePwd') && !tokenStr)
		return next()
	if (tokenStr) {
		if (to.path === '/login') {
			next({
				path: '/home'
			})
		} else {
			next();
		}
	} else {
		next({
			path: '/login'
		})
	}
})

export default router
