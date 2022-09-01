<template>
	<div class="login" v-show="showLogin">
		<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
			<el-form-item prop="username">
				<el-input v-model="loginForm.username" placeholder="用户名：admin / user">
					<template #prefix>
						<el-icon class="el-input__icon"><user /></el-icon>
					</template>
				</el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input
					type="password"
					v-model="loginForm.password"
					placeholder="密码：123456"
					show-password
					autocomplete="new-password"
				>
					<template #prefix>
						<el-icon class="el-input__icon"><lock /></el-icon>
					</template>
				</el-input>
			</el-form-item>
		</el-form>
		<div class="remenber">
			<el-checkbox v-model="remenber">记住我</el-checkbox>
			<el-button link type="primary">忘记密码？</el-button>
		</div>
		<div class="login-btn">
			<!-- <el-button :icon="Aim" round @click="resetForm(loginFormRef)" size="large">注册</el-button> -->
			<el-button :icon="UserFilled" round @click="login(loginFormRef)" size="large" type="primary" :loading="loading">
				登录
			</el-button>
		</div>
		<div class="other-login">
			<el-button block class="child-login"> 手机登录 </el-button>
			<el-button block class="child-login"> 二维码登录 </el-button>
			<el-button block class="child-login" @click="showRegister(false)"> 注册 </el-button>
		</div>
	</div>
	<regisrered v-show="!showLogin" @showRegister="showRegister"></regisrered>
</template>

<script setup lang="ts">
import regisrered from "./registered.vue";
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Login } from "@/api/interface";
import { UserFilled } from "@element-plus/icons-vue";
import type { ElForm } from "element-plus";
import { ElMessage } from "element-plus";
import { loginApi } from "@/api/modules/login";
import { GlobalStore } from "@/store";
import { MenuStore } from "@/store/modules/menu";
import { TabsStore } from "@/store/modules/tabs";
import md5 from "js-md5";
const remenber = ref(false);
const showLogin = ref(true);
const emit = defineEmits(["showLogin"]);
const globalStore = GlobalStore();
const menuStore = MenuStore();
const tabStore = TabsStore();
// 定义 formRef（校验规则）
// 【vue中的instanceType用法】父组件用ref获取子组件时，通过 instanceType获取子组件的类型 ts的写法
type FormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<FormInstance>();
// const loginFormRef = ref(); 等价于这个
const loginRules = reactive({
	username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
	password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});

// 登录表单数据
const loginForm = reactive<Login.ReqLoginForm>({
	username: "admin",
	password: "123456"
});
function showRegister(val: boolean) {
	emit("showLogin", val);
	showLogin.value = val;
}

const loading = ref<boolean>(false);
const router = useRouter();
// login
const login = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async valid => {
		if (!valid) return;
		loading.value = true;
		try {
			const requestLoginForm: Login.ReqLoginForm = {
				username: loginForm.username,
				password: md5(loginForm.password)
			};
			const res = await loginApi(requestLoginForm);
			// * 存储 token
			globalStore.setToken(res.data!.access_token);
			// * 登录成功之后清除上个账号的 menulist 和 tabs 数据
			menuStore.setMenuList([]);
			tabStore.closeMultipleTab();
			loading.value = false;
			ElMessage.success("登录成功！");
			router.push({ name: "home" });
			// 设置长时间用户不操作，退出登录的效果
			sessionStorage.setItem("lastClickTime", JSON.stringify(new Date().getTime()));
		} catch (error) {
			//  finally {
			// 	loading.value = false;
			// }
			console.error(error);
		}
	});
};

// resetForm
// const resetForm = (formEl: FormInstance | undefined) => {
// 	if (!formEl) return;
// 	formEl.resetFields();
// };

onMounted(() => {
	// 监听enter事件（调用登录）
	document.onkeydown = (e: any) => {
		e = window.event || e;
		if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") {
			if (loading.value) return;
			login(loginFormRef.value);
		}
	};
});
</script>

<style scoped lang="scss">
@import "../index.scss";
.remenber {
	display: flex;
	justify-content: space-between;

	// padding: 20px 0;
}
.other-login {
	display: flex;
	justify-content: space-between;
	margin-top: 20px;
	.child-login {
		padding: 15px 20px;
	}
}
</style>
