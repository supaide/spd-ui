<template>
<div class="weui-cell" :class="warn ? 'weui-cell_warn' : null">
  <div class="weui-cell__hd"> 
    <label class="weui-label" :style="titleStyle" v-if="title && title.length>0">{{title}}</label>
    <slot name="title"></slot>
  </div>
  <div class="weui-cell__bd">
    <input
       type="text"
       class="weui-input"
       :class="inputClass"
       :placeholder="placeholder"
       :readonly="readonly"
       :disabled="disabled"
       :spellcheck="spellcheck"
       :autocapitalize="autocapitalize"
       :autocomplete="autocomplete"
       :autocorrect="autocorrect"
       v-model="value"
       ref="input">
  </div>
  <div class="weui-cell__ft">
    <i class="weui-icon-clear" @click="clear" v-show="!readonly && !disabled && value && showClear"></i>
    <i class="weui-icon-warn" v-show="warn && showWarn"></i>
    <slot name="right" class="spd-right"></slot>
  </div>
</div>
</template>
<script>
import ValidateMixin from '../../mixins/validate.js'
export default {
  mixins: [ValidateMixin],
  model: {
    prop: 'mvalue',
    event: 'change'
  },
  props: {
    inputClass: String,
    mvalue: null,
    type: {
      type: String,
      default: 'text'
    },
    placeholder: String,
    titleWidth: String,
    titleAlign: String,
    titleMarginRight: String,
    showClear: Boolean,
    showWarn: {
      type: Boolean,
      default: true
    },
    readonly: Boolean,
    disabled: Boolean,
    autocomplete: {
      type: String,
      default: 'off'
    },
    autocapitalize: {
      type: String,
      default: 'off'
    },
    autocorrect: {
      type: String,
      default: 'off'
    },
    spellcheck: {
      type: String,
      default: 'false'
    },
    debounce: Number
  },
  data () {
    return {
      value: this.mvalue
    }
  },
  computed: {
    titleStyle () {
      return {
        width: this.titleWidth || this.$parent.labelWidth || 'auto', 
        textAlign: this.titleAlign || this.$parent.labelAlign || 'left', 
        marginRight: this.titleMarginRight || this.$parent.labelMarginRight || 0
      }
    },
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.input.setAttribute('type', this.type)
    })
  },
  methods: {
    clear () {
      this.value = ''
    },
  },
  watch: {
    value (val) {
      this.$emit('change', val)
      this.currentValue = val
    },
    mvalue (val) {
      this.value = val
    }
  }

}
</script>
<style lang="less">
@import '../../style/weui/widget/weui-cell/weui-cell_global';                  
@import '../../style/weui/icon/weui-font.less';
@import '../../style/weui/icon/weui-icon_font.less';
</style>
