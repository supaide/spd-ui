<template>
  <div><component :is="spinner"></component></span></div>
</template>
<script>
import Snake from './snake.vue'
import FadingCircle from './fading-circle.vue'
import DoubleBounce from './double-bounce.vue'
import TripleBounce from './triple-bounce.vue'

let allowedSpinner = [
  'snake', 'fading-circle', 'double-bounce', 'triple-bounce'
]

export default {
  components: {
    Snake,
    FadingCircle,
    DoubleBounce,
    TripleBounce
  },
  computed: {
    spinner() {
      if (allowedSpinner.indexOf(this.type) >= 0) {
        return this.type
      } else {
        return allowedSpinner[0]
      }
    }
  },
  props: {
    type: {
      type: String,
      default: 'snake' 
    },
    size: {
      type: [Number, String],
      default: 28
    },
    color: {
      type: String,
      default: '#ccc'
    }
  }
}
</script>
