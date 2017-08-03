<template>
<label class="spd-checker" :class="[className, checkerClass]">
  <span :class="right !== undefined ? 'spd-checker-right' : 'spd-checker-left'">
    <input type="radio" :name="name" ref="input">
    <span class="spd-checker-icon"></span>
    <span class="spd-checker-title"><slot></slot></span>
  </span>
</label>
</template>
<script>
export default {
  props: {
    className: String,
    name: String,
    value: null,
    type: String,
    color: {
      type: String,
      default: ''
    },
    bgColor: {
      type: String,
      default: ''
    },
    right: null
  },
  data () {
    return {
      checkerClass: 'spd-checker-radio'
    }
  },
  created () {
    if (this.type == 'checkbox') {
      this.$nextTick(() => {
        this.$refs.input.setAttribute('type', 'checkbox')
      })
      this.checkerClass = 'spd-checker-checkbox'
    }
    if (this.type == 'select') {
      this.checkerClass = 'spd-checker-select'
    }
  } 
}
</script>
<style lang="less">
@import '../../style/spd/widget/spd-checker/spd-checker.less';
</style>
