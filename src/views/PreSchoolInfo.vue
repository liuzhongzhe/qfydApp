<template>
	<div class="pre-school-info-app">
		<van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" title="曲阜远东职业技术学院2022年信息采集" />
		<van-steps :active="step" active-icon="success" style="margin-top: 10px;">
			<van-step>基本信息</van-step>
			<van-step>相关信息</van-step>
			<van-step>身体健康</van-step>
			<van-step>入学信息</van-step>
			<van-step>家庭信息</van-step>
		</van-steps>
		<div class="step-item" v-show="step == 0">
			<van-form @submit="oneToTwo">
				<div style="position: relative;">
					<i class="must-icon">*</i>
					<van-field v-model="formOne.name" disabled name="姓名" label="姓名" placeholder="姓名"
						:rules="[{ required: true, message: '请填写姓名' }]" />
				</div>
				<div style="position: relative;">
					<i class="must-icon">*</i>
					<van-field name="radio" label="性别">
						<template #input>
							<van-radio-group v-model="formOne.sex" direction="horizontal">
								<van-radio name="男" value="0">男</van-radio>
								<van-radio name="女" value="1">女</van-radio>
							</van-radio-group>
						</template>
					</van-field>
				</div>
				<div style="position: relative;">
					<i class="must-icon">*</i>
					<van-field clickable name="picker" :value="formOne.nation" label="民族" placeholder="点击选择民族"
						@click="showMzVisible()" />
				</div>
				<div style="position: relative;">
					<i class="must-icon">*</i>
					<van-field readonly clickable name="calendar" :value="formOne.birthday" label="出生年月"
						placeholder="出生年月" @click="showCalendar = true" />
				</div>
				<div style="position: relative;">
					<i class="must-icon">*</i>
					<van-field v-model="formOne.idcard" disabled name="身份证号" label="身份证号" placeholder="身份证号"
						:rules="[{ required: true, message: '请填写身份证号' }]" />
				</div>
				<div style="position: relative;">
					<i class="must-icon">*</i>
					<van-field v-model="formOne.idcardOffice" name="身份证发证机关" label="身份证发证机关" placeholder="例：xx市公安局"
						:rules="[{ required: true, message: '请填写身份证发证机关' }]" />
				</div>
				<div style="position: relative;">
					<i class="must-icon">*</i>
					<van-field v-model="formOne.phone" name="个人联系电话" label="个人联系电话" placeholder="个人联系电话"
						:rules="[{ required: true, message: '请填写个人联系电话' }]" />
				</div>
				<div style="position: relative;">
					<i class="must-icon">*</i>
					<van-field v-model="formOne.specialty" name="个人特长" label="个人特长" placeholder="个人特长"
						:rules="[{ required: true, message: '请填写个人特长' }]" />
				</div>
				<div style="position: relative;">
					<i class="must-icon">*</i>
					<van-field v-model="formOne.address" name="家庭住址" label="家庭住址" placeholder="例：xx省xx市/县xx区/街道+详细地址"
						:rules="[{ required: true, message: '请填写家庭住址' }]" />
				</div>
				<van-popup v-model="mzVisible" position="bottom">
					<van-picker show-toolbar @confirm="mzConfirm" :columns="minzuArr" @cancel="mzVisible = false" />
				</van-popup>
				<van-calendar v-model="showCalendar" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm" />
				<div style="margin: 30px 10px 0;text-align: right">
					<van-button size="small" hairline style="width: 100px;" type="info" native-type="submit">下一步
					</van-button>
				</div>
			</van-form>
		</div>
		<div class="step-item" v-show="step == 1">
			<van-form @submit="twoToThree()">
				<div style="position: relative;">
					<i class="must-icon">*</i>
					<van-field name="radio" label="政治面貌">
						<template #input>
							<van-radio-group v-model="formTwo.political" direction="horizontal">
								<van-radio name="中共党员">中共党员</van-radio>
								<van-radio name="预备党员">预备党员</van-radio>
								<van-radio name="共青团员" style="margin-top: 5px;">共青团员</van-radio>
								<van-radio name="群众" style="margin-top: 5px;">群众</van-radio>
							</van-radio-group>
						</template>
					</van-field>
				</div>
				<van-field name="switch" label="是否华侨">
					<template #input>
						<van-switch active-value="是" inactive-value="否" v-model="formTwo.ifOverseas" size="20" />
					</template>
				</van-field>
				<van-field name="switch" label="是否烈士子女">
					<template #input>
						<van-switch active-value="是" inactive-value="否" v-model="formTwo.ifMartyr" size="20" />
					</template>
				</van-field>
				<van-field name="switch" label="是否退伍军人">
					<template #input>
						<van-switch active-value="是" inactive-value="否" v-model="formTwo.ifSoldier" size="20" />
					</template>
				</van-field>
				<van-field name="switch" label="是否低保/建档立卡">
					<template #input>
						<van-switch active-value="是" inactive-value="否" v-model="formTwo.lowIncome" size="20" />
					</template>
				</van-field>
				<div style="margin: 30px 10px 0;text-align: right;">
					<van-button size="small" hairline style="margin-left: 100px;width: 100px;" type="info"
						native-type="submit">下一步</van-button>
				</div>
			</van-form>
			<van-button size="small" hairline style="width: 100px;position: relative;bottom: 32px;" @click="step = 0">
				上一步</van-button>
		</div>
		<div class="step-item" v-show="step == 2">
			<van-form @submit="threeToFour()">
				<div style="position: relative;">
					<i class="must-icon">*</i>
					<van-field :rules="[{ required: true, message: '请选择健康状况' }]" name="radio" label="健康状况">
						<template #input>
							<van-radio-group v-model="formThree.healthy" direction="horizontal">
								<van-radio name="良" value="良">良</van-radio>
								<van-radio name="差" value="差">差</van-radio>
							</van-radio-group>
						</template>
					</van-field>
				</div>
				<div style="position: relative;">
					<i class="must-icon">*</i>
					<van-field :rules="[{ required: true, message: '请填写身高(cm)' }]" v-model="formThree.height"
						name="身高(cm)" label="身高(cm)" placeholder="身高(cm)" />
				</div>
				<div style="position: relative;">
					<i class="must-icon">*</i>
					<van-field :rules="[{ required: true, message: '请填写体重(kg)' }]" v-model="formThree.weight"
						name="体重(kg)" label="体重(kg)" placeholder="体重(kg)" />
				</div>
				<div style="margin: 30px 10px 0;text-align: right;">
					<van-button size="small" hairline style="margin-left: 100px;width: 100px;" type="info"
						native-type="submit">下一步</van-button>
				</div>
			</van-form>
			<van-button size="small" hairline style="width: 100px;position: relative;bottom: 32px;" @click="step = 1">
				上一步</van-button>
		</div>
		<div class="step-item" v-show="step == 3">
			<van-form @submit="fourToFive()">
				<div style="position: relative;">
					<i class="must-icon">*</i>
				</div>
				<van-field name="radio" label="类别">
					<template #input>
						<van-radio-group v-model="formFour.ydExamType" direction="horizontal">
							<van-radio name="春考">春考</van-radio>
							<van-radio name="夏考">夏考</van-radio>
							<van-radio name="中考">中考</van-radio>
							<van-radio name="单招综评" style="margin-top: 5px;">单招综评</van-radio>
						</van-radio-group>
					</template>
				</van-field>
				<div style="position: relative;">
					<i class="must-icon">*</i>
					<van-field v-model="formFour.originPlace" name="生源地" label="生源地" placeholder="例：山东省曲阜市石门山风景区远大路1号"
						:rules="[{ required: true, message: '请填写生源地' }]" />
				</div>
				<div style="position: relative;">
					<i class="must-icon">*</i>
					<van-field :rules="[{ required: true, message: '请填写毕业学校' }]" v-model="formFour.juniorSchool"
						name="毕业学校" label="毕业学校" placeholder="请填写学校全称" />
				</div>
				<div style="position: relative;">
					<i class="must-icon">*</i>
					<van-field v-model="formFour.admissionNo" name="准考证号" label="准考证号" placeholder="准考证号"
						:rules="[{ required: true, message: '请填写准考证号' }]" />
				</div>
				<div style="position: relative;">
					<i class="must-icon">*</i>
					<van-field v-model="formFour.fraction" name="中/高考分数" label="中/高考分数" placeholder="中/高考分数"
						:rules="[{ required: true, message: '请填写中/高考分数' }]" />
				</div>
				<div style="margin: 30px 10px 0;text-align: right;">
					<van-button size="small" hairline style="margin-left: 100px;width: 100px;" type="info"
						native-type="submit">下一步</van-button>
				</div>
			</van-form>
			<van-button size="small" hairline style="width: 100px;position: relative;bottom: 32px;" @click="step = 2">
				上一步</van-button>
		</div>
		<div class="step-item" v-show="step == 4">
			<van-form @submit="finish()" @toPre="toPreStep(3)">
				<div v-for="(item,index) in userFamily">
					<p style="padding: 10px 0;" v-if="index == 0"><i v-show="index==0"
							style="color: red;font-size: 20px;position: relative;top: 8px;left: -6px;">*</i>家庭主要成员{{index == 0 ? "一" : "二"}}
					</p>
					<div v-show="index == 0">
						<van-field v-model="item.name" name="名称" label="名称" placeholder="名称"
							:rules="[{ required: true, message: '请填写名称' }]" />
						<van-field clickable name="picker" :value="item.relation" label="关系" placeholder="点击选择关系"
							@click="showGxVisible(index)" :rules="[{ required: true, message: '请选择关系' }]" />
						<van-popup v-model="gxVisible" position="bottom">
							<van-picker show-toolbar @confirm="gxConfirm" :columns="gxColumns"
								@cancel="gxVisible = false" />
						</van-popup>
						<van-field v-model="item.phone" name="工作单位" label="工作单位" placeholder="工作单位"
							:rules="[{ required: true, message: '请填写工作单位' }]" />
						<van-field v-model="item.workUnit" name="联系电话" label="联系电话" placeholder="联系电话"
							:rules="[{ required: true, message: '请填写联系电话' }]" />
						<van-field v-model="item.political" name="政治面貌" label="政治面貌" placeholder="政治面貌"
							:rules="[{ required: true, message: '请填写政治面貌' }]" />
					</div>
				</div>
				<van-checkbox style="margin: 20px 15px 0;position: relative;top: 255px;" v-model="formFour.ifOil" checked>免费校园网开通预申请</van-checkbox>
				<div style="margin: 30px 10px 0;text-align: right;position: relative;top: 200px;">
					<van-button size="small" hairline style="margin-left: 100px;width: 100px;" type="info"
						native-type="submit">完成</van-button>
				</div>

			</van-form>
		</div>
		<div class="step-item" v-show="step == 4" style="position: relative;bottom: 100px;">
				<van-form>
					<div v-for="(item,index) in userFamily">
						<p style="padding: 10px 0;" v-show="index == 1"><i v-show="index==0"
								style="color: red;font-size: 20px;position: relative;top: 8px;left: -6px;">*</i>家庭主要成员{{index == 0 ? "一" : "二"}}
						</p>
						<div v-show="index == 1">
							<van-field v-model="item.name" name="名称" label="名称" placeholder="名称" />
							<van-field clickable name="picker" :value="item.relation" label="关系" placeholder="点击选择关系"
								@click="showGxVisible(index)" />
							<van-popup v-model="gxVisible" position="bottom">
								<van-picker show-toolbar @confirm="gxConfirm" :columns="gxColumns"
									@cancel="gxVisible = false" />
							</van-popup>
							<van-field v-model="item.phone" name="工作单位" label="工作单位" placeholder="工作单位" />
							<van-field v-model="item.workUnit" name="联系电话" label="联系电话" placeholder="联系电话" />
							<van-field v-model="item.political" name="政治面貌" label="政治面貌" placeholder="政治面貌" />
						</div>
					</div>
				</van-form>
			</div>
	</div>
