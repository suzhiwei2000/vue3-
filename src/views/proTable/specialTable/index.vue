<template>
	<div>
		<form-cpn v-model:search-params="tableParams" :items="formConfig" />
		<srm-table ref="tableRef" :columns="contentTableConfig" :params="tableParams" url="" />
	</div>
</template>

<script setup lang="ts">
// import formCpn from "./Form/index.vue";
// import srmTable from "./Table/index.vue";
import { ref } from "vue";
const tableParams = ref({});
const formConfig = [
	{ name: "姓名", key: "userName", clearable: true },
	{ name: "手机号", key: "mobile", clearable: true },
	{
		name: "创建时间",
		key: "picker:beginTime,endTime",
		type: "date-picker",
		span: 6
	}
];
const contentTableConfig = [
	{
		label: "编号",
		width: 80,
		type: "index"
	},
	{ label: "员工姓名", prop: "staffName" },
	{ label: "手机号", prop: "phone" },
	{ label: "邮箱", prop: "email" },
	{ label: "创建时间", prop: "createTime" }
];
</script>

<style lang="scss" scoped></style>
