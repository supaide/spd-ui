<template>
<label :name="name" class="spd-checker" :class="[className, checkerClass]">
  <span :class="right !== undefined ? 'spd-checker-right' : 'spd-checker-left'">
    <input v-if="!multi0" type="radio" :name="name" :value="value" ref="input" @click="onClick">
    <input v-if="multi0" type="checkbox" :name="name" :value="value" ref="input" @click="onClick">
    <span class="spd-checker-icon" :class="actived ? 'spd-checked-actived' : null"></span>
    <span class="spd-checker-title"><slot></slot></span>
  </span>
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
    mvalue: null,
    className: String,
    name: {
      type: String,
      required: true
    },
    multi: null,
    value: [String, Number, Boolean],
    type: {
      type: String,
      default: 'radio'
    },
    color: {
      type: String,
      default: ''
    },
    bgColor: {
      type: String,
      default: ''
    },
    right: null
  },
  data () {
    return {
      actived: false,
      multi0: false,
      checkerClass: 'spd-checker-radio'
    }
  },
  created () {
    if (this.type == 'checkbox') {
      this.checkerClass = 'spd-checker-checkbox'
      if (this.multi === undefined) {
        this.multi0 = true
      }
    }
    if (this.type == 'select') {
      this.checkerClass = 'spd-checker-select'
    }
    if (this.multi !== undefined && this.multi !== false) {
      this.multi0 = true
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.setValue(this.mvalue)
    })
  },
  methods: {
    setValue (val) {
      let checked = false
      if (this.multi0) {
        if (val && val.indexOf(this.value) >= 0) {
          checked = true
        }
      } else {
        if (this.value === val) {
          checked = true
        }
      }
      this.$refs.input.checked = checked 
    },
    onClick () {
      let values = []
      $('input[name='+this.name+']').forEach((target) => {
        if (target.checked) {
          values.push(target.value)
        }
      })
      if (!this.multi0) {
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
<style lang="less">
@import '../../style/spd/widget/spd-checker/spd-checker.less';
</style>
