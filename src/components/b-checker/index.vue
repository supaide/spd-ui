<template>
<div class="form-check" :class="{'form-check-inline': inline0}">
  <label class="form-check-label" :class="[labelClass, size0 ? 'form-control-'+size0 : null]">
    <input class="form-check-input" :name="name0" type="checkbox" @click="onClick" :value="item.value" ref="input"> {{item.text}}
  </label>
</div>
</template>
<script>
import vmodel from '../../mixins/vmodel'
export default {
  mixins: [vmodel],
  props: {
    inline: Boolean,
    name: String,
    multi: Boolean,
    item: Object,
    labelClass: [String, Array],
    size: String
  },
  data () {
    return {
      name0: this.name,
      value: this.currentValue,
      size0: this.size || this.$parent.size,
      inline0: this.inline || this.$parent.inline
    }
  },
  created () {
    if (!this.name0) {
      this.name0 = 'checker_' + this._uid
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$el.querySelector('input').setAttribute('type', this.multi ? 'checkbox' : 'radio')
      this.setValue(this.currentValue)
    })
  },
  methods: {
    setValue (value) {
      let checked = false
      let values = [].concat(value)
      let thisVal = this.$refs.input.value
      for (let i=0; i<values.length; i++) {
        if (values[i] == thisVal) {
          checked = true
        }
      }
      this.$refs.input.checked = checked
    },
    onClick () {
      let targets = document.querySelectorAll('input[name='+this.name0+']')
      let values = []
      targets.forEach((target) => {
        if (target.checked) {
          values.push(target.value)
        }
      })
      if (targets.length == 1) {
        values = values.pop()
      }
      this.value = values
    }
  },
  watch: {
    value (val) {
      this.setValue(val)
    }
  }
}
</script>
