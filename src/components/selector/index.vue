<template>
<div>
  <span @click="onClick" style="display:inline-block; width:100%;user-select: none;">{{currentText}}</span>
  <popup v-transfer-dom v-model="show" class-name="spd-selector">
    <checker :name="name0" v-for="item in items" :key="item[0]" :value="item[0]" type="select" @click.native="onSel(item[0], item[1])">{{item[1]}}</checker>
  </popup>
</div>
</template>
<script>
import Popup from '../popup/index.vue'
import Checker from '../checker/index.vue'
import TransferDom from '../../directives/transfer-dom/index.js'
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup,
    Checker
  },
  props: {
    direction: String,
    items: {
      type: Array,
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
      currentText: '',
      currentValue: '',
      label0: '',
      show: false,
      name0: ''
    }
  },
  created () {
    if (this.label && this.direction != 'before') {
      this.label0 = this.label
    }
    this.$nextTick(()=>{
      this.name0 = this.name ? this.name : 'select_'+this._uid
    })
    if (this.items.length > 0) {
      this.currentValue = this.items[0][0]
      this.currentText = this.items[0][1]
    }
  },
  methods: {
    onClick () {
      this.show = true
    },
    onSel (value, text) {
      this.currentValue = value
      this.currentText = text
      this.show = false
    }
  }
}
</script>
<style lang="less">
@import '../../style/weui/widget/weui-cell/weui-access';
@import '../../style/weui/widget/weui-cell/weui-cell_global';
@import '../../style/weui/widget/weui-cell/weui-form/weui-form_common';
@import '../../style/weui/widget/weui-cell/weui-form/weui-select';
.spd-selector {
  padding: 5px 0;
  label:hover {
    background: #eee;
  }
}
</style>
