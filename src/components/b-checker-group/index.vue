<template>
<div :class="{'form-inline': inline0, 'row': wrapInput}">
  <div v-if="wrapInput" class="col-form-legend" :class="legendClass">{{legend}}</div>
  <div v-if="wrapInput" :class="wrapClass">
    <b-checker v-for="(item, index) in items" :key="item.value" :item="item" :inline="inline0" :name="name0" :size="size0" :multi="multi" :label-class="labelClass" v-model="value"></b-checker>
  </div>
  <b-checker v-if="!wrapInput" v-for="(item, index) in items" :key="item.value" :item="item" :inline="inline0" :name="name0" :size="size0" :multi="multi" :label-class="labelClass" v-model="value"></b-checker>
</div>
</template>
<script>
import BChecker from '../b-checker/index.vue'
import vmodel from '../../mixins/vmodel'
export default {
  mixins: [vmodel],
  components: {
    BChecker
  },
  props: {
    inline: Boolean,
    size: String,
    multi: Boolean,
    items: Array,
    labelClass: [String, Array],
    legendClass: [String, Array],
    wrapClass: [String, Array],
    legend: String,
    wrapInput: Boolean
  },
  data () {
    return {
      name0: this.name,
      value: this.currentValue,
      size0: this.size || this.$parent.size,
      inline0: this.inline || this.$parent.inline,
    }
  },
  created () {
    if (!this.name0) {
      this.name0 = 'checkers_' + this._uid
    }
  },

}
</script>
