<template>
<cell class="weui-cell_select" :class="(direction == 'before' || direction == 'after') ? 'weui-cell_select-'+direction : ''" :label="label0" :label-width="labelWidth" :label-align="labelAlign" :label-margin-right="labelMarginRight">
  <select :slot="direction=='before' ? 'label' : null" :name="name" class="weui-select">
    <option v-for="(text, value) in items" :key="value" :value="value">
      {{text}}
    </option>
  </select>
  <slot v-if="direction=='before'"></slot>
</cell>
</template>
<script>
import Cell from '../cell/index.vue'
export default {
  components: {
    Cell
  },
  props: {
    direction: String,
    items: {
      type: Object,
      required: true
    },
    name: String,
    label: String,
    labelWidth: String,
    labelAlign: String,
    labelMarginRight: String
  },
  data () {
    return {
      label0: ''
    }
  },
  created () {
    if (this.label && this.direction != 'before') {
      this.label0 = this.label
    }
  }
}
</script>
<style lang="less">
@import '../../style/weui/widget/weui-cell/weui-access';
@import '../../style/weui/widget/weui-cell/weui-cell_global';
@import '../../style/weui/widget/weui-cell/weui-form/weui-form_common';
@import '../../style/weui/widget/weui-cell/weui-form/weui-select';
</style>
