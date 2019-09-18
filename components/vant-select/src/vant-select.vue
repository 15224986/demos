<template>
    <div class="vant-field-date">
        <van-field 
            v-model="text"
            @click="show"
            :label="label"
            :required="required"
            :clearable="clearable"
            :readonly="readonly"
            :disabled="disabled"
            :clickable="clickable"
            :placeholder="placeholder"
            :is-link="isLink"
            :label-class="labelClass"
            :label-width="labelWidth"
            :label-align="labelAlign"
            :right-icon="rightIcon"
        >
        </van-field>
        <!-- 用 actionsheet 来包裹弹出层日期控件 -->
        <van-popup
            v-model="isShowPicker"
            :overlay="overlay"
            :position="position"
            :close-on-click-overlay="closeOnClickOverlay"
            @click-overlay="overlayCancel"
        >
            <van-picker
                show-toolbar
                :columns="columns"
                :default-index="currentValue"
                :visible-item-count="visibleItemCount"
                :title="title"
                :item-height="itemHeight"
                :toolbar-position="toolbarPosition"
                :confirm-button-text="confirmText"
                :cancel-button-text="cancelText"
                @confirm="onConfirm"
                @cancel="onCancel"
            />
        </van-popup>
    </div>
</template>
 
<script>
    export default {
        name: 'vantSelect',
        componentName: 'vantSelect',
        inheritAttrs: false, // https://cn.vuejs.org/v2/api/#inheritAttrs
        props: {
            value: {
                type: [String, Number ],
                default: undefined // 值不能是 null，DatePicker会报错
            },
            // 展示的格式化
            format: {
                type: String,
                default: null
            },
            /**
             * field 输入框 相关参数
             */
            // 日期格式
            type: {
                type: String,
                default: null
            },
            // field 显示的文字
            label:{
                type: String,
                default: null
            },
            // 必填的星号
            required: {
                type: Boolean,
                default: false
            },
            // 是否启用清除控件
            clearable: {
                type: Boolean,
                default: false
            },
            // 是否只读
            readonly: {
                type: Boolean,
                default: true
            },
            // 是否禁用输入框
            disabled: {
                type: Boolean,
                default: false
            },
            // 是否开启点击反馈
            clickable: {
                type: Boolean,
                default: true
            },
            // 占位提示文字
            placeholder: {
                type: String,
                default: '请选择'
            },
            // 是否展示右侧箭头并开启点击反馈
            isLink: {
                type: Boolean,
                default: false
            },
            // 左侧文本额外类名
            labelClass: {
                type: String,
                default: null
            },
            labelWidth: {
                type: [String, Number],
                default: null
            },
            labelAlign: {
                type: String,
                default: null
            },
            rightIcon: {
                type: String,
                default: null
            },
            /**
             * Popup 弹出层 相关参数
             */
            // 是否显示遮罩层
            overlay: {
                type: Boolean,
                default: true
            },
            // 弹出框显示位置
            position: {
                type: String,
                default: 'bottom'
            },
            // 是否在点击遮罩层后关闭
            closeOnClickOverlay: {
                type: Boolean,
                default: true
            },

            /**
             * picker 时间选择 相关参数
             */
            // 下拉数据
            columns: {
                type: Array,
                default: function () {
                    return []
                }
            },
            // title 顶部栏标题
            title: {
                type: String,
                default: null
            },
            // 顶部栏位置，可选值为bottom
            toolbarPosition: {
                type: String,
                default: 'top'
            },
            // 按钮文字
            confirmText: {
                type: String,
                default: '确定'
            },
            cancelText: {
                type: String,
                default: '取消'
            },
            // 可见的选项个数
            visibleItemCount: {
                type: Number,
                default: 5
            },
            // 可见的选项个数
            itemHeight: {
                type: Number,
                default: 44
            },

        },
        data() {
            return {
                isShowPicker: false,
                currentValue: 2
            }
        },
        watch: {
            
        },
        computed: {
            text() {
                let text = '';
                this.columns.forEach( (element, i) => {
                    if( this.value === element.value ){
                        text = element.text;
                        this.currentValue = i;
                    }
                });
                return text;
            }
        },
        methods: {
            dateFormat(item) {
                let index = '';
                this.columns.forEach( (element, i) => {
                    if( item.value === element.value ){
                        index = i;
                    }
                });
                return index;
            },
            show() {
                if (!this.disabled) {
                    this.isShowPicker = true;
                }
            },
            onConfirm( option ) {
                // 格式化
                this.currentValue = this.dateFormat( option );
                let val = option.value;
                // 修改父组件的值
                this.$emit('input', val);
                // 确定回调
                this.$emit('confirm', val, option);
                this.isShowPicker = false;
            },
            // 隐藏弹框
            onCancel() {
                this.$emit('cancel', false);
                this.isShowPicker = false;
            },
            overlayCancel(){
                if( this.closeOnClickOverlay ){
                    this.$emit('cancel', false);
                }
            }
        }
    }
</script>