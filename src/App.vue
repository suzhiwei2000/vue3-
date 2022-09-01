<template>
	<!-- 自定义命名空间 可以配置国际话 大小 按钮等样式 -->
	<el-config-provider :locale="i18nLocale" :button="config" :size="assemblySize">
		<router-view></router-view>
	</el-config-provider>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted, onUnmounted, ref } from "vue";
import { GlobalStore } from "@/store";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const router = useRouter();
// 配置element中英文
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
// 使用主题
import { useTheme } from "@/hooks/useTheme";
useTheme();
let timer = ref(0);
window.addEventListener(
	"click",
	() => {
		// 为了方便，我们把点击事件的时间直接存到sessionStorage中去，这样方便获取比较
		sessionStorage.setItem("lastClickTime", JSON.stringify(new Date().getTime()));
	},
	true
);
onMounted(() => {
	isTimeOut();
});
function isTimeOut() {
	// 使用定时器之前，要清除一下定时器
	clearInterval(Number(timer));
	// clearInterval(timer);
	timer.value = window.setInterval(() => {
		// setInterval不能用 要用window.setInterval 计时器"不可分配给类型
		let lastClickTime = Number(sessionStorage.getItem("lastClickTime"));
		let nowTime = new Date().getTime(); // 获取当前时间
		if (router.currentRoute.value.name == "login") return;
		console.log("当前时间和之前点击时间", nowTime, lastClickTime);
		// 假设我们需求是：5秒钟不进行点击操作，就提示登录退出
		if (nowTime - lastClickTime > 1000 * 30 * 10) {
			clearInterval(Number(timer));
			console.log(111);
			ElMessage({
				type: "success",
				message: "长时间未操作，请重新登录"
			});
			router.push({ path: "/login" });
		}
	}, 10000);
	console.log(timer);
}
onUnmounted(() => {
	// 最后一步，离开页面的时候，清除一下定时器，也解绑点击事件
	clearInterval(Number(timer));
	window.removeEventListener("click", () => {}, true);
});
const globalStore = GlobalStore();
// 配置element按钮文字中间是否有空格
const config = reactive({
	autoInsertSpace: false
});

// element 语言配置
const i18nLocale = computed((): any => {
	if (globalStore.language && globalStore.language == "zh") return zhCn;
	if (globalStore.language == "en") return en;
	return "";
});

// 配置全局组件大小 (small/default(medium)/large)
const assemblySize = computed((): string => globalStore.assemblySize);
</script>

<style scoped lang="scss"></style>
