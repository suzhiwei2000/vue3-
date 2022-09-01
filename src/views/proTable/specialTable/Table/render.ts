export default {
	props: {
		row: Object,
		render: Function,
		index: Number,
		column: {
			type: Object,
			default: null
		}
	},
	setup: function (props: any, context: any) {
		return () =>
			props.render({
				...props,
				...context.attrs
			});
	}
};
