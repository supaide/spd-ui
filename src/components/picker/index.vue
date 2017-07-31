<template>
  <span @click="clickHandler">picker</span>
</template>
<script>
import {picker, datePicker} from './picker'
export default {
  props: {
    type: { // picker|datePicker
      type: String,
      default: 'picker'
    },
    id: { // 作为picker的唯一标识，作用是以id缓存当时的选择
      type: String,
      default: 'default'
    },
    items: { // picker的数据
      type: Array,
      default: null
    },
    defaultValue: { // 默认选项的value数组
      type: Array,
      default: null
    },
    className: { // 容器样式名
      type: String,
      default: ''
    },
    container: { // 指定容器
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
  data () {
    return {
      picker: null
    }
  },
  methods: {
    getPicker () {
      if (this.picker) {
        //return this.picker
      }
      let r = Math.round(Math.random()*100)
      let data = [{
        label: '飞机票'+r,
        value: 0
      }, {
        label: '火车票(disabled)',
        disabled: true,
        value: 1
      }, {
        label: '的士票(disabled)',
        disabled: true,
        value: 2
      }, {
        label: '住宿费'+r,
        value: 3
      }, {
        label: '礼品费',
        value: 4
      }, {
        label: '活动费',
        value: 5
      }, {
        label: '通讯费',
        value: r
      }, {
        label: '补助',
        value: 7
      }, {
        label: '通讯费',
        value: 8
      }, {
        label: '其他',
        value: 9
      }]
      let options = {
        defaultValue: [8],
        className: 'custom-classname',
        onChange: function (result) {
          //console.log(item, index);
          console.log(result);
        },
        onConfirm: function (result) {
          console.log(result);
        },
        id: 'picker'
      }
      this.picker = picker(data, options)
      return this.picker
    },
    clickHandler () {
      let picker = this.getPicker()
    }
  }

}
</script>
<style lang="less">
@import '../../style/weui/widget/weui-tips/weui-mask.less';
@import '../../style/weui/widget/weui-picker/weui-picker.less';
@import '../../style/weui/widget/weui-animate/weui-animate.less';
</style>
