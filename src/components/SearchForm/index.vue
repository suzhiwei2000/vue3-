<template>
	<div class="table-search" v-if="columns.length">
		<el-form ref="formRef" :model="searchParam" :inline="true" label-width="100px" :style="`max-width: ${maxWidth}px`">
			<template v-for="item in getSearchList" :key="item.prop">
				<el-form-item :label="`${item.label} :`">
					<SearchFormItem :item="item" :searchParam="searchParam" />
				</el-form-item>
			</template>
		</el-form>
		<div class="search-operation">
			<el-button type="primary" :icon="Search" @click="search">搜索</el-button>
			<el-button :icon="Delete" @click="reset">重置</el-button>
			<el-button type="primary" link class="search-isOpen" @click="searchShow = !searchShow" v-if="columns.length > maxLength">
				{{ searchShow ? "合并" : "展开" }}
				<el-icon class="el-icon--right">
					<component :is="searchShow ? ArrowUp : ArrowDown"></component>
				</el-icon>
			</el-button>
		</div>
	</div>
</template>

<script setup lang="ts" name="searchForm">
import { ref, computed, onMounted } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import SearchFormItem from "./components/SearchFormItem.vue";
import { Delete, Search, ArrowDown, ArrowUp } from "@element-plus/icons-vue";
// Partial 为ts高阶类型 可使定义的类型转化为可选
interface ProTableProps {
	columns: Partial<ColumnProps>[]; // 搜索配置列
	searchParam: any; // 搜索参数
	search: (params: any) => void; // 搜索方法 void表达没有任何返回的值的函数
	reset: (params: any) => void; // 重置方法
}

// 默认值 defineProps父组件传值 defineExpose组件暴露自己的属性  defineEmits 子组件向父组件事件传递
//withDefaults可以指定默认值
const props = withDefaults(defineProps<ProTableProps>(), {
	columns: () => [],
	searchParam: {}
});

const maxLength = ref<number>(4);
const maxWidth = ref<number>(1260);

onMounted(() => {
	// * 暂时只判断这两种情况（第四个搜索项为时间/日期范围 || 前三项存在时间/日期范围选择框）
	// * 后期通过 css 解决文本框自适应宽度变化，已经实现了像 antd 中 pro-table 一样的样式，但自我感觉不太好看，所以没采用😆
	if (props.columns.length >= 4) {
		const searchTypeArr = ["datetimerange", "daterange"];
		searchTypeArr.includes(props.columns[3].searchType!) ? ((maxWidth.value = 945), (maxLength.value = 3)) : null;
		props.columns.slice(0, 3).forEach(item => {
			searchTypeArr.includes(item.searchType!) ? ((maxWidth.value = 1155), (maxLength.value = 3)) : null;
		});
	}
});

// 是否展开搜索项
const searchShow = ref(true);

// 根据是否展开配置搜索项长度
const getSearchList = computed((): Partial<ColumnProps>[] => {
	if (searchShow.value) return props.columns;
	return props.columns.slice(0, maxLength.value);
});
</script>
