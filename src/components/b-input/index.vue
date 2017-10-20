<template>
<div class="form-group" :class="className">
  <template v-if="layout0 == 'v1' || layout0 == 'l1'">
  <!-- 垂直且label独占一行 -->
    <label for="exampleInputEmail1">{{label}}</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" :placeholder="placeholder">
    <small id="emailHelp" class="form-text text-muted">{{tips}}</small>
  </template>

  <!-- 垂直且label同行 父节点要加row样式名，实现flex布局；子元素间距可根据需求加col系列样式或mr系列样式 -->
  <template v-if="layout0 == 'v2' || layout0 == 'l2'">
    <label for="inputPassword" class="col1-sm-2 col-form-label">{{label}}</label>
    <div class="col1-sm-10" :class="layout0 == 'v2' ? 'v2-input-flex-width' : null">
      <input type="password" class="form-control" id="inputPassword" :placeholder="placeholder">
    </div>
    <small id="emailHelp" class="form-text text-muted col-form-label">{{tips}}</small>
  </template>
  <!-- 水平且label独占一行 外部节点需加form-row样式 父节点通过col控制宽度 -->
  <!--label for="inputCity">City</label>
  <input type="text" class="form-control" id="inputCity" -->

  <!-- 水平且label同行 外部节点加form-inline -->

</div>
</template>
<script>
import vmodel from '../../mixins/vmodel'
export default {
  mixins: [vmodel],
  props: {
    label: String,
    type: {
      type: String,
      default: "text"
    },
    layout: String,
    placeholder: String,
    tips: String,
    id: String,
    size: String,
    readOnly: Boolean,
    disabled: Boolean,
    plainText: Boolean,
    labelClass: [String, Array],
    inputClass: [String, Array],
    hideLabel: Boolean,
    addons: [String, Array],
    raddon: String,
    withAddon: Boolean,
    wrapInput: Boolean,
    wrapClass: [String, Array],
    labelMiddle: Boolean,
  },
  data () {
    return {
      value: this.currentValue,
      invalid: false,
      id0: this.id,
      laddons: this.addons ? [].concat(this.addons) : [],
      size0: this.size || this.$parent.size,
      className: null,
      layout0: null
    }
  },
  computed: {
    clabelClass () {
      if (this.hideLabel) {
        return 'sr-only'
      } else {
        return this.labelClass
      }
    }
  },
  created () {
    this.layout0 = this.layout || this.$parent.layout
    if (!this.layout0) {
      this.layout0 = 'v1'
    }
    if (!this.id0) {
      this.id0 = 'input_' + this._uid
    }
    if (this.layout0 == 'v2') {
      this.className = 'row col'
    } else if (this.layout0 == 'l2') {
      this.className = 'form-inline'
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$el.querySelector('input').setAttribute('type', this.type)
    })
  },
}
</script>
<style lang="less">
.v2-input-flex-width {
  flex: 1;
}
</style>
