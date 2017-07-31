<script>
export default {
  render: function(h) {
    return h(this.type, this.$slots.default)
  },
  props: {
    type: {
      type: String,
      required: true
    }
  }
}
</script>
