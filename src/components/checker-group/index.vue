<template>
  <group :title="title" :tips="tips" :class-name="float !== undefined ? 'spd-checker-float' : ''">
  <checker :multi="multi" :name="name0" :color="color" :bg-color="bgColor" :type="type" v-for="item in items" :key="item[0]" :value="item[0]" v-model="currentValue" ref="checker" :disabled="item[2] ? 'true' : null">
    {{item[1]}}
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
    value: null,
    title: String,
    tips: String,
    name: String,
    color: String,
    bgColor: String,
    multi: null,
    type: String,
    items: {
      type: Array,
      required: true
    },
    float: null
  },
  data () {
    return {
      currentValue: this.value,
      name0: ''
    }
  },
  created () {
    this.name0 = this.name ? this.name : 'checkers-'+this._uid
  },
  watch: {
    currentValue (vals) {
      this.$emit('input', vals)
    },
    value (vals) {
      this.currentValue = vals
    }
  }
}
</script>
<style lang="less">
@import '../../style/spd/widget/spd-checker/spd-checker.less';
</style>
