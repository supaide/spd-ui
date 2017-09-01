<template>
<div class="dropdown" v-click-outside="onClickedOutside">
  <a class="dropdown-label" @click="toggle">{{label}}</a>
  <div class="dropdown-items" v-show="show">
    <a v-for="(item, index) in items" :key="item.value" class="dropdown-item" @click.stop.prevent="sel(index, $event)">{{item.label}}<span v-if="itemDel" class="del" @click.stop.prevent="del(index, $event)">+</span></a>
  </div>
</div>
</template>
<script>
import ClickOutside from '../../directives/click-outside'
import {$} from 'spd-webutil'
export default {
  directives: {
    ClickOutside
  },
  props: {
    etc: {
      type: String,
      default: '...'
    },
    items: Array,
    value: [Array, String, Number, Boolean],
    multi: Boolean,
    maxHeight: Number,
    itemClickHide: {
      type: Boolean,
      default: true
    },
    clickable: {
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
    },
    loader: Function
  },
  data () {
    return {
      show: false,
      firstSelectedInd: -1,
      top: 'auto',
      label: this.defaultLabel,
    }
  },
  mounted () {
    let itemsDom = this.$el.querySelector('.dropdown-items')
    itemsDom.style.minWidth = this.$el.querySelector('.dropdown-label').getBoundingClientRect().width + 'px'
    if (this.maxHeight) {
      itemsDom.style.maxHeight = this.maxHeight + 'px'
    }
    if (!this.multi) {
      $(this.$el).on('mouseover', '.dropdown-item', this.mouseOverHandler)
    }
  },
  destroy () {
    if (!this.multi) {
      $(this.$el).off('mouseover', '.dropdown-item', this.mouseOverHandler)
    }
  },
  methods: {
    mouseOverHandler (evt) {
      let $items = this.$el.querySelectorAll('.dropdown-item')
      for (let i=0; i<$items.length; i++) {
        $items[i].classList.remove('active')
      }
      evt.target.classList.add('active')
    },
    toggle () {
      if (!this.show) {
        if (!this.items || this.items.length<1) {
          if (this.loader) {
            this.loader(() => {
              this.show = true
            })
            return
          }
        }
      }
      this.show = !this.show
    },
    onClickedOutside () {
      this.show = false
    },
    setValue (values) {
      if (!this.clickable) {
        return
      }
      if (!values || values.length<1) {
        return
      }
      values = [].concat(values)
      let $items = this.$el.querySelectorAll('.dropdown-item')
      for (let i=0; i<$items.length; i++) {
        if (values.indexOf(this.items[i].value) > -1) {
          $items[i].classList.add('active')
          $items[i].classList.add('selected')
        } else {
          $items[i].classList.remove('active')
          $items[i].classList.remove('selected')
        }
      }
      this.updateValue()
    },
    updateValue (hide) {
      this.$nextTick(() => {
        let $items = this.$el.querySelectorAll('.dropdown-item')
        let values = [], firstSelectedInd = -1
        for (let i=0; i<$items.length; i++) {
          if ($items[i].classList.contains('selected')) {
            if (firstSelectedInd < 0) {
              firstSelectedInd = i 
            }
            values.push(this.items[i].value)
          }
        }
        this.firstSelectedInd = firstSelectedInd
        if (firstSelectedInd > -1) {
          this.top = (0 - $items[this.firstSelectedInd].offsetTop + 5) + 'px'
          this.changeLabel ? (this.label = this.items[firstSelectedInd].label + (values.length>1 ? this.etc : '')) : ''
        } else {
          this.top = 'auto'
          this.changeLabel ? (this.label = this.defaultLabel) : ''
        }
        if (!this.multi) {
          values = values.pop()
        }
        if (hide) {
          this.show = false
        }
        this.$emit('input', values)
      })
    },
    sel (ind, e) {
      if (!this.clickable) {
        return
      }
      let $items = this.$el.querySelectorAll('.dropdown-item')
      for (let i=0; i<$items.length; i++) {
        if ((this.multi && i==ind && $items[i].classList.contains('selected')) || (!this.multi && i!=ind)) {
          $items[i].classList.remove('active')
          $items[i].classList.remove('selected')
          continue
        }
        if (i == ind) {
          $items[i].classList.add('active')
          $items[i].classList.add('selected')
        }
      }
      this.updateValue(!this.multi && this.itemClickHide)
    },
    del (i, e) {
      let items = this.items
      items.splice(i, 1)
      this.$emit('update:items', items)
      this.updateValue()
    }
  },
  watch: {
    show (val) {
      if (val) {
        let container = this.$el.querySelector('.dropdown-items')
        container.style.top = this.top
        if (!this.value || this.value.length<1) {
          return
        }
        let $items = this.$el.querySelectorAll('.dropdown-item')
        let values = [].concat(this.value)
        for (let i=0; i<$items.length; i++) {
          if (values.indexOf(this.items[i].value) > -1) {
            $items[i].classList.add('active')
            $items[i].classList.add('selected')
          } else {
            $items[i].classList.remove('active')
            $items[i].classList.remove('selected')
          }
        }
      }
    },
    defaultLabel (val) {
      this.label = val
    }
  }
}
</script>
<style lang="less">
@import '../../style/spd/widget/drop-down/drop-down.less';
</style>
