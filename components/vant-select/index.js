import vantSelect from './src/vant-select';
/* istanbul ignore next */
vantSelect.install = function(Vue) {
	Vue.component(vantSelect.componentName, vantSelect);
};
export default vantSelect;
