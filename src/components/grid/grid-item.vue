<template>
  <a href="javascript:;" class="weui-grid" @click="onClick" :style="style">
    <div class="weui-grid__icon" v-if="hasIconSlot || icon">
      <slot name="icon"><img :src="icon" alt=""></slot>
    </div>
    <p class="weui-grid__label">
      <slot></slot>
    </p>
   </a>
</template>

<script>

export default {
  props: ['icon', 'label', 'link'],
  mounted () {
    this.$slots.icon && (this.hasIconSlot = true)
  },
  computed: {
    style () {
      const lines = this.$parent.lines
      if (!lines || lines === 3) {
        return
      }
      const styles = {}
      styles.width = `${100 / lines}%`
      return styles
    }
  },
  methods: {
    onClick () {
      this.$emit('on-item-click', this.link)
    }
  },
  data () {
    return {
      hasIconSlot: false
    }
  }
}
</script>
