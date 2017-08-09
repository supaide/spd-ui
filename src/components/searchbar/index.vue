<template>
<div class="spd-search-bar">
<slot name="label"></slot>
<div class="weui-search-bar" :class="focus ? 'weui-search-bar_focusing' : null">
  <form class="weui-search-bar__form">
    <div class="weui-search-bar__box">
      <i class="weui-icon-search"></i>
      <input type="search" class="weui-search-bar__input" placeholder="搜索" ref="search" :id="inputId" v-model="searchText" spellcheck="false" autocorrect="off" autocapitalize="off" autocomplete="off" />
      <a v-show="!loading" href="javascript:" class="weui-icon-clear" ref="clear" @click="onClear"></a>
      <a v-show="loading" href="javascript:" class="weui-loading"></a>
    </div>
    <label :for="inputId" class="weui-search-bar__label" ref="text" @click="onLabelClick">
      <i class="weui-icon-search"></i>
      <span>{{text}}</span>
    </label>
  </form>
  <a href="javascript:" class="weui-search-bar__cancel-btn" @click="cancel">取消</a>
</div>
<div v-show="showMask" class="weui-mask" :style="maskStyle"></div>
<div class="weui-cells weui-cells_access search_show" :style="resultStyle">
  <slot></slot>
  <!--div class="weui-cell">
    <div class="weui-cell__bd weui-cell_primary">
      <p>实时搜索文本</p>
    </div>
  </div>
  <div class="weui-cell">
    <div class="weui-cell__bd weui-cell_primary">
      <p>实时搜索文本</p>
    </div>
  </div-->
</div>

</div>
</template>
<script>
export default {
  props: {
    loading: Boolean,
    showMask: Boolean,
    resultHeight: {
      type: String,
      required: true
    },
    text: {
      type: String,
      default: '搜索'
    },
    delay: {
      type: Number,
      default: 200
    }
  },
  data () {
    return {
      focus: false,
      inputId: '',
      searchText: '',
      preSearchText: '',
      inputTimer: null
    }
  },
  computed: {
    resultStyle () {
      if (this.resultHeight) {
        return {
          maxHeight: this.resultHeight,
          overflowY: 'auto',
          marginTop: 0,
          position: 'absolute',
          width: '100%',
          zIndex: 1000,
          top: (window.innerHeight - (this.resultHeight.replace(/px/ig, '') - 0)) + 'px'
        }
      } else {
        return null
      }
    },
    maskStyle () {
      return {
        top: (window.innerHeight - (this.resultHeight.replace(/px/ig, '') - 0)) + 'px'
      }
    }
  },
  created () {
    this.inputId = 'search-input-'+this._uid
  },
  methods: {
    onLabelClick () {
      this.focus = true
    },
    clear () {
      this.searchText = ''
      this.focus = false
      this.clearTimer()
    },
    onClear () {
      this.searchText = ''
      this.$refs.search.focus()
      this.$emit('on-change', '')
    },
    cancel () {
      this.clear()
      this.$emit('on-change', '')
    },
    setTimer () {
      if (this.inputTimer) {
        this.clearTimer()
        return
      }
      this.preSearchText = ''
      this.inputTimer = setInterval(() => {
        if (this.preSearchText == this.searchText) {
          return
        }
        this.preSearchText = this.searchText
        this.$emit('on-change', this.preSearchText)
      }, this.delay)
    },
    clearTimer () {
      if (this.inputTimer) {
        clearInterval(this.inputTimer)
        this.inputTimer = null
      }
    }
  },
  watch: {
    focus (val) {
      if (val) {
        this.setTimer()
      } else {
        this.clearTimer()
      }
    
    }
  }
}
</script>
<style lang="less">
@import '../../style/weui/icon/weui-icon_font';
@import '../../style/weui/widget/weui-searchbar/weui-searchbar';
@import '../../style/weui/widget/weui-cell/weui-cell_global';
@import '../../style/weui/widget/weui-cell/weui-access';
.weui-search-bar .weui-loading {
  position: absolute;
  top: 4px;
  right: 10px;
}
.spd-search-bar {
  display: flex;
  align-items: center;
  .weui-search-bar {
    flex: 1;
  }
}
</style>
