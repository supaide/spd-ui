<template>
<div class="form-group" :class="className">
  <template v-if="layout0 == 'v1' || layout0 == 'l1'">
    <label :for="id0" :style="labelStyle" :class="[labelClass0, label !== undefined ? null : 'sr-only', size0 ? 'col-form-label col-form-label-'+size0 : null]">{{label}}</label>
    <template v-if="addon">
      <div class="input-group" :class="size0 ? 'input-group-'+size0 : null">
        <div v-for="(laddon, index) in laddons0" :key="index" class="input-group-addon">{{laddon}}</div>
        <slot name="laddon"></slot>
        <template v-if="type=='input'">
          <input type="text" v-model="value" :class="[formClass0, size0 ? 'form-control-'+size0 : null, plaintext0 ? 'form-control-plaintext' : 'form-control']" :id="id0" :placeholder="placeholder" ref="input" :readonly="readonly0" :disabled="disabled0">
        </template>
        <template v-if="type=='textarea'">
          <textarea v-model="value" class="form-control" :class="[formClass0, size0 ? 'form-control-'+size0 : null]" :readonly="readonly0" :disabled="disabled0"></textarea>
        </template>
        <template v-if="type=='select'">
          <select v-model="value" class="form-control" :class="[formClass0, size0 ? 'form-control-'+size0 : null]" :id="id0" :multiple="multiple" :readonly="readonly0" :disabled="disabled0">
            <option v-for="(_item, index) in item" :value="_item.value" :key="_item.value">{{_item.text}}</option>
          </select>
        </template>
        <template v-if="type=='checker'">
          <b-checker v-model="value" :name="name" :item="item" :class="[formClass0, layout0 == 'v1' ? null : 'col-form-label', size0 ? 'col-form-label-'+size0 : null]" :multi="inputType=='checkbox'" :size="size0" :readonly="readonly0" :disabled="disabled0"></b-checker>
        </template>
        <div v-for="(raddon, index) in raddons0" :key="index" class="input-group-addon">{{raddon}}</div>
        <slot name="raddon"></slot>
      </div>
    </template>
    <template v-if="type=='input' && !addon">
      <input type="text" v-model="value" :class="[formClass0, size0 ? 'form-control-'+size0 : null, plaintext0 ? 'form-control-plaintext' : 'form-control']" :id="id0" :placeholder="placeholder" ref="input" :readonly="readonly0" :disabled="disabled0">
    </template>
    <template v-if="type=='textarea' && !addon">
      <textarea v-model="value" class="form-control" :class="[formClass0, size0 ? 'form-control-'+size0 : null]" :readonly="readonly0" :disabled="disabled0"></textarea>
    </template>
    <template v-if="type=='select' && !addon">
      <select v-model="value" class="form-control" :class="[formClass0, size0 ? 'form-control-'+size0 : null]" :id="id0" :multiple="multiple" :readonly="readonly0" :disabled="disabled0">
        <option v-for="(_item, index) in item" :value="_item.value" :key="_item.value">{{_item.text}}</option>
      </select>
    </template>
    <template v-if="type=='checker' && !addon">
      <b-checker v-model="value" :name="name" :item="item" :class="[formClass0, layout0 == 'v1' ? null : 'col-form-label', size0 ? 'col-form-label-'+size0 : null]" :multi="inputType=='checkbox'" :size="size0" :readonly="readonly0" :disabled="disabled0"></b-checker>
    </template>
    <small class="form-text text-muted">{{tips}}</small>
  </template>

  <template v-if="layout0 == 'v2' || layout0 == 'l2'">
    <label :for="id0" :style="labelStyle" class="col-form-label" :class="[labelClass0, label !== undefined ? null : 'sr-only', size0 ? 'col-form-label-'+size0 : null]">{{label}}</label>
    <div :class="[formClass0, layout0 == 'v2' ? 'v2-input-flex-width' : null, addon ? 'input-group' : null, (addon && size0) ? 'input-group-'+size0 : null]" :style="{marginLeft: label ? formGap0 : null, marginRight: tips ? formGap0 : null}">
      <div v-for="(laddon, index) in laddons0" :key="index" class="input-group-addon">{{laddon}}</div>
      <slot name="laddon"></slot>
      <template v-if="type=='input'">
        <input v-model="value" type="password" :class="[size0 ? 'form-control-'+size0 : null, plaintext0 ? 'form-control-plaintext' : 'form-control']" :id="id0" :placeholder="placeholder" :readonly="readonly0" :disabled="disabled0">
      </template>
      <template v-if="type=='textarea'">
        <textarea v-model="value" class="form-control" :class="size0 ? 'form-control-'+size0 : null" :readonly="readonly0" :disabled="disabled0"></textarea>
      </template>
      <template v-if="type=='select'">
        <select v-model="value" class="form-control" :class="size0 ? 'form-control-'+size0 : null" :id="id0" :multiple="multiple" :readonly="readonly0" :disabled="disabled0">
          <option v-for="(_item, index) in item" :value="_item.value" :key="_item.value">{{_item.text}}</option>
        </select>
      </template>
      <template v-if="type=='checker'">
        <b-checker v-model="value" :name="name" :item="item" class="col-form-label" :class="size0 ? 'col-form-label-'+size0 : null" :multi="inputType=='checkbox'" :size="size0" :readonly="readonly0" :disabled="disabled0"></b-checker>
      </template>
      <div v-for="(raddon, index) in raddons0" :key="index" class="input-group-addon">{{raddon}}</div>
      <slot name="raddon"></slot>
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
    item: [Array, Object],
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
    labelWidth: String,
    labelClass: String,
    labelAlign: String,
    formClass: String,
    formGap: String,

    readonly: Boolean,
    disabled: Boolean,
    plaintext: Boolean,
    multiple: Boolean,

    addon: Boolean,
    laddons: [String, Array],
    raddons: [String, Array],
  },
  data () {
    return {
      value: this.currentValue,
      invalid: false,
      id0: this.id,

      laddons0: this.laddons ? [].concat(this.laddons) : [],
      raddons0: this.raddons ? [].concat(this.raddons) : [],

      size0: this.size || this.$parent.size,
      className: null,
      layout0: this.layout || this.$parent.layout,
      labelWidth0: this.labelWidth || this.$parent.labelWidth,
      labelClass0: this.labelClass || this.$parent.labelClass,
      labelAlign0: this.labelAlign || this.$parent.labelAlign,
      formClass0: this.formClass || this.$parent.formClass,
      formGap0: this.formGap || this.$parent.formGap,
      readonly0: this.readonly || this.$parent.readonly || this.plaintext || this.$parent.plaintext,
      disabled0 : this.disabled || this.$parent.disabled,
      plaintext0: this.plaintext || this.$parent.plaintext,
      labelStyle: null
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
    if (this.type == 'select') {
      if (this.multiple && (!this.value || !Array.isArray(this.value))) {
        this.value = []
      }
      if ((typeof this.value === 'undefined' || this.value === null) && this.item) {
        this.value = this.item[0].value
      }
    }
    if (!this.layout0) {
      this.layout0 = 'v1'
    }
    if (!this.formGap0) {
      this.formGap0 = '.5rem'
    }
    if (!this.id0) {
      this.id0 = 'form_' + this._uid
    }
    if (this.layout0 == 'v2') {
      this.className = 'row col'
    } else if (this.layout0 == 'l2') {
      this.className = 'form-inline'
    }
    if (this.labelAlign0 || this.labelWidth0) {
      this.labelStyle = {}
      this.labelAlign0 ? this.labelStyle['text-align'] = this.labelAlign0 : null
      this.labelWidth0 ? this.labelStyle['width'] = this.labelWidth0 : null
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
