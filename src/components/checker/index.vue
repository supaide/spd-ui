<template>
<cell nodeType="label" class="spd-check" :class="checkbox ? 'spd-checkbox' : 'spd-radio'">
  <span slot="label" class="spd-check-label">
    <input type="radio" :name="name" ref="input">
    <span class="spd-input"></span>
  </span>
  <slot></slot>
</cell>
</template>
<script>
import Cell from '../cell/index.vue'
export default {
  components: {
    Cell
  },
  props: {
    name: String,
    value: null,
    checkbox: Boolean,
  },
  created () {
    if (this.checkbox) {
      this.$nextTick(() => {
        this.$refs.input.setAttribute('type', 'checkbox')
      })
    }
  } 
}
</script>
<style lang="less">
.spd-check {
  input {
    display: none;
  }
}
.spd-check-label {
  display: flex;
  margin-right: 5px;
}
.spd-input {
  box-sizing: border-box;
  display: inline-block;
  background-color: #fff;
  border: 1px solid #ccc;
  position: relative;
  width: 16px;
  height: 16px;
  vertical-align: middle;
  &:after {
    content: " ";
    border: 2px solid transparent;
    border-left: 0;
    border-top: 0;
    position: absolute;
  }
}
.spd-radio .spd-input {
  border-radius: 100%;
  &:after {
    border-radius: 100%;
    top: 3px;
    left: 3px;
    width: 6px;
    height: 6px;
    transform: scale(0);
  }
}
.spd-checkbox .spd-input {
  border-radius: 5px;
  &:after {
    top: 1px;
    left: 4px;
    width: 4px;
    height: 7px;
  }
}
.spd-check-label input:checked + .spd-input {
  background-color: #26a2ff;
  border-color: #26a2ff;
}
.spd-radio input:checked + .spd-input {
  &:after {
    background-color: #fff;
    transform: scale(1);
  }
}
.spd-checkbox input:checked + .spd-input { 
  &:after {
    border-color: #fff;
    transform: rotate(45deg) scale(1);
  }
}
</style>
