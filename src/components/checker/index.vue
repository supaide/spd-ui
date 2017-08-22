<template>
<label :style="{'margin-right': marginRight ? marginRight : null}">
  <input type="radio" :name="name0" :value="value" ref="input" @click="onClick" :disabled="disabled" :style="{'margin-right': space ? space : null}">
  <slot></slot>
</label>
</template>
<script>
import {$} from 'spd-webutil'
export default {
  model: {
    prop: 'mvalue',
    event: 'change'
  },
  props: {
    marginRight: {
      type: String,
      default: '10px'
    },
    space: String,
    mvalue: null,
    name: String,
    disabled: Boolean,
    multi: Boolean,
    value: {
      type: [String, Number, Boolean],
      default: true
    }
  },
  computed: {
    name0 () {
      return this.name || 'checked_' + this._uid
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.multi) {
        this.$refs.input.setAttribute('type', 'checkbox')
      }
      this.setValue(this.mvalue)
    })
  },
  methods: {
    typeValue (val) {
      let type = typeof this.value
      if (type === 'boolean') {
        return val === 'true'
      } else if (type === 'number') {
        return parseFloat(val)
      }
      return val
    },
    setValue (val) {
      val = [].concat(val)
      let checked = false
      if (val.indexOf(this.value) > -1) {
        checked = true
      }
      this.$refs.input.checked = checked 
    },
    onClick () {
      let values = []
      let $targets = $('input[name='+this.name+']')
      $targets.forEach((target) => {
        if (target.checked) {
          values.push(this.typeValue(target.value))
        }
      })
      if (!this.multi || $targets.length == 1) {
        values = values.pop()
      }
      this.$emit('change', values)
    }
  },
  watch: {
    mvalue (val) {
      this.setValue(val)
    } 
  }
}
</script>
