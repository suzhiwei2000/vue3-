<template>
	<div class="registered-container">
		<el-form ref="registerdRef" :model="registerdFrom" :rules="registerdRules" size="large">
			<el-form-item prop="username">
				<el-input v-model="registerdFrom.username" placeholder="账号">
					<template #prefix>
						<el-icon class="el-input__icon"><user /></el-icon>
					</template>
				</el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input type="password" v-model="registerdFrom.password" placeholder="密码" show-password autocomplete="new-password">
					<template #prefix>
						<el-icon class="el-input__icon"><lock /></el-icon>
					</template>
				</el-input>
			</el-form-item>
			<el-form-item prop="suerPassword">
				<el-input
					type="password"
					v-model="registerdFrom.suerPassword"
					placeholder="确认密码"
					show-password
					autocomplete="new-password"
				>
					<template #prefix>
						<el-icon class="el-input__icon"><lock /></el-icon>
					</template>
				</el-input>
			</el-form-item>
		</el-form>
		<div class="promise"><el-checkbox v-model="remenber">我同意某某隐私政策</el-checkbox></div>
		<div class="btn">
			<el-button @click="registered(registerdRef)" size="large" type="primary" :loading="loading" class="btn-child">
				注册
			</el-button>
			<el-button @click="comeBack()" size="large" class="btn-child"> 返回 </el-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { ElForm } from "element-plus";
const remenber = ref(false);
const registerdFrom = reactive({ username: "", password: "", suerPassword: "" });
const loading = ref(false);
const emit = defineEmits(["showRegister"]);

type FormInstance = InstanceType<typeof ElForm>;
const registerdRef = ref<FormInstance>();
function validateConfirmPassword() {
	return async (_rule: any, value: string) => {
		if (!value) {
			return Promise.reject("请输入密码");
		}
		if (value !== registerdFrom.password) {
			console.log(registerdFrom.password);
			return Promise.reject("两次输入密码不一致");
		}
		return Promise.resolve();
	};
}
const registerdRules = reactive({
	username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
	password: [{ required: true, message: "请输入密码", trigger: "blur" }],
	suerPassword: [{ validator: validateConfirmPassword(), trigger: "change" }]
});
function registered(val: any) {
	console.log(val);
}
const comeBack = () => {
	emit("showRegister", true);
};
</script>

<style lang="scss" scoped>
.promise {
	margin-bottom: 10px;
}
.btn {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	&-child {
		width: 100%;
		margin-bottom: 10px;
		margin-left: 0;
	}
}
</style>
