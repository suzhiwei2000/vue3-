import { defineStore } from "pinia";
import { MenuState } from "../interface";
import piniaPersistConfig from "@/config/piniaPersist";

// MenuStore
export const MenuStore = defineStore({
	id: "MenuState",
	state: (): MenuState => ({
		// menu collapse
		isCollapse: false,
		// menu List
		menuList: []
	}),
	getters: {},
	actions: {
		async setCollapse() {
			this.isCollapse = !this.isCollapse;
		},
		async setMenuList(menuList: Menu.MenuOptions[]) {
			console.log(menuList);
			// 静态添加路由
			menuList.forEach(item => {
				if (item.title === "超级表格") {
					item.children?.push(
						{ path: "/proTable/normalTable", title: "使用 normalTable", icon: "menu" },
						{ path: "/proTable/specialTable", title: "使用 specialTable", icon: "menu" }
					);
				}
			});
			this.menuList = menuList;
		}
	},
	persist: piniaPersistConfig("MenuState")
});
