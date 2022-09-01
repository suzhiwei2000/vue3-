<template>
	<div class="login-container flx-center">
		<SwitchDark class="dark" />
		<Language class="lang"></Language>
		<div class="login-box">
			<div class="login-left">
				<Lottie width="100%" height="100%" class="Lottie" src="https://assets6.lottiefiles.com/packages/lf20_ucbyrun5.json" />

				<!-- <img src="@/assets/images/login_left0.png" alt="login" /> -->
			</div>
			<div class="login-form">
				<div class="login-logo">
					<h2 class="logo-text" v-show="loginRef">登录</h2>
					<h2 class="logo-text" v-show="!loginRef">注册</h2>
				</div>
				<LoginForm ref="loginRef" @showLogin="showLogin" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="login">
import { ref } from "vue";
import SwitchDark from "@/components/SwitchDark/index.vue";
import LoginForm from "./components/LoginForm.vue";
import Language from "@/layout/Header/components/Language.vue";
import Lottie from "@/components/lottie/index.vue";
const loginRef = ref(true);
function showLogin(val: boolean) {
	loginRef.value = val;
	console.log(loginRef.value);
	console.log(loginRef);
}
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
