import { ElLink, ElDivider, ElTag } from "element-plus";
export default [
	{
		label: "编号",
		width: 80,
		type: "index"
	},
	{ label: "员工姓名", prop: "staffName" },
	{
		label: "角色",
		render(props) {
			const { roleVOList } = props.row;
			return [
				roleVOList.map(item => {
					return <ElTag type="success">{item.name}</ElTag>;
				})
			];
		}
	},
	{ label: "手机号", prop: "phone" },
	{ label: "邮箱", prop: "email" },
	{ label: "创建时间", prop: "createTime" },
	{
		label: "状态",
		width: 100,
		align: "center",
		render(props) {
			const { row } = props;
			return [
				<ElTag effect="dark" type={["success", "warning"][row.state]}>
					{["启用", "停用"][row.state]}
				</ElTag>
			];
		}
	},
	{
		label: "操作",
		align: "center",
		render(props) {
			const { row } = props;
			return [
				<ElLink type="primary" onClick={() => props["handle-edit"](row)}>
					编辑
				</ElLink>,
				<ElDivider direction="vertical" />,
				<ElLink type="danger" onClick={() => props["handel-delete"](row)}>
					删除
				</ElLink>
			];
		}
	}
];
