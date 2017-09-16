<template>
  <div :class="{'align-items-center': center, 'form-group': !noMarginBottom, 'row': row, 'form-row': narrowRow, 'form-inline': inline}"><slot></slot></div>
</template>
<script>
export default {
  props: {
    center: Boolean,
    noMarginBottom: {
      type: Boolean,
      default: false
    },
    row: Boolean,
    narrowRow: Boolean,
    inline: Boolean,
    size: String
  }
}
</script>
