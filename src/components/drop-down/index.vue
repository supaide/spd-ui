<template>
<div class="dropdown" v-click-outside="onClickedOutside">
  <a class="dropdown-label" @click="toggle">{{label}}</a>
  <div class="dropdown-items" v-show="show">
    <a v-for="(item, index) in items" :key="item.value" class="dropdown-item" @click.stop.prevent="sel(index, item.label, $event)">{{item.label}}<span v-if="itemDel" class="del" @click.stop.prevent="del(index, $event)">+</span></a>
  </div>
</div>
</template>
<script>
import ClickOutside from '../../directives/click-outside'
export default {
  directives: {
    ClickOutside
  },
  props: {
    value: Array,
    maxHeight: Number,
    itemClickHide: {
      type: Boolean,
      default: true
    },
    changeLabel: {
      type: Boolean,
      default: true
    },
    itemDel: Boolean,
    defaultLabel: {
      type: String,
      default: '请选择'
    }
  },
  data () {
    return {
      items: this.value,
      show: false,
      label: this.defaultLabel,
      currentValue: this.value
    }
  },
  mounted () {
    let itemsDom = this.$el.querySelector('.dropdown-items')
    itemsDom.style.minWidth = this.$el.querySelector('.dropdown-label').getBoundingClientRect().width + 'px'
    if (this.maxHeight) {
      itemsDom.style.maxHeight = this.maxHeight + 'px'
    }
  },
  methods: {
    onClickedOutside () {
      this.show = false
    },
    toggle () {
      this.show = !this.show
    },
    sel (i, label, e) {
      if (this.itemClickHide) {
        this.show = false
      }
      this.label = label
    },
    del (i, e) {
      this.items.splice(i, 1)
      this.$emit('input', this.items)
    }
  },
  watch: {
    show (val) {
    },
    value (val) {
      this.items = val
      this.currentValue = val
    },
    defaultLabel (val) {
      this.label = val
    }
  }
}
</script>
<style lang="less">
.dropdown {
  position: relative;
  display: inline-block;
  color: #495057;
  font-size: 12px;
}
.dropdown-label {
  cursor: pointer;
  display: inline-block;
  border: 1px solid rgba(0,0,0,.15);
  padding: .25rem .5rem;
  border-radius: .2rem;
  &:after {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: .255em;
    vertical-align: .255em;
    content: "";
    border-top: .3em solid;
    border-right: .3em solid transparent;
    border-left: .3em solid transparent;
  }
}
.dropdown-items {
  position: absolute;
  padding: 5px 5px 5px 0;
  transform: translate3d(0px, -2px, 0px);
  will-change: transform;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0,0,0,.15);
  border-radius: .25rem;
  min-height: 50px;
  overflow-y: auto;
  z-index: 100;
  .dropdown-item {
    position: relative;
    display: block;
    width: 100%;
    padding: .25rem 2.5rem .25rem 1.5rem;
    clear: both;
    font-weight: 400;
    color: #212529;
    text-align: inherit;
    white-space: nowrap;
    background: 0 0;
    border: 0;
    &:active, &.active {
      color: #fff;
      text-decoration: none;
      background-color: #007bff;
    }
    &:focus, &:hover {
      color: #16181b;
      text-decoration: none;
      background-color: #f8f9fa;
    }
    .del {
      cursor: pointer;
      display: inline-block;
      position: absolute;
      right: 0;
      width: 20px;
      text-align: center;
      font-size: 15px;
      transform: rotate(45deg);
      top: 0px;
      
    }
  }
}
</style>
