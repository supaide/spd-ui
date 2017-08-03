<template>
<cell nodeType="label" class="spd-checker" :class="checkbox !== undefined ? 'spd-checkbox' : 'spd-radio'">
  <span v-if="right === undefined" slot="label" class="spd-checker-label">
    <input type="radio" :name="name" ref="input">
    <span class="spd-input"></span>
  </span>
  <slot></slot>
  <span v-if="right !== undefined" slot="right" class="spd-checker-label">
    <input type="radio" :name="name" ref="input">
    <span class="spd-input"></span>
  </span>

</cell>
</template>
<script>
import Cell from '../cell/index.vue'
export default {
  components: {
    Cell
  },
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
