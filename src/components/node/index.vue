<script>
export default {
  render: function(h) {
    return h(this.node, this.$slots.default)
  },
  props: {
    node: {
      type: String,
      required: true
    }
  }
}
</script>
