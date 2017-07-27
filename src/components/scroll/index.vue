<template>
<div class="vue-ui-scroll" :style="{height: height+'px'}">
  <div class="vue-ui-scroll-content" :class="{ 'is-dropped': topDropped || bottomDropped}" :style="{ 'transform': 'translate3d(0, ' + translate + 'px, 0)' }">
    <slot name="top">
      <div class="vue-ui-scroll-top" v-if="topMethod">
        <spinner v-show="topStatus === 'loading'" class="vue-ui-scroll-spinner" size="20" type="fading-circle"></spinner>
        <span class="vue-ui-scroll-text">{{ topText }}</span>
      </div>
    </slot>
    <div>
    <slot></slot>
    </div>
    <slot name="bottom">
      <div class="vue-ui-scroll-bottom" v-if="bottomMethod">
        <spinner v-show="bottomStatus === 'loading'" class="vue-ui-scroll-spinner" size="20" type="fading-circle"></spinner>
        <span v-show="bottomStatus !== 'pull'" class="vue-ui-scroll-text">{{ bottomText }}</span>
      </div>
    </slot>
  </div>
</div>
</template>

<script type="text/babel">
import Spinner from '../../components/spinner/index.vue'
export default {
  name: 'scroll',
  components: {
    Spinner
  },

  props: {
    height: {
      type: [Number, String],
      required: true
    },
    maxDistance: {
      type: Number,
      default: 0
    },
    topPullText: {
      type: String,
      default: '下拉刷新'
    },
    topDropText: {
      type: String,
      default: '释放更新'
    },
    topLoadingText: {
      type: String,
      default: '加载中...'
    },
    topDistance: {
      type: Number,
      default: 70
    },
    topMethod: {
      type: Function
    },
    bottomPullText: {
      type: String,
      default: '上拉刷新'
    },
    bottomDropText: {
      type: String,
      default: '释放更新'
    },
    bottomLoadingText: {
      type: String,
      default: '加载中...'
    },
    bottomDistance: {
      type: Number,
      default: 70
    },
    bottomMethod: {
      type: Function
    },
    bottomAllLoaded: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      translate: 0,
      topText: '',
      topDropped: false,
      bottomText: '',
      bottomDropped: false,
      direction: '',
      currentY: 0,
      topStatus: '',
      bottomStatus: '',
      startTime: 0,
      endTime: 0,

      distY: 0,
      startY: 0,
      pointY: 0
    }
  },

  watch: {
    topStatus(val) {
      this.$emit('top-status-change', val)
      switch (val) {
        case 'pull':
          this.topText = this.topPullText
          break
        case 'drop':
          this.topText = this.topDropText
          break
        case 'loading':
          this.topText = this.topLoadingText
          break
      }
    },

    bottomStatus(val) {
      this.$emit('bottom-status-change', val)
      switch (val) {
        case 'pull':
          this.bottomText = this.bottomPullText
          break
        case 'drop':
          this.bottomText = this.bottomDropText
          break
        case 'loading':
          this.bottomText = this.bottomLoadingText
          break
      }
    }
  },

  methods: {
    getTime () {
      return Date.now() || +new Date()
    },
    onTopLoaded() {
      this.translate = 0
      setTimeout(() => {
        this.topStatus = 'pull'
        this.topDropped = false
      }, 200)
    },

    onBottomLoaded() {
      this.bottomStatus = 'pull'
      setTimeout(() => {
        this.bottomDropped = false
      })
      this.$nextTick(() => {
        if (this.bottomAllLoaded) {
          let scrollHeight = this.$el.querySelector('.vue-ui-scroll-content').offsetHeight
          let wrapperHeight = this.$el.offsetHeight
          if (scrollHeight < wrapperHeight) {
            this.translate = 0
          } else {
            let y = wrapperHeight - scrollHeight + 50
            if (y > 0) {
              y = 0
            }
            this.translate = y
          }
        }
      })
    },

    bindTouchEvents() {
      this.$el.addEventListener('touchstart', this.handleTouchStart)
      this.$el.addEventListener('touchmove', this.handleTouchMove)
      this.$el.addEventListener('touchend', this.handleTouchEnd)
      this.$el.addEventListener('touchcancel', this.handleTouchEnd)
    },

    unbind () {
      this.$el.removeEventListener('touchstart', this.handleTouchStart)
      this.$el.removeEventListener('touchmove', this.handleTouchMove)
      this.$el.removeEventListener('touchend', this.handleTouchEnd)
      this.$el.removeEventListener('touchcancel', this.handleTouchEnd)
    },

    init() {
      this.topStatus = 'pull'
      this.bottomStatus = 'pull'
      this.topText = this.topPullText
      if (typeof this.bottomMethod === 'function') {
        this.bindTouchEvents()
      }
      if (typeof this.topMethod === 'function') {
        this.bindTouchEvents()
      }
    },

    handleTouchStart(event) {
      this.startTime = this.getTime()

      let point = event.touches ? event.touches[0] : event

      this.distY = 0
      this.startY = point.pageY
      this.pointY = point.pageY

      if (this.topStatus !== 'loading') {
        this.topStatus = 'pull'
        this.topDropped = false
      }
      if (this.bottomStatus !== 'loading') {
        this.bottomStatus = 'pull'
        this.bottomDropped = false
      }
    },

    handleTouchMove(event) {
      if (this.pointY < this.$el.getBoundingClientRect().top && this.pointY > this.$el.getBoundingClientRect().bottom) {
        return
      }
      let point = event.touches ? event.touches[0] : event
      let deltaY = point.pageY - this.pointY
      this.pointY = point.pageY
      this.distY += deltaY
      let absDistY = Math.abs(this.distY)
      let newY = this.translate + deltaY

      let ts = this.getTime()
      if (ts - this.endTime > 300 && absDistY < 10) {
        return
      }

      let distance = this.pointY - this.startY
      this.direction = distance > 0 ? 'down' : 'up'
      if (this.direction === 'down') {
        this.bottomStatus = 'pull'
      } else {
        this.topStatus = 'pull'
      }

      if (this.direction === 'down' && typeof this.topMethod === 'function' && this.topStatus !== 'loading') {
        event.preventDefault()
        event.stopPropagation()
        if (this.maxDistance > 0) {
          newY = distance <= this.maxDistance ? newY : this.translate
        }
        this.topStatus = newY >= this.topDistance ? 'drop' : 'pull'
      } else if(this.direction === 'up' && typeof this.bottomMethod === 'function' && this.bottomStatus !== 'loading' && !this.bottomAllLoaded) {
        event.preventDefault()
        event.stopPropagation()
        let containerBottom = this.$el.getBoundingClientRect().bottom
        let scrollerBottom = this.$el.querySelector('.vue-ui-scroll-content').getBoundingClientRect().bottom
        this.bottomStatus = scrollerBottom < containerBottom ? 'drop' : 'pull'
      }

      this.translate = newY
      this.$emit('translate-change', this.translate)
    },

    handleTouchEnd() {
      this.endTime = this.getTime()
      if (this.direction === 'down' && this.translate > 0) {
        this.topDropped = true
        if (this.topStatus === 'drop') {
          this.translate = 50
          this.topStatus = 'loading'
          this.topMethod()
        } else {
          this.translate = 0
          this.topStatus = 'pull'
        }
      }
      if (this.direction === 'up' && this.translate < 0) {
        this.bottomDropped = !this.bottomAllLoaded
        
        let y = this.translate
        let scrollHeight = this.$el.querySelector('.vue-ui-scroll-content').offsetHeight
        let wrapperHeight = this.$el.offsetHeight
        let containerBottom = this.$el.getBoundingClientRect().bottom
        let scrollerBottom = this.$el.querySelector('.vue-ui-scroll-content').getBoundingClientRect().bottom
        let y0 = 0
        if (scrollHeight >= wrapperHeight) {
          y0 = wrapperHeight - scrollHeight + 50
        }
        if (this.bottomStatus === 'drop') {
          this.bottomStatus = 'loading'
          y = y0
          this.bottomMethod()
        } else {
          this.bottomStatus = 'pull'
          if (scrollerBottom < containerBottom) {
            y = y0
          }
        }
        if (y > 0) {
          y = 0
        }
        this.translate = y
      }
      this.$emit('translate-change', this.translate)
      this.direction = ''
    }
  },

  mounted() {
    this.init()
  },
  destroyed () {
    this.unbind()
  }
}
</script>

<style lang="less">
.vue-ui-scroll {
  border-bottom: 1px solid #000;
  box-sizing: border-box;
  overflow: hidden;
  .vue-ui-scroll-content {
    &.is-dropped {
      transition: .2s;
    }
  }
  .vue-ui-scroll-top, .vue-ui-scroll-bottom {
    text-align: center;
    height: 50px;
    line-height: 50px;
  }

  .vue-ui-scroll-top {
    margin-top: -50px;
  }
  .vue-ui-scroll-bottom {
    margin-bottom: -50px;
  }
  .vue-ui-scroll-spinner {
    display: inline-block;
    margin-right: 5px;
    vertical-align: middle;
  }
  .vue-ui-scroll-text {
    vertical-align: middle;
  }
}
</style>


