<template>
<div>
  <label :for="id0" class="col-form-label" :class="clabelClass">{{label}}</label>
  <div v-if="wrapInput" :class="wrapClass">
    <div class="input-group" :class="[inputClass, size0 ? 'input-group-'+size0 : null]" v-if="withAddon">
      <span v-if="laddons.length>0" class="input-group-addon" v-for="addon in laddons">{{addon}}</span>
      <slot name="laddon"></slot>
      <input v-model="value" :class="[{'is-invalid' : invalid}, plainText ? 'form-control-plaintext' : 'form-control']" :id="id0" :placeholder="placeholder" :readonly="readOnly || plainText" :disabled="disabled">
      <span class="input-group-addon" v-if="raddon">{{raddon}}</span>
      <slot name="raddon"></slot>
    </div>
    <input v-model="value" v-if="!withAddon" :class="[{'is-invalid' : invalid}, inputClass ? inputClass : null, size0 ? 'form-control-'+size0 : null, plainText ? 'form-control-plaintext' : 'form-control']" :id="id0" :placeholder="placeholder" :readonly="readOnly || plainText" :disabled="disabled">
    <small class="form-text text-muted" :class="{'invalid-feedback': invalid}">{{tips}}</small>
  </div>
  <div class="input-group" :class="[inputClass, size0 ? 'input-group-'+size0 : null]" v-if="withAddon && !wrapInput">
    <span v-if="laddons.length>0" class="input-group-addon" v-for="addon in laddons">{{addon}}</span>
    <slot name="laddon"></slot>
    <input v-model="value" :class="[{'is-invalid' : invalid}, plainText ? 'form-control-plaintext' : 'form-control']" :id="id0" :placeholder="placeholder" :readonly="readOnly || plainText" :disabled="disabled">
    <span class="input-group-addon" v-if="raddon">{{raddon}}</span>
    <slot name="raddon"></slot>
  </div>
  <input v-model="value" v-if="!withAddon && !wrapInput" :class="[{'is-invalid' : invalid}, inputClass ? inputClass : null, size0 ? 'form-control-'+size0 : null, plainText ? 'form-control-plaintext' : 'form-control']" :id="id0" :placeholder="placeholder" :readonly="readOnly || plainText" :disabled="disabled">
  <small v-if="!wrapInput" class="form-text text-muted" :class="{'invalid-feedback': invalid}">{{tips}}</small>
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
      size0: this.size || this.$parent.size
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
    if (!this.id0) {
      this.id0 = 'input_' + this._uid
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$el.querySelector('input').setAttribute('type', this.type)
    })
  },
}
</script>
