<template>
	<div class="table-search" v-show="isShowSearch">
		<el-form ref="formRef" :model="searchParam" :inline="true" label-width="100px">
			<el-form-item label="用户姓名 :" prop="username">
				<el-input v-model="searchParam.username" placeholder="请输入" clearable></el-input>
			</el-form-item>
			<el-form-item label="性别 :" prop="gender">
				<el-select v-model="searchParam.gender" placeholder="请选择" clearable>
					<el-option v-for="item in genderType" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</el-form-item>
			<el-form-item label="身份证号 :" prop="idCard">
				<el-input v-model="searchParam.idCard" placeholder="请输入" clearable></el-input>
			</el-form-item>
			<el-form-item label="邮箱 :" prop="email">
				<el-input v-model="searchParam.email" placeholder="请输入" clearable></el-input>
			</el-form-item>
			<div class="more-item" v-show="searchShow">
				<el-form-item label="创建时间 :" prop="createTime">
					<el-date-picker
						v-model="searchParam.createTime"
						type="datetimerange"
						start-placeholder="开始时间"
						end-placeholder="结束时间"
						value-format="YYYY-MM-DD HH:mm:ss"
					/>
				</el-form-item>
			</div>
		</el-form>
		<div class="search-operation">
			<el-button type="primary" :icon="Search" @click="search">搜索</el-button>
			<el-button :icon="Delete" @click="reset">重置</el-button>
			<el-button type="primary" link class="search-isOpen" @click="searchShow = !searchShow">
				{{ searchShow ? "合并" : "展开" }}
				<el-icon class="el-icon--right">
					<component :is="searchShow ? ArrowUp : ArrowDown"></component>
				</el-icon>
			</el-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ArrowDown, ArrowUp, Search, Delete } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import { parseTime } from "@/utils/is/index";
// 是否展示更多搜索内容
const searchShow = ref(false);
const formRef = ref(null);
defineProps<{ isShowSearch: boolean }>();
// defineProps(["isShowSearch"]); //父传子
const genderType = [
	{ label: "男", value: 1 },
	{ label: "女", value: 2 }
];
let searchParam = reactive({
	username: "",
	gender: "",
	idCard: "",
	email: "",
	createTime: [parseTime(new Date()), parseTime(new Date())]
});
// 在子组件中使用defineEmits来声明emits
const emits = defineEmits(["handleSearch"]);
function search() {
	emits("handleSearch", searchParam);
}
function reset() {
	formRef.value?.resetFields();
}
</script>

<style lang="scss" scoped></style>
