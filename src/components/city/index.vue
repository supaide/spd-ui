<template>
<div class="spd-city-selector">
  <span @click="show=!show"></span>
  <span @click="show=!show">{{placeholder}}</span>
  <div class="spd-city-container" ref='container' v-show="show">
    <div class="spd-city-header">
      <div class="spd-city-confirm">{{confirm||'确定'}}</div>
      <ul>
        <li data-level='1'>省份</li>
        <li data-level='2'>城市</li>
        <li data-level='3'>区县</li>
      </ul>
    </div>
    <div class="spd-city-bodys">
      <div class="spd-city-body">
        <ul data-level="1">
          <li data-code="100000">北京</li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props: {
    placeholder: String,
    confirm: String
  },
  data () {
    return {
      show: false
    }
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.container.setAttribute('id', 'city-'+this._uid)
      let pos = this.$el.getBoundingClientRect()
      //this.$refs.container.style.left = pos.left + 'px'
      this.$refs.container.style.top = this.$el.offsetHeight + 'px'
      console.log(this.$el.offsetHeight )
    })
  }
}
</script>
<style lang="less">
.spd-city-selector {
  user-select: none;
  cursor: pointer;
  position: relative;
  display: inline-block;
  >span:nth-child(2) {
    color: #757575;
  }
}
.spd-city-container {
  position: absolute;
  margin-bottom: 30px;
  z-index: 100;
  min-width: 410px;
  background: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 1px 25px rgba(0, 0, 0, 0.3);
}
.spd-city-header {
  background: #f0f0f0;
  border-bottom: 1px solid #ccc;
  font-size: 13px;
  height: 36px;
  position: relative;
  .spd-city-confirm {
    position: absolute;
    top: 6px;
    right: 10px;
    height: 25px;
    line-height: 25px;
    background: #d73925;
    padding: 0 5px;
    border-radius: 3px;
    cursor: pointer;
    color: #fff;
    display: none;
  }
  li {
    text-decoration: none;
    color: #4d4d4d;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 14px;
    padding: 8px 22px 7px 22px;
    text-align: center;
    display: inline-block;
  }
}
.spd-city-bodys {
  padding: 5px;
  ul {
    min-height: 1310px;
    overflow-y: auto;
    margin-top: 10px;
    padding-left: 5px;
  }
  li {
    display: inline-block;
    width: 96px;
    box-sizing: border-box;
    padding: 8px 8px;
    cursor: pointer;
    border: 1px solid #ccc;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    float: left;
    text-align: center;
    margin-top: -1px;
    margin-left: -1px;
  }
  .spd-city-body li:nth-child(1) {
    margin-top: 0px;
  }
}
</style>
