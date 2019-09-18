import vantFieldDate from './src/vant-field-date';
/* istanbul ignore next */
vantFieldDate.install = function(Vue) {
	Vue.component(vantFieldDate.componentName, vantFieldDate);
};
export default vantFieldDate;