</template>

<script>
	export default {
		name: 'pre-school-info-app',
		data() {
			return {
				userInfo: {},
				userAllInfo: {},
				gxVisible: false,
				showCalendar: false,
				mzVisible: false,
				step: 4,
				gxIndex: 0,
				minDate: new Date(1960, 0, 1),
				maxDate: new Date(2010, 0, 1),
				minzuArr: ['汉族', '满族', '蒙古族', '回族', '藏族', '维吾尔族', '苗族', '彝族', '壮族', '布依族', '侗族', '瑶族', '白族', '土家族', '哈尼族',
					'哈萨克族', '傣族', '黎族', '傈僳族', '佤族', '畲族', '高山族', '拉祜族', '水族', '东乡族', '纳西族', '景颇族', '柯尔克孜族', '土族',
					'达斡尔族', '仫佬族', '羌族', '布朗族', '撒拉族', '毛南族', '仡佬族', '锡伯族', '阿昌族', '普米族', '朝鲜族', '塔吉克族', '怒族', '乌孜别克族',
					'俄罗斯族', '鄂温克族', '德昂族', '保安族', '裕固族', '京族', '塔塔尔族', '独龙族', '鄂伦春族', '赫哲族', '门巴族', '珞巴族', '基诺族'
				],
				gxColumns: ['父亲', '母亲', '爷爷', '奶奶', '其他监护人'],
				userFamily: [{
						"name": "",
						"relation": "",
						"workUnit": "",
						"phone": "",
						"political": "群众"
					},
					{
						"name": "",
						"relation": "",
						"workUnit": "",
						"phone": "",
						"political": "群众"
					},
				],
				formOne: {
					name: '',
					sex: '0',
					nation: '',
					birthday: '',
					idcard: '',
					phone: '',
					specialty: '',
					address: '',
					idcardOffice: ''
				},
				formTwo: {
					political: '',
					ifOverseas: '0',
					ifMartyr: '0',
					ifSoldier: '0',
					lowIncome: '0',
				},
				formThree: {
					healthy: '良',
					height: '',
					weight: '',
				},
				formFour: {
					ydExamType: "春考",
					originPlace: "",
					juniorSchool: "",
					admissionNo: "",
					fraction: "",
					ifOil: ""
				}
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
					if (res.data.code == 200) {
						this.userAllInfo = Object.assign(res.data.data.ydUser, res.data.data.userInfo);
						this.userInfo = res.data.data.userInfo;
						this.ydUser = res.data.data.ydUser;
						this.handleInitData()
						if (res.data.data.userFamily && res.data.data.userFamily.length > 0) {
							this.userFamily = res.data.data.userFamily;
						}
						this.userFamily[0].userId = this.userInfo.id;
						this.userFamily[1].userId = this.userInfo.id;
					}
				})
			}
		},
		methods: {
			onClickLeft() {
				this.$router.go(-1)
			},
			showMzVisible() {
				this.mzVisible = true;
			},
			showGxVisible(val) {
				this.gxIndex = val;
				this.gxVisible = true;
			},
			mzConfirm(value) {
				this.formOne.nation = value;
				this.mzVisible = false;
			},
			gxConfirm(value) {
				this.userFamily[this.gxIndex].relation = value;
				this.gxVisible = false;
			},
			toPreStep(val) {
				this.step = val;
			},
			handleInitData() {
				for (let i in this.formOne) {
					this.formOne[i] = this.userAllInfo[i]
				}
				this.formOne.nation == this.formOne.nation == 1 ? '汉族' : this.formOne.nation;
				// this.formOne.sex = this.formOne.sex == 0?'男':'女';
				for (let i in this.formTwo) {
					this.formTwo[i] = this.userAllInfo[i]
				}
				for (let i in this.formThree) {
					this.formThree[i] = this.userAllInfo[i]
				}
				for (let i in this.formFour) {
					this.formFour[i] = this.userAllInfo[i]
				}
				this.formFour.ifOil = this.formFour.ifOil == 1 ? true : false;
			},
			onConfirm(date) {
				this.formOne.birthday = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
				this.showCalendar = false;
			},
			oneToTwo() {
				this.step = 1;
			},
			twoToThree() {
				this.step = 2;
			},
			threeToFour() {
				this.step = 3;
			},
			fourToFive() {
				this.step = 4;
			},
			finish() {
				this.formFour.ifOil = this.formFour.ifOil ? 1 : 0;
				let _info = Object.assign(this.userAllInfo, this.formOne, this.formTwo, this.formThree, this.formFour);
				for (let i in this.userInfo) {
					this.userInfo[i] = _info[i]
				}
				for (let i in this.ydUser) {
					this.ydUser[i] = _info[i]
				}
				let _obj = {
					userFamily: this.userFamily,
					userInfo: this.userInfo,
					ydUser: this.ydUser
				}
				this.$http({
					method: 'post',
					url: '/student/out/updateInfo',
					data: _obj
				}).then(res => {
					if (res.data.code == 200) {
						this.$message.success({
							title: '系统提示',
							message: '修改成功'
						});
						this.$router.push("/greenChannel")
					}
				})
			}
		},
	}
</script>

<style lang="scss">
	.pre-school-info-app {
		width: 100%;
		background-color: #f7f8fa;
		min-height: 100vh;
		padding-bottom: 60px;

		.must-icon {
			position: absolute;
			color: red;
			top: 12px;
			left: 5px;
			z-index: 11;
			font-size: 20px;
		}

		.van-nav-bar__title {
			font-size: 12px;
			max-width: 80%;
		}

		.van-steps {
			border-radius: 5px;
		}

		.van-form {
			border-radius: 5px;
		}

		.step-item {

			p {
				text-indent: 15px;
			}
		}
	}
</style>
