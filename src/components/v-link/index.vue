<template>
<a @click="onClick"><slot></slot></a>
</template>
<script>
import {url, event} from 'spd-webutil'
export default {
  mounted () {
    let href = this.$el.getAttribute('href')
    if (!href) {
      return
    }
    this.$el.setAttribute('href', 'javascript:void(0)')
    this.$el.setAttribute('data-href', href)
  },
  methods: {
    onClick () {
      let href = this.$el.getAttribute('data-href')
      let urlInfo = url.decodeQuery(href)
      event.emit('on-link-click', urlInfo[0], urlInfo[1])
    }
  }
}
</script>
