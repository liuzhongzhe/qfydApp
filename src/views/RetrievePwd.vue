<template>
	<div class="app-register">
		<div class="container">
			<div class="title">
				<p>找回密码</p>
				<div class="form-memo">
					<p><span>已有账号?</span><a @click="toLogin()">登录</a></p>
				</div>
			</div>
			<van-form @submit="onSubmit">
				<van-field v-model="retrieveForm.idCard" name="请输入身份证号" label="身份证号" placeholder="身份证号"
					:rules="[{ required: true, message: '请填写身份证号' }]" />
				<van-field v-model="retrieveForm.name" name="请输入姓名" label="姓名" placeholder="姓名"
					:rules="[{ required: true, message: '请填写姓名' }]" />
				<van-field v-model="retrieveForm.phone" name="请输入手机号" label="手机号" placeholder="手机号"
					:rules="[{ required: true, message: '请填写手机号' },{ validator: verifyPhone, message: '请输入正确的手机号码' }]" />
				<van-field v-model="retrieveForm.msgCode" center clearable label="短信验证码" placeholder="请输入短信验证码">
					<template #button>
						<van-button size="small" type="primary" @click="sendMsgCode" :disabled="msgBtnTxt != '发送验证码'">
							{{msgBtnTxt}}</van-button>
					</template>
				</van-field>
				<van-field v-model="retrieveForm.password" type="password" name="密码" label="密码" placeholder="请填写密码"
					:rules="[{ required: true, message: '请填写密码' }]" />
				<van-field v-model="retrieveForm.rePassword" type="password" name="密码" label="密码" placeholder="请再次填写密码"
					:rules="[{ required: true, message: '请再次填写密码' }]" />
				<div style="margin: 16px;">
					<van-button round block type="info" native-type="submit">找回密码</van-button>
				</div>
			</van-form>
		</div>

	</div>
</template>

<script>
	import {
		isEmpty,
		testPhone
	} from '@/utils/util.js'
	export default {
		data() {
			return {
				msgBtnTxt: "发送验证码",
				retrieveForm: {
					phone: '',
					msgCode: '',
					password: '',
					rePassword: '',
					idCard: '',
					name: '',
				},
			};
		},
		methods: {
			verifyPhone(val) {
				return /^1\d{10}$/.test(val) // 返回true或false
			},
			toLogin() {
				this.$router.push("/login")
			},
			onSubmit(values) {
				if (values) {
					if (this.retrieveForm.rePassword != this.retrieveForm.password) {
						this.$message.warning({
							title: '系统提示',
							message: '两次输入密码不同，请重新输入'
						});
						return;
					}
					const res = this.$http({
						method: 'post',
						url: '/student/out/updatePwd',
						params: this.retrieveForm
					})
					if (res.code === 200) {
						this.retrieveForm.rePassword = '';
						this.$message.success({
							title: '系统提示',
							message: '找回密码成功'
						});
						setTimeout(()=>{
							this.$router.push("/login")
						},500)
					} else {
						this.$message.error({
							title: '系统提示',
							message: res.data.msg
						});
					}
				}
			},
			sendMsgCode(val) {
				if (this.msgBtnTxt == 0) {
					this.msgBtnTxt = "发送验证码";
				} else if (this.msgBtnTxt == '发送验证码') {
					let _status = testPhone(this.retrieveForm.phone)
					if (_status == 1) {
						this.$message.warning({
							title: '系统提示',
							message: "请输入手机号"
						});
						return;
					} else if (_status == 2) {
						this.$message.warning({
							title: '系统提示',
							message: "手机号格式不正确"
						});
						return;
					} else if (_status == 3) {
						this.$http({
							method: 'post',
							url: '/student/out/sendPhoneCode',
							params: {
								"phone": this.retrieveForm.phone
							}
						}).then(res => {
							if (res.status == 200) {
								this.$message.success({
									title: '系统提示',
									message: "验证码发送成功，请注意查收"
								});
							}
						})
					}
					this.msgBtnTxt = 60;
					setTimeout(() => {
						this.sendMsgCode(60)
					}, 1000)
				} else {
					val--;
					this.msgBtnTxt = val;
					setTimeout(() => {
						this.sendMsgCode(val)
					}, 1000)
				}
			},
		},
	};
</script>

<style lang="scss">
	.app-register {
		.container {
			height: 450px;
			position: absolute;
			top: 40%;
			margin-top: -225px;
			width: 100%;
			text-align: center;

			.title {
				text-align: center;

				>p {
					font-size: 20px;
					font-weight: bold;
					margin-bottom: 30px;
				}

				.form-memo {
					margin-bottom: 30px;

					p {
						cursor: pointer;
						font-size: 14px;
						color: rgba(0, 0, 0, 0.9);

						span {
							cursor: default;
							color: rgba(0, 0, 0, 0.6);
							margin-right: 8px;
						}
					}
				}
			}
		}
	}
</style>
