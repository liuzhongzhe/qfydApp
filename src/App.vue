<template>
	<div id="app">
		<router-view @logoutHandle="logoutHandle()"></router-view>
		<van-tabbar v-model="tabIndex" @change="tabChange" v-if="$route.path !='/login' && $route.path !='/register' && $route.path !='/retrievePwd'">
			<van-tabbar-item icon="home-o">主页</van-tabbar-item>
			<van-tabbar-item icon="friends-o">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {
				tabIndex:0
			}
		},
		created() {
			if(this.$route.path == "/home"){
				this.tabIndex = 0;
			}else if(this.$route.path == "/mine"){
				this.tabIndex = 1;
			}
		},
		methods: {
			logoutHandle(){
				this.tabIndex = 0;
			},
			tabChange(value) {
				if(value ==0){
					this.$router.push("/home")
				}else if(value == 1){
					this.$router.push("/mine")
				}
			}
		}
	}
</script>

<style>
</style>
