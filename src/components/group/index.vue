<template>
<div>
  <div class="weui-cells__title" :style="{color:titleColor}" v-if="title" v-html="title"></div>
  <div class="weui-cells" :class="[className, form !== undefined ? 'weui-cells_form' : null, noborder ? 'weui-cells_noborder' : null]" :style="{marginTop: gutter}">
    <slot></slot>
  </div>
  <div class="weui-cells__tips" :style="{color:tipsColor}" v-html="tips"></div>
</div>
</template>
<script>
export default {
  props: {
    noborder: Boolean,
    className: String,
    title: String,
    gutter: String,
    titleColor: String,
    labelWidth: String,
    labelAlign: String,
    labelMarginRight: String,
    tipsColor: String,
    tips: String,
    form: null
  },
  created () {
  }
}
</script>
<style lang="less">
@import '../../style/weui/widget/weui-cell/weui-access';
@import '../../style/weui/widget/weui-cell/weui-cell_global';
@import '../../style/weui/widget/weui-cell/weui-form/weui-form_common.less';
.weui-cells_noborder {
  &:before, &:after {
    border: none !important;
  }
}
</style>
