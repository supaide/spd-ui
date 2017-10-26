<template>
  <div v-show="show">
    <div :class="transparent === undefined ? 'weui-mask' : 'weui-mask_transparent'" class="weui-mask popup-mask" ref="mask" v-show="showMask" @click="onMaskClick"></div>
    <div :class="className" class="weui-dialog" ref="popup" :style="popupStyle">
      <slot></slot>
    </div>
  </div>
</template>
<script>
let popupCache = {}
export default {
  props: {
    className: String,
    popupStyle: Object,
    value: Boolean,
    transparent: null
  },
  data () {
    return {
      show: false,
      showMask: true
    }
  },
  mounted () {
    $(this.$refs.popup).on('animationend webkitAnimationEnd', this.showListener)
    popupCache[this._uid] = this
  },
  destroyed () {
    $(this.$refs.popup).off('animationend webkitAnimationEnd', this.showListener)
    delete popupCache[this._uid]
  },
  methods: {
    resetMask () {
      let isShow = false
      Object.keys(popupCache).forEach((uid) => {
        let vm = popupCache[uid]
        if (vm.show && uid != this._uid) {
          isShow = true
          return false
        }
      })
      this.showMask = !isShow
    },
    onShow () {
      this.resetMask()
      $.getStyle(this.$el, 'transform'); 
      this.$refs.mask.classList.add('weui-animate-fade-in')
      //this.$refs.popup.classList.add('weui-animate-slide-up')
      //this.$refs.popup.classList.add('weui-animate-fade-in')
      this.$refs.mask.classList.remove('weui-animate-fade-out')
      //this.$refs.popup.classList.remove('weui-animate-slide-down') 
      this.$refs.popup.classList.remove('weui-animate-fade-out') 
      this.show = true
    },
    onHide () {
      if (!this.show) {
        return
      }
      this.$refs.mask.classList.add('weui-animate-fade-out')
      //this.$refs.popup.classList.add('weui-animate-slide-down') 
      this.$refs.popup.classList.add('weui-animate-fade-out') 
      this.$refs.mask.classList.remove('weui-animate-fade-in')
      //this.$refs.popup.classList.remove('weui-animate-slide-up') 
      this.$refs.popup.classList.remove('weui-animate-fade-in') 
    },
    onMaskClick () {
      Object.keys(popupCache).forEach((uid) => {
        let vm = popupCache[uid]
        vm.onHide.apply(vm)
      })
    },
    showListener () {
      //if (this.$refs.popup.className.indexOf('weui-animate-slide-down') > -1) {
      if (this.$refs.popup.className.indexOf('weui-animate-fade-out') > -1) {
        this.show = false
      }
    }
  },
  watch: {
    show (val) {
      if (val) {
        this.onShow()  
      } else {
        this.onHide()
      }
      this.$emit('input', this.show)
    },
    value (val) {
      this.show = val
    }
  }

}
</script>
<style lang="less">
@import '../../style/weui/widget/weui-tips/weui-mask.less';
@import '../../style/weui/widget/weui-tips/weui-dialog.less';
@import '../../style/weui/widget/weui-tips/weui-toast.less';
@import '../../style/weui/widget/weui-picker/weui-picker.less';
@import '../../style/weui/widget/weui-loading/weui-loading.less';
</style>
