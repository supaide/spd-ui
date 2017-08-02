<template>
  <a href="javascript:;" class="weui-btn" :class="classes" :disabled="disabled" :type="actionType" @click="onClick">
    <i class="weui-loading" v-if="loading"></i><slot>{{text}}</slot>
  </a>
</template>

<script>
export default {
  props: {
    link: {},
    type: {
      default: 'default'
    },
    disabled: Boolean,
    mini: Boolean,
    plain: Boolean,
    text: String,
    actionType: String,
    loading: Boolean
  },
  computed: {
    classes () {
      return [
        this.mini ? 'weui-btn_mini' : '',
        this.plain ? `weui-btn_plain-${this.type}` : `weui-btn_${this.type}`,
        this.disabled ? (this.plain ? 'weui-btn_plain-disabled' : 'weui-btn_disabled') : '',
        this.loading ? `weui-btn_loading` : ''
      ]
    }
  },
  methods: {
    onClick () {
      if (!this.disabled) {
        this.$emit('on-click', this.link)
      }
    }
  }
}
</script>

<style lang="less">
@import '../../style/weui/widget/weui-button/weui-button.less';
</style>
