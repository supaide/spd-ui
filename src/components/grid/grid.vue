<template>
  <div class="weui-grids">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    lines: {
      type: Number,
      default: 3
    }
  }
}
</script>
<style lang="less">
@import '../../style/weui/widget/weui-grid/weui-grid.less';
</style>
