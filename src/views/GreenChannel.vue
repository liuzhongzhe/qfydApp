<template>
	<div class="green-channel">
		<van-cell title="绿色通道申请" @click="toGreenChannelApply" />
		<van-cell title="缴费" @click="toPay" />
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			toGreenChannelApply() {
				this.$router.push("/greenChannelApply")
			},
			toPay() {
				window.open("http://qfyd.cdbyrj.com/Phone/default.aspx")
			}
		}
	}
</script>

<style lang="scss">
	.green-channel {
		width: 100%;
		background-color: #f7f8fa;
		min-height: 100vh;
		padding: 10px;

		.van-cell-group {
			background-color: transparent;
		}

		.van-cell {
			margin-bottom: 10px;
			border-radius: 5px;
		}
	}
</style>