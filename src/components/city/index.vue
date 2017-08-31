<template>
<div class="spd-city-selector" v-click-outside="onClickedOutside">
  <div v-if="hideText" @click="toggle"><slot name="label"></slot></div>
  <span v-if="!hideText" @click="toggle" v-show="text && text.length>0">{{text}}</span>
  <span v-if="!hideText" @click="toggle" v-show="!text">{{placeholder}}</span>
  <div class="spd-city-container" ref='container' v-show="show">
    <div class="spd-city-header">
      <div class="spd-city-confirm" v-show="confirm0" @click="onConfirm">{{confirmText||'确定'}}</div>
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
import clone from 'clone'
import ClickOutside from '../../directives/click-outside'
export default {
  directives: {
    ClickOutside
  },
  props: {
    sep1: {
      type: String,
      default: '／'
    },
    sep2: {
      type: String,
      default: ','
    },
    hideText: Boolean,
    value: [String, Number, Boolean, Array],
    multi: Boolean,
    multiLevel: Number,
    placeholder: String,
    confirm: Boolean,
    confirmText: String,
    headers: Array,
    items: Array,
    loader: Function,
    leftOffset: Number
  },
  data () {
    return {
      show: false,
      text: '',
      items0: this.items,
      displayItems: [],
      multiLevel0: this.multiLevel,
      confirm0: this.confirm,

      preLevel: 1,
      preIndexs: [],
      preValues: [],
      currentLevel: 1,
      currentIndexs: [],
      currentValues: [],
      currentValue: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.container.setAttribute('id', 'city-'+this._uid)
      let pos = this.$el.getBoundingClientRect()
      this.$refs.container.style.top = this.$el.offsetHeight + 'px'
    })
    for (let i=0; i<this.headers.length; i++) {
      this.currentIndexs.push([])
      this.currentValues.push([])
    }
    if (this.multi && this.multiLevel === undefined) {
      this.multiLevel0 = this.currentIndexs.length
    }
  },
  methods: {
    onClickedOutside () {
      this.show = false
    },
    headChange (level) {
      this.render(level)
    },
    /**
     1、单选，
       a、非最后一级，跳转到下一级
       b、是最后一级或者无下一级
         a)、需要确认，返回，等待确认再hide
         b)、不需要确认，hide
     2、多选
       a、if before multiLevel
         a)、有下一级，跳转到下一级
         b)、无下一级，返回，等待确认再hide
       b、else
         a)、当前已多选，返回，等待确认再hide，下一级不可点开
         b)、当前只选了一个，返回，等待确认再hide或点开下一级header
     */
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
      for (let i=level-1; i<this.headers.length; i++) {
        this.currentIndexs[i] = []
        this.currentValues[i] = []
      }
      this.confirm0 = false
      if (this.multi) {
        if (level >= this.multiLevel0) {
          if (adcodes[adcode]) {
            delete adcodes[adcode]
          } else {
            adcodes[adcode] = index
          }
          for (let adcode in adcodes) {
            this.currentIndexs[level-1].push(adcodes[adcode])
            this.currentValues[level-1].push(adcode)
            $lis[adcodes[adcode]].classList.add('selected')
          }
          this.confirm0 = this.currentIndexs[level-1].length > 0
          this.text = this.getText()
          return
        }
      }
      adcodes = {}
      adcodes[adcode] = index
      $lis[index].classList.add('selected')
      this.currentIndexs[level-1].push(index)
      this.currentValues[level-1].push(adcode)
      let childs = this.items0
      for (let i=0; i<level; i++) {
        if (i<level-1) {
          childs = childs[this.currentIndexs[i][0]].childs
        } else {
          childs = childs[index].childs
        }
      }
      if (!childs) {
        if (!this.confirm) {
          this.onConfirm()
        }
        this.text = this.getText()
        return
      }
      this.currentLevel = level+1
      this.displayItems = childs
      this.text = this.getText()
    },
    onConfirm () {
      this.preValues = clone(this.currentValues)
      this.preIndexs = clone(this.currentIndexs)
      this.preLevel = clone(this.currentLevel)
      this.show = false
    },
    render (level, reset) {
      if (window.innerWidth <= 768) {
        let container = this.$refs.container
        container.style.left = this.leftOffset ? (0-this.leftOffset)+'px' : '-100px'
      }
      level = level - 0
      if (this.currentIndexs[level-2] && this.currentIndexs[level-2].length>1) {
        return
      }
      let childs = this.items0
      for (let i=0; i<level-1; i++) {
        if (this.currentIndexs[i].length < 1) {
          return
        }
        childs = childs[this.currentIndexs[i][0]].childs
      }
      if (reset) {
        this.preValues = clone(this.currentValues)
        this.preIndexs = clone(this.currentIndexs)
        this.preLevel = clone(this.currentLevel)
      }
      this.currentLevel = level
      this.confirm0 = this.multi && this.multiLevel0 <= this.currentLevel && this.currentIndexs[this.currentLevel-1].length>0
      this.displayItems = childs
      this.$nextTick(()=>{
        let $lis = document.querySelectorAll('.spd-city-body li')
        for(let i=0; i<$lis.length; i++) {
          let adcode = $lis[i].getAttribute('data-adcode')
          if (this.currentValues[level-1].length > 0 && this.currentValues[level-1].indexOf(adcode) > -1) {
            $lis[i].classList.add('selected')
          } else {
            $lis[i].classList.remove('selected')
          }
        }
      })
    },
    toggle () {
      if (!this.show) {
        if (!this.items0 || this.items0.length < 1) {
          if (this.loader) {
            this.loader((items) => {
              this.items0 = items
              this.render(this.currentLevel, true)
              this.show = true
            })
          }
          return
        }
      }
      this.show = !this.show
    },
    getLevelValue (value, level) {
      value = value + ''
      let len = value.length, blockSize = len/this.headers.length
      let value0 = value.substr(0, level * blockSize)
      for (let i=value0.length; i<len; i++) {
        value0 += '0'
      }
      return value0
    },
    setValue (value, text, notEmit) {
      value = [].concat(value)
      if (this.items0.length < 1) {
        this.currentValue = value
        if (text) {
          this.text = text
        }
        return
      }
      let newValues = []
      let newIndexs = []
      let newLevel = []
      for (let i=0; i<value.length; i++) {
        let childs = this.items0
        let values = []
        let indexs = []
        let level = -1
        for (let j=0; j<this.headers.length; j++) {
          let value0 = this.getLevelValue(value[i], j+1)
          let index = -1
          for (let k=0; k<childs.length; k++) {
            if (childs[k].adcode == value0) {
              index = k
              break
            }
          }
          if (index<0) {
            break
          }
          childs = childs[index].childs
          values.push(value0)
          indexs.push(index)
          level = j + 1
        }
        if (level >= 0) { 
          newValues.push(values)
          newIndexs.push(indexs)
          newLevel.push(level)
        }
      }
      if (newValues.length < 1) {
        this.currentIndexs = []
        this.currentValues = []
        this.currentLevel = 1
        this.currentValue = []
        this.text = this.defaultLabel
        for (let i=0; i<this.headers.length; i++) {
          this.currentIndexs.push([])
          this.currentValues.push([])
        }
        this.preValues = clone(this.currentValues)
        this.preIndexs = clone(this.currentIndexs)
        if (!notEmit) {
          this.$emit('input', this.currentValue)
        }
        return
      }
      for (let i=0; i<newValues.length; i++) {
        if (newLevel[i] !== newLevel[0]) {
          return
        }
        for (let j=0; j<newLevel[0]-1; j++) {
          if (newValues[i][j] != newValues[0][j]) {
            // 父级节点必须一致
            return
          }
        }
      }
      this.currentValues = []
      this.currentIndexs = []
      for (let i=0; i<newLevel[0]-1; i++) {
        this.currentValues.push([newValues[0][i]])
        this.currentIndexs.push([newIndexs[0][i]])
      }
      this.currentLevel = newLevel[0]
      let values1 = [], indexs1 = []
      this.currentValue = []
      for (let i=0; i<newValues.length; i++) {
        values1.push(newValues[i][this.currentLevel-1])
        indexs1.push(newIndexs[i][this.currentLevel-1])
        this.currentValue.push(newValues[i][this.currentLevel-1])
      }
      this.currentValues.push(values1)
      this.currentIndexs.push(indexs1)
      this.preValues = clone(this.currentValues)
      this.preIndexs = clone(this.currentIndexs)
      this.text = this.getText()
    },
    getText (notJoin) {
      let childs = this.items0
      let items = []
      for (let i=0; i<this.currentLevel; i++) {
        items.push([])
        let len = this.currentIndexs[i].length
        for (let j=0; j<len; j++) {
          items[i].push(childs[this.currentIndexs[i][j]])
        }
        if (len != 1) {
          break
        }
        if (len < 1) {
          break
        }
        childs = childs[this.currentIndexs[i][0]].childs
      }
      let texts = []
      for (let i=0; i<items.length; i++) {
        let texts2 = []
        for (let j=0; j<items[i].length; j++) {
          texts2.push(items[i][j].name)
        }
        texts.push(texts2.join(this.sep2))
      }
      if (notJoin) {
        return texts
      } else {
        return texts.join(this.sep1)
      }
    },
    hide () {
      this.currentValues = clone(this.preValues)
      this.currentIndexs = clone(this.preIndexs)
      this.currentLevel = clone(this.preLevel)
      this.text = this.getText()
      let values = this.currentValues[this.currentLevel-1]
      this.currentValue = [].concat(values)
      if (!this.multi) {
        values = values.pop()
      }
      this.$emit('input', values)
    }
  },
  watch: {
    show (val) {
      if (!val) {
        this.hide()
      } else {
        this.render(this.currentLevel, true)
      }
    },
    value (val) {
      this.setValue(val, '', true)
    },
    items (val) {
      this.items0 = val
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
