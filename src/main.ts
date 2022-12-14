import { createApp } from "vue";
import App from "./App.vue";
// reset style sheet
import "@/styles/reset.scss";
// CSS common style sheet
import "@/styles/common.scss";
// iconfont css
import "@/assets/iconfont/iconfont.scss";
// font css
import "@/assets/fonts/font.scss";
// element plus
import ElementPlus from "element-plus";
// element icons
import * as Icons from "@element-plus/icons-vue";
// element css
import "element-plus/dist/index.css";
// element dark(内置暗黑模式)
import "element-plus/theme-chalk/dark/css-vars.css";
// custom element dark(自定义暗黑模式)
import "@/styles/element-dark.scss";
// custom element css
import "@/styles/element.scss";
// custom directives
import directives from "@/directives/index";
// vue Router
import router from "@/routers/index";
// vue i18n
import I18n from "@/language/index";
// pinia store
import pinia from "@/store/index";
// svg icons
import "virtual:svg-icons-register";
// 长时间不懂就退出登录
// import astrict from "@/utils/astrict";
const app = createApp(App);

// 注册element Icons组件 Object.keys一个表示给定对象的所有可枚举属性的字符串数组 就是抽取他们的键值
Object.keys(Icons).forEach(key => {
	app.component(key, Icons[key as keyof typeof Icons]);
});
// window.addEventListener("popstate", function () {
// 	history.pushState(null, null, this.document.URL);
// });
// .use(astrict)
app.use(router).use(I18n).use(pinia).use(directives).use(ElementPlus).mount("#app");
