/* themeConfigProp */
export interface ThemeConfigProp {
	primary: string;
	isDark: boolean;
	isGrey: boolean;
	isWeak: boolean;
	breadcrumb: boolean;
	tabs: boolean;
	footer: boolean;
}
// Lock screen information
export interface LockInfo {
	// Password required
	pwd?: string | undefined;
	// Is it locked?
	isLock?: boolean;
}

/* GlobalState */
export interface GlobalState {
	token: string;
	userInfo: any;
	assemblySize: string;
	language: string;
	themeConfig: ThemeConfigProp;
	lockPasswd: string;
	isLock: boolean;
}

/* MenuState */
export interface MenuState {
	isCollapse: boolean;
	menuList: Menu.MenuOptions[];
}

/* TabsState */
export interface TabsState {
	tabsMenuValue: string;
	tabsMenuList: TabsOptions[];
}

/* AuthState */
export interface AuthState {
	authButtons: {
		[key: string]: any;
	};
	authRouter: string[];
}
