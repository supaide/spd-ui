<template>
<div>
  <span @click="onClick" class="spd-selector-label" ref="label">{{currentText}}</span>
  <popup v-transfer-dom v-model="show" class-name="spd-selector" :popup-style="popupStyle">
    <checker :name="name0" v-for="item in items" :key="item[0]" :value="item[0]" :type="type" @click.native="onSel(item[0], item[1])">{{item[1]}}</checker>
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
    type: {
      type: String,
      default: 'radio'
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
      name0: '',
      popupStyle: null
    }
  },
  created () {
    if (this.label && this.direction != 'before') {
      this.label0 = this.label
    }
    this.$nextTick(()=>{
      this.name0 = this.name ? this.name : 'select_'+this._uid
      this.popupStyle = {
        maxHeight: (window.innerHeight - 150) + 'px',
        overflowY: 'auto',
        '-webkit-overflow-scrolling': 'touch'
      }
      console.log(this.popupStyle)
    })
    if (this.items.length > 0) {
      this.currentValue = this.items[0][0]
      this.currentText = this.items[0][1]
    }
  },
  methods: {
    onClick () {
      this.show = true
      let w = this.$refs.label.offsetWidth
      let h = this.$refs.label.offsetHeight
      let l = this.$refs.label.offsetLeft
      let t = this.$refs.label.getBoundingClientRect().top
      console.log(this.$refs.label.getBoundingClientRect())
      console.log('w: '+w+', h: '+h+', l: '+l+', t: '+t)
      console.log(this.$refs.label.offsetParent)
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
  padding: 15px;
  label:hover {
    background: #eee;
  }
  .spd-checker {
    padding: 5px 0;
  }
}
.spd-selector-label {
  display:inline-block;
  user-select: none;
}
</style>
