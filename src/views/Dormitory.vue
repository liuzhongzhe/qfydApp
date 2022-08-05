<template>
	<div class="dormitory">
		<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
		<van-panel title="宿舍号" :desc="userInfo.dormitory ? userInfo.dormitory :'暂未分配宿舍号，请耐心等待'"></van-panel>
		<van-panel title="宿舍位置" :desc="getSxSite()"></van-panel>
	</div>
</template>

<script>
	export default {
		name: "dormitory",
		data() {
			return {
				loading: true,
				userInfo: {},
				ydUser: {},
				token: ''
			}
		},
		created() {
			if (sessionStorage.getItem("token")) {
				this.token = sessionStorage.getItem("token");
				this.$http({
					method: 'post',
					url: '/student/out/getStuInfoByToken',
					params: {
						token: this.token
					}
				}).then(res => {
					this.userInfo = res.data.data.userInfo;
					this.ydUser = res.data.data.ydUser;
					console.log(this.userInfo)
					console.log(this.ydUser)
				})
			}
		},
		methods: {
			getSxSite() {
				if (!this.userInfo.bedDoor && !this.userInfo.bedEast && !this.userInfo.bedUpper) {
					return "暂未分配宿舍位置，请耐心等待";
				} else {
					return this.userInfo.bedDoor + this.userInfo.bedEast + this.userInfo.bedUpper;
				}
			},
			onClickLeft() {
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="scss">
</style>
