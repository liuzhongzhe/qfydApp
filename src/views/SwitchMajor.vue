<template>
	<div class="switch-major" v-loading="loading" v-if="!loading">
		<div v-if="status">
			<el-result icon="info" v-show="status == 0" title="审核中"></el-result>
			<el-result icon="success" v-show="status == 1" title="审核通过"></el-result>
			<el-result icon="error" v-show="status == 2" title="审核未通过">
				<template slot="extra">
					<van-button @click="fillAgain" size="small">重新填写</van-button>
				</template>
			</el-result>
		</div>
		<div  v-if="!status && swithData && swithData.length >0">
			<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
			<van-field v-model="swithData[0].label" label="学校" disabled placeholder="请输入学校" />
			<van-field v-model="chooseTxt" label="专业" placeholder="请选择专业" @click="campusPickerShow=true" />
			<van-field
			  v-model="form.remark"
			  rows="3"
			  autosize
			  label="原因及说明"
			  type="textarea"
			  maxlength="200"
			  placeholder="请输入原因及说明"
			  show-word-limit
			/>
			<van-button type="info" block @click="toSubmit"
				style="position: absolute;bottom: 80px;margin: 0 10px;width: calc(100% - 20px);">提交申请</van-button>
			<van-popup v-model="campusPickerShow" round position="bottom">
				<van-cascader v-model="cascaderValue" title="请选择校区" :options="swithData[0].children"
					:field-names="fieldNames" @finish="chooseOk" @close="cascaderValue=false" />
			</van-popup>
		</div>
	</div>
</template>

<script>
	import {
		Notify
	} from 'vant';
	export default {
		name: "switch-major",
		data() {
			return {
				cascaderValue:false,
				fieldNames: {
					text: 'label',
					value: 'id',
					children: 'children',
				},
				loading: true,
				isModify: false,
				token: "",
				status: null,
				swithData: [],
				form: {
					adjustCampus: '', //校区
					adjustGrade: '', //年级
					adjustMajor: '', //专业
					adjustSdept: '', //院系
					remark:''
				},
				chooseTxt: "",
				gradeMap: {},
				campusPickerShow: false,
			}
		},
		components: {
			Notify
		},
		created() {
			if (sessionStorage.getItem("token")) {
				this.token = sessionStorage.getItem("token")
			}
			this.loadData()
			this.loadInfo()

		},
		methods: {
			fillAgain() {
				this.status = null;
				this.isModify = true;
			},
			toSubmit(){
				this.form.token = this.token;
				this.$http({
					method: 'post',
					url: '/student/out/adjustMajor',
					params: this.form
				}).then(res => {
					if(res.data.code == 200){
						Notify({
							type: 'success',
							message: '申请成功'
						});
					}
				})
			},
			chooseOk(val) {
				this.$http({
					method: 'post',
					url: '/student/out/getSchoolOrg',
					params: {
						"token": this.token
					}
				}).then(res => {
					this.swithData = res.data.data;
				})
				this.form.adjustCampus = val.selectedOptions[0].id;
				this.form.adjustGrade = val.selectedOptions[1].id;
				this.form.adjustMajor = val.selectedOptions[2].id;
				this.form.adjustSdept = val.selectedOptions[3].id;
				let _arr = []
				for (let i = 0; i < val.selectedOptions.length; i++) {
					_arr.push(val.selectedOptions[i].label)
				}
				this.chooseTxt = _arr.join(",")
				console.log(this.chooseTxt)
			},
			loadData() {
				this.$http({
					method: 'post',
					url: '/student/out/getSchoolOrg',
					params: {
						"token": this.token
					}
				}).then(res => {
					this.swithData = res.data.data;
				})
			},
			loadInfo() {
				this.$http({
					method: 'post',
					url: '/student/out/getAdjustMajor',
					params: {
						"token": this.token
					}
				}).then(res => {
					console.log(res.data)
					// this.status = res.data.data.status;
					this.status = 2;
					this.loading=false;
				})
			},
			onClickLeft() {
				this.$router.go(-1)
			},
			onConfirmApplySon(value) {
				this.form.applyTypeSon = value;
				this.applyTypeSonPickerShow = false;
			},
			onConfirmApply1(value) {
				this.form.applyType = value;
				this.applyTypePickerShow = false;
			},
		}
	}
</script>

<style lang="scss">
	.switch-major {
		min-height: 100vh;
	}
</style>
