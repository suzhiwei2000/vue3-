// 监听用户鼠标移动事件，长期不移动就锁屏
// 引入路由和storage工具函数
import storage from "./store";
import { useRouter } from "vue-router";
let lastTime = new Date().getTime();
let currentTime = new Date().getTime();
let timeOut = 30 * 60 * 1000; //设置超时时间: 30分钟

// vue实现用户长时间不操作，自动退出登录
window.onload = function () {
	// 当按下鼠标键时触发 以为着点击登录按钮的时候计时 mouseover
	window.document.onmousedown = function () {
		storage.setItem("lastTime", JSON.stringify(new Date().getTime()));
	};
};

function checkTimeout() {
	const route = useRouter();
	currentTime = new Date().getTime(); //更新当前时间
	lastTime = storage.getItem("lastTime", null);

	if (currentTime - lastTime > timeOut) {
		//判断是否超时
		// 清除storage的数据(登陆信息和token)
		storage.clear();
		// 跳到登陆页
		route.push({ name: "login" });
	}
}

export default function () {
	/* 定时器 间隔30秒检测是否长时间未操作页面 */
	window.setInterval(checkTimeout, 30000);
}
