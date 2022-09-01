<template>
	<div>
		<el-table
			v-loading="loading"
			:border="true"
			v-bind="setAttrs(tableAttr)"
			:data="tableData"
			stripe
			@selection-change="selectionChange"
		>
			<!-- :height="state.height" -->
			<el-table-column v-if="selectVisible" align="left" :selectable="selectable" type="selection" width="45" />
			<template v-for="(column, index) in columns" :key="index">
				<el-table-column v-if="column.render" v-bind="setAttrs(column)" show-overflow-tooltip>
					<template #default="scope">
						<Render :column="column" :index="scope.$index" :render="column.render" :row="scope.row" v-bind="$attrs" />
					</template>
				</el-table-column>
				<el-table-column v-else-if="column.type === 'index'" type="index" v-bind="setAttrs(column)" width="70" />
				<el-table-column v-else :key="column.prop" show-overflow-tooltip v-bind="setAttrs(column)" />
			</template>
		</el-table>
		<!-- 分页 -->
		<Pagination
			v-if="!hidden"
			:limit="pageOpt.pageSize"
			:page="pageOpt.pageNum"
			:page-sizes="pageSizes"
			:total="total"
			@pagination="pagination"
		/>
	</div>
</template>

<script>
import Render from "./render";
// import { resetParams } from "@/utils";
// import request from "@/utils/request";
import Pagination from "../Pagination/index.vue";
export default defineComponent({
	name: "SrmTable",
	components: { Render, Pagination },
	props: {
		url: {
			type: String,
			default: ""
		},
		// 筛选条件
		params: {
			type: Object,
			default: () => ({})
		},
		// 分页查询数据
		pageRequest: {
			type: Object,
			default: () => ({
				pageNum: 1,
				pageSize: 20
			})
		},
		// 外部传入的table数据源 不走组件内接口
		sourceData: {
			type: Array,
			default: () => []
		},
		contentType: {
			type: String,
			default: "application/json"
		},
		isLoad: {
			type: Boolean,
			default: true
		},
		columns: {
			type: Array,
			default: () => []
		},
		// 每页条数选择器
		pageSizes: {
			type: Array,
			default: () => [10, 20, 50, 100]
		},
		// 控制分页组件的显示隐藏
		hidden: {
			type: Boolean,
			default: false
		},
		// table组件的属性设置
		tableAttr: {
			type: Object,
			default: () => ({
				border: true
			})
		},
		// 是否可选择行
		selectVisible: {
			type: Boolean,
			default: false
		},
		selectable: {
			type: Function,
			default: () => {}
		}
	},
	emits: ["getTotal", "update:params", "update:pageRequest", "pagination", "selectionChange"],

	setup(props, { emit }) {
		const $baseTableHeight = inject("$baseTableHeight");

		const state = reactive({
			height: $baseTableHeight() - 30,
			loading: false,
			downloadLoading: false,
			selections: [], // 当前选择项的集合
			tableData: [],
			total: 0,
			pageOpt: props.pageRequest,
			selfLoading: true
		});
		// 判断是否有外部数据源传入
		const isExternal = computed(() => {
			const { sourceData = [] } = props;
			return sourceData.length;
		});

		onMounted(() => {
			if (!isExternal.value && props.isLoad) {
				initTable();
			}
		});
		// c初始化数据
		// const initTable = async () => {
		// 	state.loading = true;
		// 	const realParams = resetParams(props.params);
		// 	const reqOpt = props.url.split("|");
		// 	const [method, url] = reqOpt[1] ? reqOpt : ["post", reqOpt[0]];
		// 	const reqKey = reqOpt[2] ? reqOpt[2] : method.toLowerCase() === "post" ? "data" : "params";
		// 	try {
		// 		const { data } = await request({
		// 			url,
		// 			method,
		// 			[reqKey]: {
		// 				...state.pageOpt,
		// 				...realParams
		// 			},
		// 			headers: {
		// 				"Content-Type": props.contentType
		// 			}
		// 		});
		// 		setTimeout(() => {
		// 			state.loading = false;
		// 			state.tableData = data.records || data.list;
		// 			state.total = data.total;
		// 			emit("getTotal", state.total);
		// 		}, 500);
		// 	} catch (e) {
		// 		console.error(e);
		// 		state.loading = false;
		// 	}
		// };
		// 分页
		const pagination = ev => {
			const { page, limit } = ev;
			state.pageOpt.pageNum = page;
			state.pageOpt.pageSize = limit;
			// 有外部数据源注入时不走内部分页
			if (isExternal.value) {
				emit("update:pageRequest", state.pageOpt);
				emit("pagination", ev);
			} else {
				initTable();
			}
		};
		const selectionChange = selections => {
			emit("selectionChange", selections);
		};
		// 给元素设置属性
		const setAttrs = params => {
			const { ...options } = params;
			if (!options.align) {
				options.align = "left";
			}
			return { ...options };
		};

		watchEffect(() => {
			if (props.sourceData.length) {
				state.tableData = props.sourceData;
			}
		});
		watch(
			() => props.params,
			params => {
				const { request } = params;
				if (request) {
					state.pageOpt.pageNum = 1;
					initTable();
				}
				params["request"] = false;
				emit("update:params", params);
			}
		);
		return {
			...toRefs(state),
			isExternal,
			pagination,
			selectionChange,
			setAttrs,
			initTable
		};
	}
});
</script>
<style lang="scss">
.el-popper {
	max-width: 50%;
}
</style>
