<template>
  <span @click="clickHandler">picker</span>
</template>
<script>
import {picker, datePicker} from './picker'
export default {
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
      let data = [{
        label: '飞机票',
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
        label: '住宿费',
        value: 3
      }, {
        label: '礼品费',
        value: 4
      }, {
        label: '活动费',
        value: 5
      }, {
        label: '通讯费',
        value: 6
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
