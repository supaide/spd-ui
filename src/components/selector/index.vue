<template>
<span>
  <span class="spd-selector-label" @click="onClick">
    <span>{{label}}</span>
    <span>{{currentText}}</span>
  </span>
  <popup v-transfer-dom v-model="show" class-name="spd-selector" :popup-style="popupStyle">
    <checker :name="name0" v-for="item in items" :key="item[0]" :value="item[0]" :type="type" v-model="currentValue" :disabled="item[2] ? 'true' : null">{{item[1]}}</checker>
  </popup>
</span>
</template>
<script>
import {$} from 'spd-webutil'
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
    value: null,
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
      currentValue: null,
      currentText: null,
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
    this.name0 = this.name ? this.name : 'select_'+this._uid
  },
  mounted () {
    this.$nextTick(()=>{
      this.popupStyle = {
        maxHeight: (window.innerHeight - 100) + 'px',
        overflowY: 'auto',
        '-webkit-overflow-scrolling': 'touch'
      }
      if (this.currentValue === null && this.items) {
        this.currentValue = this.items[0][0]
      } else {
        this.updateLabelText()
      }
    })
  },
  methods: {
    updateLabelText () {
      if (this.currentValue === null) {
        this.currentText = null
        return
      }
      let value = this.currentValue
      if (Object.prototype.toString.call(value) !== '[object Array]') {
        value = [value]
      }
      let texts = []
      for (let i=0; i<this.items.length; i++) {
        if (value.indexOf(this.items[i][0]) >= 0) {
          texts.push(this.items[i][1])
        }
      }
      this.currentText = texts.join(',').truncate(10)
    },
    onClick () {
      this.show = true
      //let w = this.$refs.label.offsetWidth
      //let h = this.$refs.label.offsetHeight
      //let l = this.$refs.label.offsetLeft
      //let t = this.$refs.label.getBoundingClientRect().top
      //console.log(this.$refs.label.getBoundingClientRect())
      //console.log('w: '+w+', h: '+h+', l: '+l+', t: '+t)
      //console.log(this.$refs.label.offsetParent)
    }
  },
  watch: {
    currentValue (vals) {
      this.$emit('input', vals)
      this.show = false
      this.updateLabelText()
    },
    value (val) {
      this.currentValue = val
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
  display:flex;
  user-select: none;
}
</style>
