<template>
  <span class="weui-badge" :class="{'weui-badge_dot': typeof text === 'undefined' || text.toString().length == 0}" v-text="text"></span>
</template>
<script>
export default {
  props: {
    text: [String, Number]
  }
}
</script>
<style lang="less">
@import '../../style/weui/widget/weui-tips/weui-badge.less';
</style>
