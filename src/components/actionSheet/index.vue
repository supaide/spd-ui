<template>
  <node :node="nodeType" @click.native="clickHandler"><slot></slot></node>
</template>
<script>
import ActionSheet from './actionSheet'
import Node from '../node/index.vue'

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
      this.menus.forEach((menu, i) => {
        menus.push({label: menu, onClick: (result, evt) => {
          this.$emit('on-menu', result, evt)
        }})
      })

      let actions = []
      if (this.actions) {
        this.actions.forEach((action, i) => {
          actions.push({label: action, onClick: (result, evt) => {
            this.$emit('on-action', result, evt)
          }})
        })
      }
      ActionSheet(menus, actions, {className: this.className})
    }
  }

}
</script>
<style lang="less">
@import '../../style/weui/widget/weui-tips/weui-mask.less';
@import '../../style/weui/widget/weui-tips/weui-actionsheet';
</style>
