<template>
<div class="form-group">
  <div v-if="title" class="form-group-title">{{title}}</div>
  <div :class="className">
    <slot></slot>
  </div>
</div>
<!--div :class="{'align-items-center': center, 'form-group': !noMarginBottom, 'row': row, 'form-row': narrowRow, 'form-inline': inline}"><slot></slot></div-->
</template>
<script>
export default {
  props: {
    title: null,
    layout: {
      type: String,
      default: 'v1'
    },
    center: Boolean,
    noMarginBottom: {
      type: Boolean,
      default: false
    },
    row: Boolean,
    narrowRow: Boolean,
    inline: Boolean,
    size: String,
    labelWidth: String,
    labelClass: String,
    labelAlign: String,
    formClass: String,
    formGap: String,
    readonly: Boolean,
    disabled: Boolean,
    plaintext: Boolean,
  },
  data () {
    return {
      className: null
    }
  },
  created () {
    if (this.layout == 'l1') {
      this.className = 'row'
    } else if (this.layout == 'l2') {
      this.className = 'row col'
    }
  }
}
</script>
<style lang="less">
.form-group-title {
  font-size: 90%;
  color: #aaa;
  margin: 0 0 5px 5px;
}
</style>
