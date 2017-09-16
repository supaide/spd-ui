<template>
<div :class="{'form-inline': inline0}">
  <label class="col-form-label" :for="id0" :class="clabelClass">{{label}}</label>
  <div v-if="wrapSelect" :class="wrapClass">
    <select v-model="value" :class="[{'is-invalid' : invalid}, selectClass ? selectClass : null, size0 ? 'form-control-'+size0 : null, plainText ? 'form-control-plaintext' : 'form-control']" :id="id0" :readonly="readOnly || plainText" :disabled="disabled">
      <option v-for="(item, index) in options" :key="item.value" :value="item.value">{{item.text}}</option>
    </select>
    <small class="form-text text-muted" :class="{'invalid-feedback': invalid}">{{tips}}</small>
  </div>
  <select v-if="!wrapSelect" v-model="value" :class="[{'is-invalid' : invalid}, selectClass ? selectClass : null, size0 ? 'form-control-'+size0 : null, plainText ? 'form-control-plaintext' : 'form-control']" :id="id0" :readonly="readOnly || plainText" :disabled="disabled">
    <option v-for="(item, index) in options" :key="item.value" :value="item.value">{{item.text}}</option>
  </select>
  <small v-if="!wrapSelect" class="form-text text-muted" :class="{'invalid-feedback': invalid}">{{tips}}</small>
</div>
</template>
<script>
import vmodel from '../../mixins/vmodel'
export default {
  mixins: [vmodel],
  props: {
    inline: Boolean,
    label: String,
    type: {
      type: String,
      default: "text"
    },
    tips: String,
    id: String,
    size: String,
    readOnly: Boolean,
    disabled: Boolean,
    plainText: Boolean,
    labelClass: [String, Array],
    selectClass: [String, Array],
    hideLabel: Boolean,
    col: [String, Array],
    options: Array,
    wrapSelect: Boolean,
    wrapClass: [String, Array],
  },
  created () {
    if (!this.id0) {
      this.id0 = 'select_' + this._uid
    }
  },
  data () {
    return {
      value: null,
      invalid: false,
      id0: this.id,
      size0: this.size || this.$parent.size,
      inline0: this.inline || this.$parent.inline
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
  mounted () {
    if (this.currentValue === undefined || (typeof this.currentValue === 'boolean' && !this.currentValue)) {
      this.$nextTick(() => {
        this.setSelectIndex(0)
      })
    } else {
      this.value = this.currentValue
    }
  },
  methods: {
    getText () {
      let selectIndex = this.getSelectIndex()
      if (selectIndex < 0) {
        return null
      } else {
        return this.options[selectIndex].text
      }
    },
    setSelectIndex (selectIndex) {
      if (!this.options || selectIndex < 0 || this.options.length <= selectIndex) {
        return
      }
      this.value = this.options[selectIndex].value
    },
    getSelectIndex () {
      let ind = -1
      if (!this.options) {
        return ind
      }
      for (let i=0; i<this.options.length; i++) {
        if (this.options[i].value == this.value) {
          ind = i
        }
      }
      return ind
    }
  },
}
</script>
