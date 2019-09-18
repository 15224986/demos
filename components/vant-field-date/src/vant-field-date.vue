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
            <van-datetime-picker
                v-model="currentValue"
                :type="type"
                :title="title"
                :min-date="minDate"
                :max-date="maxDate"
                :confirm-button-text="confirmText"
                :cancel-button-text="cancelText"
                @cancel="cancel"
                @confirm="confirm"
            />
        </van-popup>
    </div>
</template>
 
<script>
    export default {
        name: 'vantFieldDate',
        componentName: 'vantFieldDate',
        inheritAttrs: false, // https://cn.vuejs.org/v2/api/#inheritAttrs
        props: {
            value: {
                type: [String, Date ],
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
             * datetime-picker 时间选择 相关参数
             */
            // datetime-picker 的 title
            title: {
                type: String,
                default: null
            },
            // 最小可选的最大时间
            minDate: {
                type: Date,
                default: undefined // 值不能是 null，DatePicker会报错
            },
            // 最大可选的最大时间
            maxDate: {
                type: Date,
                default: undefined
            },
            // 按钮文字
            confirmText: {
                type: String,
                default: '确定'
            },
            cancelText: {
                type: String,
                default: '取消'
            }
        },
        data() {
            return {
                isShowPicker: false,
                currentValue: new Date( this.value )
            }
        },
        watch: {
            value(val) {
                this.currentValue = new Date( val );
            }
        },
        computed: {
            // 展示的格式化，时间提交的值是Date类型数据
            formatFormula() {
                if(this.format){
                    return this.format
                } else if (this.type === 'date') {
                    return 'yyyy-MM-dd'
                } else if (this.type === 'datetime') {
                    return 'yyyy-MM-dd hh:mm'
                } else if (this.type === 'time') {
                    return 'hh:mm'
                } else if (this.type === 'year-month') {
                    return 'yyyy-MM'
                }
            },
            text() {
                return this.value ? this.dateFormat(this.value, this.formatFormula) : ''
            }
        },
        methods: {
            dateFormat: (value, format) => {
                if (!value) return
                if (!(value instanceof Date)) {
                    value = new Date(value)
                }
                let o = {
                    'M+': value.getMonth() + 1, // month
                    'd+': value.getDate(), // day
                    'h+': value.getHours(), // hour
                    'm+': value.getMinutes(), // minute
                    's+': value.getSeconds(), // second
                    'q+': Math.floor((value.getMonth() + 3) / 3), // quarter
                    'S': value.getMilliseconds() // millisecond
                }
                if (!format || format === '') {
                    format = 'yyyy-MM-dd hh:mm:ss'
                }
                if (/(y+)/.test(format)) {
                    format = format.replace(RegExp.$1, (value.getFullYear() + '').substr(4 - RegExp.$1.length))
                }
                for (let k in o) {
                    if (new RegExp('(' + k + ')').test(format)) {
                        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
                    }
                }
                return format
            },
            show() {
                if (!this.disabled) {
                    this.isShowPicker = true;
                }
            },
            confirm(value) {
                // 格式化
                let val = this.dateFormat(value, this.formatFormula);
                // 修改父组件的值
                this.$emit('input', val);
                // 确定回调
                this.$emit('confirm', val);
                this.isShowPicker = false;
            },
            // 隐藏弹框
            cancel() {
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