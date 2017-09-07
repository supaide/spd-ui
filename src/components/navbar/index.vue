<template>
<div class="spd-navbar">
  <ul class="clearfix">
    <li v-for="(nav, index) in navs" :class="{active: current0==index}" :key="nav.value" @click="onclick(index)">{{nav.label}}</li>
  </ul>
  <slot></slot>
</div>
</template>
<script>
export default {
  props: {
    navs: {
      type: Array,
      required: true
    },
    current: {
      type: [Number, String],
      default: 0
    }
  },
  data () {
    return {
      current0: this.current
    }
  },
  created () {
    this.setCurrent(this.current)
  },
  methods: {
    onclick (index) {
      this.$emit('on-change', index)
    },
    setCurrent (current) {
      if (typeof current === 'string') {
        for (let i=0; i<this.navs.length; i++) {
          if (this.navs[i].value == current) {
            this.current0 = i
            break
          }
        }
      } else {
        this.current0 = current
      }
    }
  },
  watch: {
    current (val) {
      this.setCurrent(val)
    }
  }

}
</script>
<style lang="less">
.spd-navbar {
  display: flex;
  padding: 5px;
  flex-direction: column;
  > ul {
    border-bottom: 1px solid #ccc;
  }
  > ul li {
    margin-bottom: -1px;
    float: left;
    min-width: 100px;
    font-size: 1.1rem;
    text-align: center;
    cursor: pointer;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    padding: 5px;
    color: #888;
    border-bottom: 1px solid transparent;
    border-left: 1px solid transparent;
    border-top: 1px solid transparent;
    border-right: 1px solid transparent;
  }
  > ul li.active {
    color: #000;
    border-bottom: 1px solid #fff;
    border-left: 1px solid #ccc;
    border-top: 1px solid #ccc;
    border-right: 1px solid #ccc;
    cursor: default;
  }

}
</style>
