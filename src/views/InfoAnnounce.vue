<template>
	<div class="pay-info-search">
		<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
		<van-panel title="学生基本信息" :desc="info.name+' '+info.idCard"></van-panel>
		<van-panel title="学生入学前信息填报是否完成" :desc="info.status == 1 ? '已完成' : '未完成'"></van-panel>
		<van-panel title="缴费是否成功" :desc="info.paystatus == 1 ? '已完成' : '未完成'"></van-panel>
		<van-panel title="班级是否分配" :desc="getClassName()"></van-panel>
		<van-panel title="宿舍是否分配" :desc="getDomName()"></van-panel>
		<van-panel title="报到日期" :desc="info.admission"></van-panel>
	</div>
</template>

<script>
	export default {
		name: "pay-info-search",
		data() {
			return {
				loading: true,
				info: {},
				ydUser: {},
				token: ''
			}
		},
		created() {
			if (sessionStorage.getItem("userInfo")) {
				this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
				this.ydUser = JSON.parse(sessionStorage.getItem("ydUser"));
				this.$http({
					method: 'post',
					url: '/student/out/getInfoPublic',
					data: {
						'idCard': this.ydUser.idCard
					}
				}).then(res => {
					if (res.data.code == 200) {
						this.loading = false;
						this.info = res.data.data[0]
					}
				})
			}
		},
		methods: {
			getClassName() {
				if (!this.info.dorCampusName && !this.info.apartment && !this.info.dormitoryName) {
					return '暂未分配班级，请耐心等待';
				} else {
					let _str = "已分配";
					return _str + this.info.dorCampusName + this.info.apartment + this.info.dormitoryName;
				}

			},
			getDomName() {
				if (!this.info.campusName && !this.info.sdeptName && !this.info.className) {
					return '暂未分配宿舍，请耐心等待';
				} else {
					let _str = "已分配";
					return _str + this.info.campusName + this.info.sdeptName + this.info.className;
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
