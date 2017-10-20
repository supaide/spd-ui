<template>
<div class="form-group" :class="className">
  <template v-if="layout0 == 'v1' || layout0 == 'l1'">
  <label :for="id0" :class="[label !== undefined ? null : 'sr-only', size0 ? 'col-form-label col-form-label-'+size0 : null]">{{label}}</label>
    <template v-if="type=='input'">
      <input type="text" class="form-control" :class="size0 ? 'form-control-'+size0 : null" :id="id0" :placeholder="placeholder" ref="input">
    </template>
    <template v-if="type=='textarea'">
      <textarea class="form-control" :class="size0 ? 'form-control-'+size0 : null"></textarea>
    </template>
    <template v-if="type=='select'">
      <select class="form-control" :class="size0 ? 'form-control-'+size0 : null" :id="id0" :multiple="multiple">
        <slot></slot>
      </select>
    </template>
    <template v-if="type=='checker'">
      <b-checker :name="name" :item="item" :class="[layout0 == 'v1' ? null : 'col-form-label', size0 ? 'col-form-label-'+size0 : null]" :multi="inputType=='checkbox'" :size="size0"></b-checker>
    </template>
    <small class="form-text text-muted">{{tips}}</small>
  </template>

  <template v-if="layout0 == 'v2' || layout0 == 'l2'">
    <label :for="id0" class="col-form-label" :class="[label !== undefined ? null : 'sr-only', size0 ? 'col-form-label-'+size0 : null]">{{label}}</label>
    <div :class="layout0 == 'v2' ? 'v2-input-flex-width' : null">
      <template v-if="type=='input'">
        <input type="password" class="form-control" :class="size0 ? 'form-control-'+size0 : null" :id="id0" :placeholder="placeholder">
      </template>
      <template v-if="type=='textarea'">
        <textarea class="form-control" :class="size0 ? 'form-control-'+size0 : null"></textarea>
      </template>
      <template v-if="type=='select'">
        <select class="form-control" :class="size0 ? 'form-control-'+size0 : null" :id="id0" :multiple="multiple">
          <slot></slot>
        </select>
      </template>
      <template v-if="type=='checker'">
        <b-checker :name="name" :item="item" class="col-form-label" :class="size0 ? 'col-form-label-'+size0 : null" :multi="inputType=='checkbox'" :size="size0"></b-checker>
      </template>
    </div>
    <small class="form-text text-muted col-form-label" :class="size0 ? 'col-form-label-'+size0 : null">{{tips}}</small>
  </template>


</div>
</template>
<script>
import vmodel from '../../mixins/vmodel'
import BChecker from '../b-checker'
export default {
  mixins: [vmodel],
  components: {
    BChecker
  },
  props: {
    item: Object,
    label: String,
    type: {
      type: String,
      default: 'input'
    },
    inputType: {
      type: String,
      default: "text"
    },
    // v1 单行且label单行；v2 单行且label同行；l1 inline且label单行；l2 inline且label同行
    // l1时，外部容器需加row样式
    // l2时，外部容器需加row col样式
    layout: String,
    placeholder: String,
    tips: String,
    id: String,
    name: String,
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
    multiple: Boolean
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
      this.id0 = 'form_' + this._uid
    }
    if (this.layout0 == 'v2') {
      this.className = 'row col'
    } else if (this.layout0 == 'l2') {
      this.className = 'form-inline'
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.$refs.input && this.inputType) {
        this.$refs.input.setAttribute('type', this.inputType)
      }
    })
  },
}
</script>
<style lang="less">
.v2-input-flex-width {
  flex: 1;
}
</style>
