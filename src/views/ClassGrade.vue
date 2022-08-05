<template>
	<div class="dormitory">
		<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
		<van-panel title="学校" :desc="userInfo.juniorSchool"></van-panel>
		<van-panel title="年级" :desc="ydUser.gradeName"></van-panel>
		<van-panel title="院系" :desc="ydUser.sdeptName"></van-panel>
		<van-panel title="专业" :desc="ydUser.majorName"></van-panel>
		<van-panel title="班级" :desc="ydUser.className ? ydUser.className :'暂未分配班级，请耐心等待'"></van-panel>
		<div style="padding: 8px 16px !important;">
			<p style="color: #323233;font-size: 14px;line-height: 24px;">辅导员信息</p>
			<div v-for="item in teacherList" style="margin-top: 4px;color: #969799;font-size: 12px;line-height: 18px;">
				<span style="margin-right: 10px;">{{item.name}}</span><a :href="'tel:'+item.phone">{{item.phone}}</a>
			</div>
		</div>
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
				teacherList: [],
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
					this.teacherList = res.data.data.teacherList;
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
