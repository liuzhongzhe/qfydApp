<template>
	<div class="app-register">
		<div class="container">
			<div class="title">
				<p>用户注册</p>
				<div class="form-memo">
					<p><span>已有账号?</span><a @click="toRegister()">登录</a></p>
				</div>
			</div>
			<van-form @submit="onSubmit">
				<van-field v-model="registerForm.idCard" name="请输入身份证号" label="身份证号" placeholder="身份证号"
					:rules="[{ required: true, message: '请填写身份证号' }]" />
				<van-field v-model="registerForm.name" name="请输入姓名" label="姓名" placeholder="姓名"
					:rules="[{ required: true, message: '请填写姓名' }]" />
				<van-field v-model="registerForm.phone" name="请输入手机号" label="手机号" placeholder="手机号"
					:rules="[{ required: true, message: '请填写手机号' },{ validator: verifyPhone, message: '请输入正确的手机号码' }]" />
				<van-field v-model="registerForm.msgCode" center clearable label="短信验证码" placeholder="请输入短信验证码">
					<template #button>
						<van-button size="small" type="primary" @click="sendMsgCode" :disabled="msgBtnTxt != '发送验证码'">
							{{msgBtnTxt}}</van-button>
					</template>
				</van-field>
				<van-field v-model="registerForm.password" type="password" name="密码" label="密码" placeholder="请填写密码"
					:rules="[{ required: true, message: '请填写密码' }]" />
				<van-field v-model="registerForm.rePassword" type="password" name="密码" label="密码" placeholder="请再次填写密码"
					:rules="[{ required: true, message: '请再次填写密码' }]" />
				<div style="margin: 16px;">
					<van-button round block type="info" native-type="submit">注册</van-button>
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
				registerForm: {
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
			toRegister() {
				this.$router.push("/login")
			},
			forgetPwd() {
				this.$router.push("/retrievePwd")
			},
			onSubmit(values) {
				if (values) {
					this.toRegister()
				}
			},
			sendMsgCode(val) {
				if (this.msgBtnTxt == 0) {
					this.msgBtnTxt = "发送验证码";
				} else if (this.msgBtnTxt == '发送验证码') {
					let _status = testPhone(this.registerForm.phone)
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
								"phone": this.registerForm.phone
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
			async onSubmit() {
				if (this.registerForm.rePassword != this.registerForm.password) {
					this.$message.warning({
						title: '系统提示',
						message: '两次输入密码不同，请重新输入'
					});
					return;
				}
				this.$http({
					method: 'post',
					url: '/student/out/register',
					params: this.registerForm
				}).then(res => {
					if (res.code == 200) {
						this.registerForm.rePassword == '';
						this.$message.success({
							title: '系统提示',
							message: '注册成功'
						});
						window.sessionStorage.setItem('token', res.data.token);
						this.$router.push("/home")
					} else {
						this.$message.error({
							title: '系统提示',
							message: res.data.msg
						});
					}
				})

			}
		},
	};
</script>

<style lang="scss">
	.app-register {
		.container {
			height: 260px;
			position: absolute;
			top: 40%;
			margin-top: -130px;
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
