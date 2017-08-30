<template>
<div class="spd-city-selector" v-click-outside="onClickedOutside">
  <span @click="toggle" v-show="text && text.length>0">{{text}}</span>
  <span @click="toggle" v-show="!text">{{placeholder}}</span>
  <div class="spd-city-container" ref='container' v-show="show">
    <div class="spd-city-header">
      <div class="spd-city-confirm">{{confirmText||'确定'}}</div>
      <ul>
        <li :data-level="index+1" v-for="(head, index) in headers" :key="index" :class="{active: currentLevel==index+1}" @click="headChange(index+1)">{{head}}</li>
      </ul>
    </div>
    <div class="spd-city-body clearfix">
      <transition-group name="list-complete" tag="ul" class="clearfix">
        <li :data-adcode="item.adcode" class="list-complete-item" v-for="(item, index) in displayItems" :key="item.adcode" @click="selCity(item.adcode, item.level, index)">{{item.name}}</li>
      </transition-group>
    </div>
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
    value: [String, Number, Boolean, Array],
    multi: Boolean,
    multiLevel: Number,
    placeholder: String,
    confirm: Boolean,
    confirmText: String,
    headers: Array,
    items: Array,
    loader: Function,
  },
  data () {
    return {
      show: false,
      text: '',
      items0: this.items,
      displayItems: [],

      preLevel: 1,
      preIndex: [],
      preValue: [],
      currentLevel: 1,
      currentIndex: [],
      currentValue: [],
    }
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.container.setAttribute('id', 'city-'+this._uid)
      let pos = this.$el.getBoundingClientRect()
      this.$refs.container.style.top = this.$el.offsetHeight + 'px'
    })
  },
  methods: {
    onClickedOutside () {
      this.show = false
    },
    headChange (level) {
      this.render(level)
    },
    selCity(adcode, level, index) {
      level = level - 0
      let $lis = document.querySelectorAll('.spd-city-body li')
      let adcodes = {}
      for (let i=0; i<$lis.length; i++) {
        if ($lis[i].classList.contains('selected')) {
          adcodes[$lis[i].getAttribute('data-adcode')] = i
          $lis[i].classList.remove('selected')
        }
      }
      if (this.multi) {
        
      } else {
        adcodes = {}
        adcodes[adcode] = index
        $lis[index].classList.add('selected')
        this.currentIndex[level-1] = index
        this.currentValue[level-1] = {}
        this.currentValue[level-1][adcode] = 1
      }
      let childs = this.items0
      for (let i=0; i<level; i++) {
        if (i<level-1) {
          childs = childs[this.currentIndex[i]].childs
        } else {
          childs = childs[index].childs
        }
      }
      if (!childs) {
        this.preValue = this.currentValue
        this.preIndex = this.currentIndex
        this.preLevel = this.currentLevel
        this.show = false
        return
      }
      this.currentLevel = level+1
      this.displayItems = childs
    },
    render (level) {
      if (this.currentIndex.length < 1) {
        for (let i=0; i<this.headers.length; i++) {
          this.currentIndex.push(-1)
          this.currentValue.push({})
        }
      }
      if (level === undefined) {
        level = this.currentLevel
        if (window.innerWidth <= 768) {
          let container = this.$refs.container
          container.style.left = ((340 - window.innerWidth) / 2) + 'px'
        }
      }
      level = level - 0
      let childs = this.items0
      for (let i=0; i<level-1; i++) {
        childs = childs[this.currentIndex[i]].childs
      }
      this.currentLevel = level
      this.displayItems = childs
      this.$nextTick(()=>{
        let $lis = document.querySelectorAll('.spd-city-body li')
        for(let i=0; i<$lis.length; i++) {
          let adcode = $lis[i].getAttribute('data-adcode')
          if (this.currentValue[level-1][adcode]) {
            $lis[i].classList.add('selected')
          } else {
            $lis[i].classList.remove('selected')
          }
        }
      })
    },
    toggle () {
      if (!this.show) {
        if (!this.items || this.items.length < 1) {
          if (this.loader) {
            this.loader((items) => {
              this.items0 = items
              this.render()
              this.show = true
            })
          }
        }
        return
      }

      this.show = !this.show
    },
    getFullValues (values) {
      if (values === undefined) {
        values = this.currentValue
      }
    },
    hide () {
      this.currentValue = this.preValue
      this.currentIndex = this.preIndex
      this.currentLevel = this.preLevel
      let childs = this.items0
      let texts = []
      let items = []
      for (let i=0; i<this.preLevel; i++) {
        items.push(childs[this.preIndex[i]])
        childs = childs[this.preIndex[i]].childs
      }
      for (let i=0; i<items.length; i++) {
        texts.push(items[i].name) 
      }
      this.text = texts.join('／')
      this.$emit('input', this.text)
    }
  },
  watch: {
    show (val) {
      if (!val) {
        this.hide()
      }
    },
    value (val) {
      console.log('-----')
      console.log(val+'==')
    }
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
  background: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 1px 25px rgba(0, 0, 0, 0.3);
}
.spd-city-header {
  li.active {
    background: rgb(255, 255, 255);
    border-bottom: 1px solid rgb(255, 255, 255);
  }
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
.spd-city-body {
  padding: 15px 15px 30px;
  max-height: 400px;
  overflow-y: auto;
  ul {
    min-width: 404px;
    margin: auto;
  }
  li {
    display: inline-block;
    min-width: 102px;
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
    font-size: 12px;
  }
  li:hover, li.selected {
    background: #46a4ff;
    color: #fff;
    border-radius: 3px;
  }
}
.list-complete-item {
  transition: all .5s;
  display: inline-block;
}
.list-complete-enter, .list-complete-leave-to
{
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}

@media (max-width: 768px) {
  .spd-city-body ul {
    width: 303px;
    min-width: 100px;
  }
}
</style>
