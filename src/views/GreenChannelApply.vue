<template>
	<div class="app-green-channel-apply" v-loading="loading" v-if="!loading">
		<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
		<div v-if="status">
			<el-result icon="info" v-show="status == 0" title="审核中"></el-result>
			<el-result icon="success" v-show="status == 1" title="审核通过"></el-result>
			<el-result icon="error" v-show="status == 2" title="审核未通过">
				<template slot="extra">
					<van-button @click="fillAgain" size="small">重新填写</van-button>
				</template>
			</el-result>
		</div>
		<div v-else>
			<van-field readonly clickable label="申请类别" :value="form.applyType" placeholder="请选择绿色通道"
				@click="applyTypePickerShow = true" />
			<van-popup v-model="applyTypePickerShow" round position="bottom">
				<van-picker @confirm="onConfirmApply1" show-toolbar :columns="applyTypeOption"
					@cancel="applyTypePickerShow = false" />
			</van-popup>
			<van-field readonly clickable label="特殊人群种类" v-if="form.applyType == '特殊人群'" :value="form.applyTypeSon"
				placeholder="请选择特殊人群种类" @click="applyTypeSonPickerShow = true" />
			<van-popup v-model="applyTypeSonPickerShow" round position="bottom">
				<van-picker show-toolbar :columns="applyTypeSonOption" @cancel="applyTypeSonPickerShow = false"
					@confirm="onConfirmApplySon" />
			</van-popup>
			<van-field v-model="form.applyMoney" label="申请金额" placeholder="请输入申请金额" />
			<van-field v-model="form.checkCode" label="回执校验码" placeholder="请输入回执校验码" />
			<van-form>
				<div style="margin-left: 16px;">
					<p style="margin-top: 10px;margin-bottom: 10px; font-size: 14px;">上传附件</p>
					<van-uploader :max-count="1" v-model="fileList" accept="image/png, image/jpeg"
						:after-read="afterRead" />
				</div>
				<div style="margin-top: 50px;">
					<van-button type="warning" size="small" style="margin-left: 10px;" @click="downloadFile">下载证明材料
					</van-button>
					<van-button @click="onConfirmApply" type="info" size="small" style="margin-left: 10px;">提交
					</van-button>
				</div>
			</van-form>
		</div>
	</div>
</template>

<script>
	import {
		Notify
	} from 'vant';
	export default {
		name: "app-green-channel-apply",
		data() {
			return {
				loading: true,
				isModify: false,
				token: "",
				fileList: [],
				FILELIST: [],
				ydUser: {},
				status: null,
				applyTypeSonPickerShow: false,
				applyTypePickerShow: false,
				applyTypeOption: ['生源地信用助学贷款', '其他渠道助学贷款', '特殊人群'],
				applyTypeSonOption: ['脱贫享受政策家庭学生', '防止返贫监测帮扶对象', '最低生活保障家庭学生', '特困供养学生', '孤儿学生', '烈士子女', '家庭经济困难残疾学生',
					'残疾人子女', '因病因灾因意外事故等刚性支出较大或收入大幅度缩减导致基本生活出现严重困难家庭学生'
				],
				rules: {
					name: [{
						required: true,
						message: '请输入名称',
						trigger: 'blur'
					}],
				},
				form: {
					applyType: "生源地信用助学贷款",
					applyTypeSon: "脱贫享受政策家庭学生",
					proveImg1: "",
					proveImg2: "",
					applyMoney: "",
					checkCode: ""

				}
			}
		},
		components: {
			Notify
		},
		created() {
			if (sessionStorage.getItem("token")) {
				this.token = sessionStorage.getItem("token")
				this.ydUser = JSON.parse(sessionStorage.getItem("ydUser"))
			}
			this.loadGreen()
		},
		methods: {
			onClickLeft() {
				this.$router.go(-1)
			},
			downloadFile() {
				window.open("http://schoolsf.ldyxx.com/profile/lvse.doc")
			},
			fillAgain() {
				this.status = null;
				this.isModify = true;
			},
			loadGreen() {
				this.$http({
					method: 'post',
					url: '/student/out/getGreenWay',
					params: {
						"token": this.token
					}
				}).then(res => {
					this.loading = false;
					for (let i in this.form) {
						if (res.data.data[i]) {
							this.form[i] = res.data.data[i]
						}
					}
					if (this.form.applyType == 0) {
						this.form.applyType = "生源地信用助学贷款"
					} else if (this.form.applyType == 1) {
						this.form.applyType = "其他渠道助学贷款"
					} else if (this.form.applyType == 2) {
						this.form.applyType = "特殊人群"
					}
					if (this.form.applyType && !this.form.applyTypeSon) {
						this.fileList.push({
							name: res.data.data.proveImg1,
							url: res.data.data.proveImg1
						})
						this.FILELIST.push(res.data.data.proveImg1)
					} else if (this.form.applyType && this.form.applyTypeSon) {
						this.fileList.push({
							name: res.data.data.proveImg2,
							url: res.data.data.proveImg2
						})
						this.FILELIST.push(res.data.data.proveImg2)
					}
					this.loading = false;
					this.form.id = res.data.data.id;
					this.status = res.data.data.status;
				})
			},
			onConfirmApplySon(value) {
				this.form.applyTypeSon = value;
				this.applyTypeSonPickerShow = false;
			},
			onConfirmApply1(value) {
				this.form.applyType = value;
				this.applyTypePickerShow = false;
			},
			onConfirmApply(value) {
				let _obj = {}
				if (!this.form.applyMoney) {
					Notify({
						type: 'warning',
						message: '请填写申请金额'
					});
					return;
				}
				_obj.applyMoney = this.form.applyMoney;
				if (this.fileList.length == 0) {
					Notify({
						type: 'warning',
						message: '请上传附件'
					});
					return;
				}
				if (this.form.applyType == "生源地信用助学贷款") {
					this.form.applyType = 0
				} else if (this.form.applyType == "其他渠道助学贷款") {
					this.form.applyType = 1
				} else if (this.form.applyType == "特殊人群") {
					this.form.applyType = 2
				}
				if (this.form.applyType != 2) {
					_obj.applyType = this.form.applyType;
					delete this.form.applyTypeSon;
					_obj.proveImg1 = this.FILELIST[0];
					delete this.form.proveImg2;
				} else {
					delete this.form.proveImg1;
					_obj.applyTypeSon = this.form.applyTypeSon;
					_obj.proveImg2 = this.FILELIST[0];
				}
				_obj.token = this.token;
				_obj.stuId = this.ydUser.id;
				_obj.checkCode = this.form.checkCode;
				if (this.isModify) {
					_obj.status = 0;
					_obj.id = this.form.id;
				}
				this.$http({
					method: 'post',
					url: '/student/out/greenWay',
					params: _obj
				}).then(res => {
					if (res.data.code == 200) {
						Notify({
							type: 'success',
							message: '提交成功'
						});
						this.loadGreen()
					} else {
						Notify({
							type: 'warning',
							message: res.data.msg
						});
					}
				})

			},
			afterRead(fileObj) {
				fileObj.status = "uploading";
				fileObj.message = "上传中...";
				const formData = new FormData();
				formData.append("file", fileObj.file);
				this.$http({
					method: 'post',
					url: '/student/out/uploadImg',
					data: formData
				}).then(res => {
					if (res.data.code == 200) {
						fileObj.status = "done"
						this.FILELIST.push(res.data.msg)
						// this.loadGreen()
					}
				})
			}
		}
	}
</script>

<style lang="scss">
</style>
