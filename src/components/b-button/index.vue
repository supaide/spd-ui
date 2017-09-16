<template>
  <node :node="node" role="button" class="btn" :class="[btnClass, size0 ? 'btn-'+size0 : null, row ? 'btn-block' : null, disabled ? 'disabled' : null ]" :type="type" :disabled="disabled" :aria-disabled="disabled" @click.native.stop.prevent="onClick"><slot></slot></node>
</template>
<script>
import Node from '../node/index.vue'
export default {
  components: {
    Node
  },
  props: {
    node: {
      type: String,
      default: 'button'
    },
    type: {
      type: String,
      default: 'button'
    },
    size: String,
    row: Boolean,
    disabled: Boolean,
    outline: Boolean,
    btnStyle: {
      type: String,
      default: 'primary'
    }
  },
  data () {
    return {
      size0: this.size || this.$parent.size,
      btnClass: this.btnStyle ? (this.outline ? 'btn-outline-'+this.btnStyle : 'btn-'+this.btnStyle) : null,
    }
  },
  methods: {
    onClick () {
      if (this.disabled) {
        return
      }
      this.$emit('on-click')
    }
  }
}
</script>
