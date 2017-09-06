<template>
<div class="weui-cell" :class="warn ? 'weui-cell_warn' : null">
  <div class="weui-cell__hd"> 
    <label class="weui-label" :style="titleStyle" :class="titleClass" v-if="title && title.length>0">{{title}}</label>
    <slot name="title"></slot>
  </div>
  <div class="weui-cell__bd">
    <input
       type="text"
       class="weui-input"
       :class="inputClass"
       :id="id"
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
    <slot name="right" class="spd-right"></slot>
  </div>
</div>
</template>
<script>
export default {
  model: {
    prop: 'currentValue',
    event: 'change'
  },
  props: {
    id: String,
    title: String,
    titleClass: String,
    inputClass: String,
    currentValue: null,
    type: {
      type: String,
      default: 'text'
    },
    placeholder: String,
    titleWidth: String,
    titleAlign: String,
    titleMarginRight: String,
    showClear: Boolean,
    readonly: Boolean,
    disabled: Boolean,
    autocomplete: {
      type: String,
      default: 'on'
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
      warn: false,
      value: this.currentValue
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
    focus () {
      this.$refs.input.focus()
    }
  },
  watch: {
    value (val) {
      this.$emit('change', val)
    },
    currentValue (val) {
      this.value = val
    }
  }

}
</script>
<style lang="less">
@import '../../style/weui/widget/weui-cell/weui-cell_global';                  
@import '../../style/weui/icon/weui-font';
@import '../../style/weui/icon/weui-icon_font';
</style>
