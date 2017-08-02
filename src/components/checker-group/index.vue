<template>
  <group :title="title" :tips="tips" :class-name="float !== undefined ? 'spd-float-checkboxs' : ''">
  <checker :name="name0" :checkbox="checkbox" v-for="(value, key) in items" :key="key">
    {{value}}
  </checker>
</group>
</template>
<script>
import Group from '../group/index.vue'
import Checker from '../checker/index.vue'
import {util} from 'spd-webutil'
export default {
  components: {
    Group,
    Checker
  },
  props: {
    title: String,
    tips: String,
    name: String,
    items: {
      type: Object,
      required: true
    },
    checkbox: Boolean,
    float: null
  },
  data () {
    return {
      name0: ''
    }
  },
  created () {
    this.name0 = this.name ? this.name : 'checkers-'+this._uid
  }
}
</script>
<style lang="less">
.spd-float-checkboxs {
  display: flex;
  flex-wrap: wrap;
}
</style>
