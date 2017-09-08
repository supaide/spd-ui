<template>
<a @click="onClick"><slot></slot></a>
</template>
<script>
let jsHref = 'javascript:void(0)'
import {url, event} from 'spd-webutil'
export default {
  mounted () {
    this.updateHref()
  },
  updated () {
    this.updateHref()
  },
  methods: {
    updateHref () {
      let href = this.$el.getAttribute('href')
      if (!href || href == jsHref) {
        return
      }
      this.$el.setAttribute('href', jsHref)
      this.$el.setAttribute('data-href', href)
    },
    onClick () {
      let href = this.$el.getAttribute('data-href')
      let urlInfo = url.decodeQuery(href)
      event.emit('on-link-click', urlInfo[0], urlInfo[1])
    }
  }
}
</script>
