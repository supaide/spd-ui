<template>
  <node :type="nodeType" @click.native="clickHandler"><slot></slot></node>
</template>
<script>
import {picker, datePicker} from './picker'
import Node from '../node/index.vue'
export default {
  props: {
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
    items: { // picker的数据
      type: Array,
      default: null
    },
    depth: Number,
    defaultValue: { // 默认选项的value数组
      type: Array,
      default: null
    },
    className: { // 容器样式名
      type: String,
      default: ''
    },
    onChange: { // 在picker选中的值发生变化的时候回调
      type: Function,
      default: null
    },
    onConfirm: { // 在点击"确定"之后的回调
      type: Function,
      default: null
    },
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
        className: this.className,
        defaultValue: this.defaultValue,
        onChange: (result) => {
          this.$emit('on-change', result)
        },
        onConfirm: (result) => {
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
