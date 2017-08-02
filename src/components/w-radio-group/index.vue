<template>
<group :class-name="checkbox ? 'weui-cells_checkbox' : 'weui-cells_radio'" :title="title" :tips="tips">
  <cell node-type="label" class="weui-check__label" v-for="(value, key) in items" :key="key">
    {{value}}
    <span class="spd-input-inner" :slot="right ? 'right' : 'label'">
      <input type="radio" class="weui-check" :name="name" ref="input">
      <i class="weui-icon-checked"></i>
    </span>
  </cell>
  <slot></slot>
</group>
</template>
<script>
import Cell from '../cell/index.vue'
import Group from '../group/index.vue'
import {util} from 'spd-webutil'
export default {
  props: {
    title: String,
    tips: String,
    name: {
      type: String,
      required: true
    },
    items: {
      type: Object,
      required: true
    },
    right: Boolean,
    checkbox: Boolean
  },
  components: {
    Cell,
    Group
  },
  mounted () {
    this.$nextTick(function () {
      if (this.checkbox) {
        util.each(this.$refs.input, (i, input) => {
          input.setAttribute('type', 'checkbox')
        })
      }
    })
  },
}
</script>
<style lang="less">
@import '../../style/weui/base/fn.less';
@import '../../style/weui/widget/weui-cell/weui-check.less';
@import '../../style/weui/widget/weui-cell/weui-form/weui-form_common.less';
@import '../../style/weui/icon/weui-icon_font.less';

.weui-cells_radio {
  .weui-cell__hd {
    padding-right: @weuiCellInnerGapH;
  }
  .weui-icon-checked {
    box-sizing: border-box;
    display: inline-block;
    background-color: #fff;
    border-radius: 100%;
    border: 1px solid #C9C9C9;
    position: relative;
    width: 20px;
    height: 20px;
    margin: 0 0.3em;
    vertical-align: middle;
    &:before {
      display: none;
    }
    &:after {
      content: " ";
      border-radius: 100%;
      top: 5px;
      left: 5px;
      position: absolute;
      width: 8px;
      height: 8px;
    }
  }
}

.weui-check {
  .weui-cells_radio & {
    &:checked {
      & + .weui-icon-checked {
        background-color: #09BB07;
        border-color: #09BB07;
        &:after {
          background-color: #fff;
        }
        &:before {
          display: none;
        }
      }
    }
  }
}
.spd-input-inner {
  display: flex;
}

</style>
