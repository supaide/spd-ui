<template>
<div>
  <checker :space="space" :margin-right="marginRight" :multi="multi" :name="name0" v-for="item in items" :key="item[0]" :value="item[0]" v-model="currentValue" ref="checker" :disabled="item[2] ? true : null">
    {{item[1]}}
  </checker>
</div>
</template>
<script>
import Checker from '../checker/index.vue'
export default {
  components: {
    Checker
  },
  props: {
    marginRight: String,
    space: String,
    value: null,
    name: String,
    multi: Boolean,
    items: {
      type: Array,
      required: true
    }
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
