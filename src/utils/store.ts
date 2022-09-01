export default {
	setItem(key: string, value: string) {
		value = JSON.stringify(value);
		window.localStorage.setItem(key, value);
	},
	getItem(key: string, defaultValue: any) {
		let value = window.localStorage.getItem(key);
		try {
			value = JSON.parse(value as string);
		} catch {}
		return value || defaultValue;
	},
	removeItem(key: string) {
		window.localStorage.removeItem(key);
	},
	clear() {
		window.localStorage.clear();
	}
};
