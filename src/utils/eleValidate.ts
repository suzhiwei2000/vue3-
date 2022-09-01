// * Element 常用表单校验规则

/**
 *  @rule 手机号
 */
export function checkPhoneNumber(rule: any, value: any, callback: any) {
	const regexp = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/;
	if (value === "") callback("请输入手机号码");
	if (!regexp.test(value)) {
		callback(new Error("请输入正确的手机号码"));
	} else {
		return callback();
	}
}
/**
 * 判断是否为空
 */
export function validatenull(val: any) {
	if (typeof val === "boolean") {
		return false;
	}
	if (val instanceof Array) {
		if (val.length === 0) return true;
	} else if (val instanceof Object) {
		if (JSON.stringify(val) === "{}") return true;
	} else {
		if (val === "null" || val == null || val === "undefined" || val === undefined || val === "") return true;
		return false;
	}
	return false;
}
