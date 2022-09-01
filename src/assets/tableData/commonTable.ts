export const commonData = {
	userData: [
		{
			label: "用户姓名",
			prop: "username",
			width: 140
		},
		{
			label: "性别",
			prop: "gender",
			width: 140,
			formatter: (row: { gender: string }) => {
				return row.gender == "1" ? "男" : "女";
			}
		},
		{
			label: "身份证号",
			prop: "idCard"
		},
		{
			label: "邮箱",
			prop: "email",
			width: 240
		},
		{
			label: "居住地址",
			prop: "address"
		},
		{
			label: "创建时间",
			prop: "createTime",
			width: 200
		},
		{
			label: "用户状态",
			prop: "status",
			width: 180
		}
	]
};
