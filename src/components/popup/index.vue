<template>
  <div v-show="show">
    <div class="weui-mask popup-mask" ref="mask" v-show="showMask" @click="onMaskClick"></div>
    <div class="weui-popup" ref="popup" :style="{background: background}">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import {$, util} from 'spd-webutil'

let popupCache = {}
export default {
  props: {
    value: Boolean,
    background: {
      type: String,
      default: '#fff'
    }
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
      util.each(popupCache, (uid, vm) => {
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
      this.$refs.popup.classList.add('weui-animate-slide-up')
      this.$refs.mask.classList.remove('weui-animate-fade-out')
      this.$refs.popup.classList.remove('weui-animate-slide-down') 
      this.show = true
    },
    onHide () {
      if (!this.show) {
        return
      }
      this.$refs.mask.classList.add('weui-animate-fade-out')
      this.$refs.popup.classList.add('weui-animate-slide-down') 
      this.$refs.mask.classList.remove('weui-animate-fade-in')
      this.$refs.popup.classList.remove('weui-animate-slide-up') 
    },
    onMaskClick () {
      util.each(popupCache, (uid, vm) => {
        vm.onHide.apply(vm)
      })
    },
    showListener () {
      if (this.$refs.popup.className.indexOf('weui-animate-slide-down') > -1) {
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
@import '../../style/weui/widget/weui-picker/weui-picker.less';
@import '../../style/weui/widget/weui-animate/weui-animate.less';
</style>
