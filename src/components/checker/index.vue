<template>
<label class="spd-checker" :class="checkbox !== undefined ? 'spd-checkbox' : 'spd-radio'">
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
    name: String,
    value: null,
    checkbox: null,
    right: null
  },
  created () {
    if (this.checkbox !== undefined) {
      this.$nextTick(() => {
        this.$refs.input.setAttribute('type', 'checkbox')
      })
    }
  } 
}
</script>
<style lang="less">
@import '../../style/spd/widget/spd-checker/spd-checker.less';
</style>
