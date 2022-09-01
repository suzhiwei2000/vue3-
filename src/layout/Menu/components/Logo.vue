<template>
	<div class="logo flx-center">
		<Lottie width="30px" height="100%" class="Lottie" src="https://assets7.lottiefiles.com/packages/lf20_jcvkuope.json" />
		<!-- <img src="@/assets/images/logo.png" alt="logo" /> -->
		<span v-show="!isCollapse" class="title">Deloitte</span>
	</div>
</template>

<script setup lang="ts">
import Lottie from "@/components/lottie/index.vue";

defineProps<{ isCollapse: boolean }>();
</script>

<style scoped lang="scss">
@import "../index.scss";
.title::after {
	position: absolute;
	top: 28px;
	right: 31px;
	width: 10px;
	height: 10px;
	content: "";
	background-color: green;
	border-radius: 50%;
}
</style>
