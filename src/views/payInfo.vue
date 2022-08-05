<template>
	<div class="pay-info">
		<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
		<el-result icon="success" title="缴费成功" v-if="payInfo && payInfo.payStatus  == 1">
			<template slot="extra" style="margin-top: 0;">
				<p>{{payInfo.payOk == 0 ? '未缴清' : '已缴清'}}</p>
				<p>{{getSubTitle()}}</p>
				<p>{{'缴费时间'+payInfo.payTime}}</p>
			</template>
		</el-result>
		<van-empty description="暂无数据，请缴费完成一周后进行查询" v-else/>
	</div>
</template>

<script>
	export default {
		name: 'pay-info',
		data() {
			return {
				loading: true,
				payInfo: null
			}
		},
		created() {
			if (sessionStorage.getItem("token")) {
				this.token = sessionStorage.getItem("token");
				this.$http({
					method: 'post',
					url: '/student/out/getPayment',
					params: {
						token: this.token
					}
				}).then(res => {
					this.loading = false;
					if (res.data.code == 200) {
						this.payInfo = res.data.data[0];
					}
				})
			}
		},
		methods: {
			onClickLeft() {
				this.$router.go(-1)
			},
			getSubTitle() {
				return '缴费金额 ' + this.payInfo.payAmount;
			}
		}
	}
</script>

<style lang="scss">
	.pay-info {}
</style>
