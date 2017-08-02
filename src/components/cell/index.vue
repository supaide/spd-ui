<template>
<node :type="nodeType0" class="weui-cell" :class="{'weui-cell_access': isLink}" :href="href" @click.native="onClick">
  <div class="weui-cell__hd">
    <label class="weui-label" :style="labelStyle" v-if="label">{{label}}</label>
    <slot name="label"></slot>
  </div>
  <div class="weui-cell__bd">
    <p><slot>{{title}}</slot></p>
  </div>
  <div class="weui-cell__ft">
    <span v-if="right">{{right}}</span>
    <slot name="right">{{right}}</slot>
    <i class="weui-loading" v-if="isLoading"></i>
  </div>
</node>
</template>
<script>
import Node from '../node/index.vue'
export default {
  components: {
    Node
  },
  props: {
    nodeType: String,
    isLink: Boolean,
    label: String,
    title: String,
    right: String,
    isLoading: Boolean,
    labelWidth: String,
    labelAlign: String,
    labelMarginRight: String
  },
  data () {
    return {
      nodeType0: 'a',
      href: null
    }
  },
  created () {
    if (this.isLink) {
      this.nodeType0 = 'a'
      this.href = 'javascript:;'
    } else {
      this.nodeType0 = this.nodeType ? this.nodeType : 'div'
      this.href = null
    }
  },
  computed: {
    labelStyle () {
      return {
        width: this.labelWidth || this.$parent.labelWidth || 'auto', 
        textAlign: this.labelAlign || this.$parent.labelAlign || 'left', 
        marginRight: this.labelMarginRight || this.$parent.labelMarginRight || 0
      }
    },
  },
  methods: {
    onClick () {
      if (this.isLink) {
        this.$emit('on-click')
      }
    }
  }
}
</script>
<style lang="less">
@import '../../style/weui/base/mixin/setArrow.less';
@import '../../style/weui/widget/weui-cell/weui-cell_global';                  
@import '../../style/weui/widget/weui-loading/weui-loading.less'; 
@import '../../style/weui/widget/weui-cell/weui-form/weui-form_common.less';
</style>
