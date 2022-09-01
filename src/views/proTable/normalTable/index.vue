<template>
	<div class="table-box">
		<search :isShowSearch="isShowSearch" @handleSearch="handleSearch"></search>
		<div class="table-header">
			<div class="header-button-lf">
				<el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增用户</el-button>
				<el-button type="primary" :icon="Upload" plain @click="batchAdd">批量添加用户</el-button>
				<el-button type="primary" :icon="Download" plain @click="downloadFile">导出用户数据</el-button>
				<el-button type="danger" :icon="Delete" plain :disabled="!isSelected" @click="batchDelete"> 批量删除用户 </el-button>
			</div>
			<div class="header-button-ri">
				<el-button :icon="Refresh" circle @click="getTableList"> </el-button>
				<el-button :icon="Search" circle @click="isShowSearch = !isShowSearch"> </el-button>
			</div>
		</div>
		<el-table height="575" :data="tableData" :border="true" @selection-change="selectionChange" :row-key="getRowKeys">
			<el-table-column type="selection" reserve-selection width="80" />
			<template v-for="(item, index) in commonData.userData" :key="index">
				<el-table-column :prop="item.prop" :label="item.label" width="180" v-slot="scope" v-if="item.prop == 'status'">
					<el-switch
						:value="scope.row.status"
						:active-text="scope.row.status === 1 ? '启用' : '禁用'"
						:active-value="1"
						:inactive-value="0"
						@change="changeStatus($event, scope.row)"
						v-if="BUTTONS.status"
					/>
					<el-tag :type="scope.row.status === 1 ? 'success' : 'danger'" v-else>
						{{ scope.row.status === 1 ? "启用" : "禁用" }}
					</el-tag>
				</el-table-column>
				<el-table-column
					v-else
					:prop="item.prop"
					:label="item.label"
					:formatter="item.formatter ? item.formatter : ''"
					show-overflow-tooltip
					:width="item.width ? item.width : ''"
				></el-table-column>
			</template>
			<el-table-column label="操作" fixed="right" width="330" v-slot="scope">
				<el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
				<el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
				<el-button type="primary" link :icon="Refresh" @click="resetPass(scope.row)">重置密码</el-button>
				<el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
				<span v-if="!BUTTONS.view && !BUTTONS.edit && !BUTTONS.reset && !BUTTONS.delete">--</span>
			</el-table-column>
			<template #empty>
				<div class="table-empty">
					<img src="@/assets/images/notData.png" alt="notData" />
					<div>暂无数据</div>
				</div>
			</template>
		</el-table>
		<el-pagination
			:currentPage="pageable.pageNum"
			:page-size="pageable.pageSize"
			:page-sizes="[10, 25, 50, 100]"
			background
			layout="total, sizes, prev, pager, next, jumper"
			:total="pageable.total"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
		></el-pagination>
		<UserDrawer ref="drawerRef" />
		<ImportExcel ref="dialogRef" />
	</div>
</template>

<script setup lang="ts" name="useNormal">
import { ref, reactive } from "vue";
// import { defaultFormat } from "@/utils/util";
import { User } from "@/api/interface";
import { commonData } from "@/assets/tableData/commonTable";
import { useDownload } from "@/hooks/useDownload";
import { useHandleData } from "@/hooks/useHandleData";
import { useSelection } from "@/hooks/useSelection";
import { useAuthButtons } from "@/hooks/useAuthButtons";
import { useTable } from "@/hooks/useTable";
import search from "./search.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import UserDrawer from "@/views/proTable/components/UserDrawer.vue";
import { Refresh, CirclePlus, Delete, Search, EditPen, Download, Upload, View } from "@element-plus/icons-vue";
import {
	getUserList,
	addUser,
	BatchAddUser,
	editUser,
	deleteUser,
	changeUserStatus,
	resetUserPassWord,
	exportUserInfo
} from "@/api/modules/user";

// 是否展示搜索模块
const isShowSearch = ref(true);

// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({
	type: 1
});

// 表格 hooks
const { tableData, pageable, searchParam, getTableList, handleSizeChange, handleCurrentChange } = useTable(
	getUserList,
	initParam
);

// 数据多选 hooks
const { isSelected, selectedListIds, selectionChange, getRowKeys } = useSelection();

// 页面按钮权限
const { BUTTONS } = useAuthButtons();

// 删除用户信息
const deleteAccount = async (params: User.ResUserList) => {
	await useHandleData(deleteUser, { id: [params.id] }, `删除【${params.username}】用户`);
	getTableList();
};
function handleSearch(searchData: any) {
	console.log(searchData);
}
// 重置用户密码
const resetPass = async (params: User.ResUserList) => {
	await useHandleData(resetUserPassWord, { id: params.id }, `重置【${params.username}】用户密码`);
	getTableList();
};

// 切换用户状态
const changeStatus = async (val: number, params: User.ResUserList) => {
	await useHandleData(changeUserStatus, { id: params.id, status: val }, `切换【${params.username}】用户状态`);
	getTableList();
};

// 批量删除用户信息
const batchDelete = async () => {
	await useHandleData(deleteUser, { id: selectedListIds.value }, "删除所选用户信息");
	getTableList();
};

// 导出用户列表
const downloadFile = async () => {
	useDownload(exportUserInfo, "用户列表", searchParam.value);
};

// 批量添加用户
interface DialogExpose {
	acceptParams: (params: any) => void;
}
const dialogRef = ref<DialogExpose>();
const batchAdd = () => {
	let params = {
		title: "用户",
		tempApi: exportUserInfo,
		importApi: BatchAddUser,
		getTableList // 操作成功之后刷新数据
	};
	dialogRef.value!.acceptParams(params);
};

// 打开 drawer(新增、查看、编辑)
interface DrawerExpose {
	acceptParams: (params: any) => void;
}
const drawerRef = ref<DrawerExpose>();
const openDrawer = (title: string, rowData?: Partial<User.ResUserList>) => {
	console.log(rowData);
	let params = {
		title,
		rowData: { ...rowData },
		isView: title === "查看",
		apiUrl: title === "新增" ? addUser : title === "编辑" ? editUser : "",
		getTableList
	};
	drawerRef.value!.acceptParams(params);
};
</script>
