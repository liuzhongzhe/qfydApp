<template>
	<div class="home">
		<van-notice-bar color="#1989fa" background="#ecf9ff">
			曲阜远东职业技术学院
		</van-notice-bar>
		<div style="padding: 10px;">
			<van-swipe :autoplay="3000" style="height: 200px;background-color: #ffffff;border-radius: 8px;">
				<van-swipe-item v-for="(image, index) in imagesList" :key="index">
					<!-- <img v-lazy="image" /> -->
					<img :src="image" alt="" style="height: 200px;width: 100%;padding: 10px;">
				</van-swipe-item>
			</van-swipe>
		</div>
		<van-cell-group inset>
			<van-cell title="信息填报" @click="toPath('preSchoolInfo')" />
		</van-cell-group>
		<van-cell-group inset style="margin-top: 8px;">
			<van-cell title="绿色通道申请" @click="toPath('greenChannelApply')" />
		</van-cell-group>
		<van-cell-group inset style="margin-top: 8px;">
			<van-cell title="转专业申请" @click="toPath('switchMajor')" />
		</van-cell-group>
		<van-cell-group inset style="margin-top: 8px;">
			<van-cell title="去缴费" @click="toPayEvent" />
		</van-cell-group>
		<van-cell-group inset style="margin-top: 8px;">
			<van-cell title="缴费信息查看" @click="toPath('payinfo')" />
		</van-cell-group>
		<van-cell-group inset style="margin-top: 8px;">
			<van-cell title="班级分配查询" @click="toPath('classGrade')" />
		</van-cell-group>
		<van-cell-group inset style="margin-top: 8px;">
			<van-cell title="宿舍查询" @click="toPath('dormitory')" />
		</van-cell-group>
		<van-popup v-model="payVisible" style="width: calc(100% - 20px);border-radius: 5px;padding: 10px;">
			<p style="line-height: 24px;">Tip:</p>
			<p style="line-height: 24px;">1.请学生点击缴费自主缴费</p>
			<p style="line-height: 24px;">2.对于想申请转专业的学生，请先申请转专业再进行缴费，如已缴费再申请转专业，请到校内联系老师，或联系辅导员。</p>
			<p style="line-height: 24px;">3.对于家庭困难、退伍军人等特殊学生，开放了绿色通道功能，可以进行提交相关信息。</p>
			<van-button color="#7232dd" plain block @click="toPath('greenChannelApply')" style="margin-top: 10px;">绿色通道申请</van-button>
			<van-button color="#7232dd" plain block @click="toPath('switchMajor')" style="margin-top: 10px;">转专业申请</van-button>
			<van-checkbox v-model="noAlert" style="margin-top: 10px;">不再提示</van-checkbox>
			<div style="display: flex;margin-top: 20px;">
				<van-button type="default" style="flex: 1;" @click="payVisible=false">取消</van-button>
				<van-button type="primary" style="flex: 1;" @click="toPay">去交费</van-button>
			</div>
		</van-popup>
		<!-- <preSchoolInfo v-if="tabIndex == 0"></preSchoolInfo>
		<greenChannel v-if="tabIndex == 1"></greenChannel>
		<mine v-if="tabIndex == 2"></mine> -->
	</div>

</template>

<script>
	import preSchoolInfo from './PreSchoolInfo.vue'
	import greenChannel from './GreenChannelApply.vue'
	import mine from './Mine.vue'
	export default {
		data() {
			return {
				payVisible: false,
				noAlert:false,
				imagesList: [require("@/assets/images/p2.jpg"), require("@/assets/images/p1.jpg"), require(
					"@/assets/images/p3.jpg"), require("@/assets/images/p4.jpg"), require(
					"@/assets/images/p5.jpg"), require("@/assets/images/p6.jpg")],
				tabIndex: 0,
				noAlertStatus:false
			};
		},
		components: {
			preSchoolInfo,
			greenChannel,
			mine
		},
		methods: {
			toPayEvent(){
				console.log(localStorage.getItem("noAlert") == true)
				if(localStorage.getItem("noAlert") == true || localStorage.getItem("noAlert") == 'true'){
					window.open('http://qfyd.cdbyrj.com/Phone/default.aspx')
				}else{
					this.payVisible = true;
				}
			},
			toPath(url) {
				this.$router.push("/" + url)
			},
			toPay() {
				if(this.noAlert){
					localStorage.setItem("noAlert",true)
				}
				this.payVisible = false;
				window.open('http://qfyd.cdbyrj.com/Phone/default.aspx')
			},
		}
	};
</script>

<style>
	.home {
		height: calc(100vh - 50px);
		padding-bottom: 10px;
		background-color: #f7f8fa;
		overflow-y: scroll;
	}
	.van-cell{
		padding: 8px 16px !important;
	}
	.van-cell-group--inset {
		margin: 0 10px;
	}
</style>
