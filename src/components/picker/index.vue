<template>
  <node :node="nodeType" @click.native="clickHandler"><slot></slot></node>
</template>
<script>
import {picker, datePicker} from './picker'
import Node from '../node/index.vue'
export default {
  props: {
    showCancel: {
      type: Boolean,
      default: true
    },
    nodeType: { // html node type
      type: String,
      default: 'div'
    },
    type: { // picker|datePicker
      type: String,
      default: 'picker'
    },
    id: { // 作为picker的唯一标识，作用是以id缓存当时的选择
      type: String,
      default: 'picker'
    },
    items: Array, // picker的数据
    depth: Number,
    defaultValue: Array, // 默认选项的value数组
    title: String,
    className: String,
    start: { // 起始年份，如果是 Number 类型，表示起始年份；如果是 String 类型，格式为 'YYYY-MM-DD'；如果是 Date 类型，就传一个 Date
      type: [String, Number, Date],
      default: 2000
    },
    end: { // 结束年份
      type: [String, Number, Date],
      default: 2030
    },
    cron: { // cron 表达式，三位，分别是 dayOfMonth[1-31]，month[1-12] 和 dayOfWeek[0-6]（周日-周六）
      type: String,
      default: '* * *'
    }
  },
  components: {
    Node
  },
  methods: {
    clickHandler () {
      let options = {
        id: this.id,
        showCancel: this.showCancel,
        className: this.className,
        title: this.title,
        defaultValue: this.defaultValue,
        onChange: (result) => {
          this.$emit('on-change', result)
        },
        onConfirm: (result) => {
          this.picker = null
          this.$emit('on-confirm', result)
        }
      }
      if (this.type == 'picker') {
        options.depth = this.depth
        picker(this.items, options)
      } else {
        options.start = this.start
        options.end = this.end
        options.cron = this.cron
        datePicker(options)
      }
    }
  }

}
</script>
<style lang="less">
@import '../../style/weui/widget/weui-tips/weui-mask.less';
@import '../../style/weui/widget/weui-picker/weui-picker.less';
@import '../../style/weui/widget/weui-animate/weui-animate.less';
</style>
