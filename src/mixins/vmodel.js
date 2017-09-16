export default {
  model: {
    prop: 'currentValue',
    event: 'change'
  },
  props: {
    currentValue: [String, Number, Array],
  },
  watch: {
    value (val) {
      this.$emit('change', val)
    },
    currentValue (val) {
      this.value = val
    }
  }
}
