<template>
<div class="spd" :class="!largeScreen ? 'spd-min' : null">
  <header v-show="!blank">
    <div class="spd-logo">
      <span class="spd-logo-lg">速派得CMS</span>
      <span class="spd-logo-min">速</span>
    </div>
    <div class="spd-sidebar-btn i-align-justify" @click="sidebarToggle"></div>
    <div class="spd-header-content">content</div>
  </header>
  <nav class="spd-sidebar" v-show="!blank">
    <ul>
      <li class="spd-sidebar-navs" v-for="(item, index) in menus" :key="index" @click.stop.prevent="onSel">
        <a class="spd-nav-header">
          <span :class="item.logo"></span>
          <span class="spd-nav-header__title">{{item.title}}</span>
          <span class="spd-sidebar-arrow i-chevron-down"></span>
        </a>
        <ul class="spd-subnavs">
          <li v-for="(subItem, index2) in item.subs" :key="index2"><v-link :href="subItem.url">{{subItem.title}}</v-link></li>
        </ul>
      </li>
    </ul>
  </nav>
  <div class="spd-main" :class="blank ? 'spd-empty-main' : null" ref="main">
    <nav class="spd-breadcrumb breadcrumb" v-if="breadCrumbs && breadCrumbs.length > 0">
      <v-link class="breadcrumb-item" :href="item.url" v-for="(item, index) in breadCrumbs" :key="index" v-if="index<breadCrumbs.length-1">{{item.title}}</v-link>
      <span class="breadcrumb-item active">{{breadCrumbs[breadCrumbs.length-1].title}}</span>
    </nav>
		<slot></slot>
  </div>
  <footer class="spd-footer" v-show="!blank">
    <p>© Company 2017</p>
  </footer>
</div>
</template>
<script>
import {$} from 'spd-webutil'
import VLink from '../v-link/index.vue'
export default {
  components: {
    VLink
  },
  props: {
    blank: {
      type: Boolean,
      default: true
    },
    breadCrumbs: Array,
    menus: Array
  },
	data () {
    return {
      largeScreen: true,
    }
  },
  created () {
    this.largeScreen = window.innerWidth > 768
  },
  methods: {
    sidebarToggle () {
      document.querySelector('.spd').classList.toggle('spd-min')
      let minStyle = document.querySelector('.spd').classList.contains('spd-min')
      let lis = document.querySelectorAll('.spd-sidebar>ul>li')
      for (let i=0; i<lis.length; i++) {
        lis[i].classList.remove('active')
        let subNavs = lis[i].querySelector('.spd-subnavs')
        let height = subNavs.style.height
        if (height == '0px') {
          subNavs.style.height = minStyle ? 'auto' : null
        } else if (height == 'auto') {
          subNavs.style.height = null
        } else if (!minStyle && height) {
          lis[i].classList.add('active')
        }
      }
    },
    onSel(e) {
      let node = e.target
      let finded = false
      for (let i=0; i<3; i++) {
        if (node.tagName.toLowerCase() == 'li' && node.classList.contains('spd-sidebar-navs')) {
          finded = true
          break
        }
        node = node.parentNode
      }
      if (!finded) {
        return
      }
      let currentActive = node.classList.contains('active')
      let minStyle = document.querySelector('.spd').classList.contains('spd-min')
      if (minStyle) {
        return
      }
      let lis = document.querySelectorAll('.spd-sidebar>ul>li')
      for (let i=0; i<lis.length; i++) {
        lis[i].classList.remove('active')
        lis[i].querySelector('.spd-subnavs').style.height = minStyle ? 'auto' : '0'
      }
      if (currentActive) {
        return
      }
      node.classList.add('active')
      let subnavs = node.querySelector('.spd-subnavs')
      let height = 0
      lis = subnavs.querySelectorAll('li')
      for (let i=0; i<lis.length; i++) {
        height += parseFloat(window.getComputedStyle(lis[i]).height)
      }
      subnavs.style.height = height + 'px'
    }
  },
  watch: {
    blank (val) {
      this.$nextTick(()=>{
        this.$refs.main.classList.add('spd-notransition')
      })
      setTimeout(()=>{
        this.$refs.main.classList.remove('spd-notransition')
      }, 500)
    }
  }
}
</script>
<style lang="less">
@import '../../style/spd/widget/spd-admin/spd-admin.less';
</style>
