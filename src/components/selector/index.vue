<template>
<div>
  <span @click="onClick" style="display:inline-block; width:100%;user-select: none;">点击选择</span>
  <popup v-transfer-dom v-model="show" class-name="spd-selector">
    <checker :name="name0" v-for="(text, value) in items" :value="value" :key="value" type="select" @click.native="onSel(value)">{{text}}</checker>
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
      type: Object,
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
  },
  methods: {
    onClick () {
      this.show = true
    },
    onSel (value) {
      console.log(value)
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
