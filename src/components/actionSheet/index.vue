<template>
  <node :type="nodeType" @click.native="clickHandler"><slot></slot></node>
</template>
<script>
import ActionSheet from './actionSheet'
import Node from '../node/index.vue'
import {util} from 'spd-webutil'

export default {
  props: {
    nodeType: { // html node type
      type: String,
      default: 'div'
    },
    menus: {
      type: Array,
      required: true
    },
    actions: Array,
    className: { // 容器样式名
      type: String,
      default: ''
    }
  },
  components: {
    Node
  },
  methods: {
    clickHandler () {
      let menus = []
      util.each(this.menus, (i, menu) => {
        menus.push({label: menu, onClick: (result, evt) => {
          this.$emit('on-menu', result, evt)
        }})
      })
      let actions = []
      util.each(this.actions, (i, action) => {
        actions.push({label: action, onClick: (result, evt) => {
          this.$emit('on-action', result, evt)
        }})
      })
      ActionSheet(menus, actions, {className: this.className})
    }
  }

}
</script>
<style lang="less">
@import '../../style/weui/widget/weui-tips/weui-mask.less';
@import '../../style/weui/widget/weui-tips/weui-actionsheet';
</style>
