<template>
	<div class="app-login">
		<div class="container">
			<div class="title">
				<p>用户登录</p>
				<div class="form-memo">
					<p><span>没有账号吗?</span><a @click="toRegister()">注册新账号</a></p>
				</div>
			</div>
			<van-form @submit="onSubmit">
				<van-field v-model="loginForm.phone" name="请输入手机号" label="手机号" placeholder="手机号"
					:rules="[{ required: true, message: '请填写手机号' }]" />
				<van-field v-model="loginForm.password" type="password" name="密码" label="密码" placeholder="密码"
					:rules="[{ required: true, message: '请填写密码' }]" />
				<div style="margin: 16px;">
					<van-button round block type="info" native-type="submit">登录</van-button>
				</div>
			</van-form>
			<p style="text-align: right;position: relative;right: 20px;font-size: 14px;" @click="toFindPwd">找回密码</p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loginForm: {
					phone: '',
					password: '',
				},
			};
		},
		methods: {
			toFindPwd(){
				this.$router.push("/retrievePwd")
			},
			toRegister() {
				this.$router.push("/register")
			},
			forgetPwd(){
				this.$router.push("/retrievePwd")
			},
			onSubmit(values) {
				if (values) {
					this.toLogin()
				}
			},
			async toLogin() {
				const res = await this.$http({
					method: 'post',
					url: '/student/out/loginByPwd',
					params: this.loginForm
				})
				if (res.data.code === 200) {
					this.$message.success({
						title: '系统提示',
						message: '登录成功'
					});
					sessionStorage.setItem('token', res.data.data.ydUser.token);
					sessionStorage.setItem('userInfo', JSON.stringify(res.data.data.userInfo));
					sessionStorage.setItem('ydUser', JSON.stringify(res.data.data.ydUser));
					this.$router.push("/home")
				} else {
					this.$message.error({
						title: '系统提示',
						message: res.data.msg
					});
				}
			}
		},
	};
</script>

<style lang="scss">
	.app-login {
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
