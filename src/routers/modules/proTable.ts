import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/routers/constant";

// 超级表格模块
const proTableRouter: Array<RouteRecordRaw> = [
	{
		path: "/proTable",
		component: Layout,
		redirect: "/proTable/useHooks",
		meta: {
			title: "超级表格"
		},
		children: [
			{
				path: "/proTable/useHooks",
				name: "useHooks",
				component: () => import("@/views/proTable/useHooks/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "使用 Hooks",
					key: "useHooks"
				}
			},
			{
				path: "/proTable/specialTable",
				name: "specialTable",
				component: () => import("@/views/proTable/specialTable/index.vue"),
				meta: {
					keepAlive: true,
					title: "使用 specialTable",
					key: "specialTable"
				}
			},
			{
				path: "/proTable/normalTable",
				name: "normalTable",
				component: () => import("@/views/proTable/normalTable/index.vue"),
				meta: {
					keepAlive: true,
					title: "使用 normalTable",
					key: "useNormal"
				}
			},
			{
				path: "/proTable/useComponent",
				name: "useComponent",
				component: () => import("@/views/proTable/useComponent/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "使用 Component",
					key: "useComponent"
				}
			}
		]
	}
];

export default proTableRouter;
