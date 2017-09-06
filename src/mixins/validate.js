import alert from '../components/alert/alert.js'
import {Validate} from 'spd-webutil'

let validateKeys = ['value', 'currentValue']

export default {
  props: {
    validator: String,
    warnKey: {
      type: String,
      default: 'warn'
    },
    defaultError: {
      type: String,
      default: '不正确'
    },
    validateKey: String
  },
  data () {
    return {
      __validators: [],
      __error: '',
      __validateKey: ''
    }
  },
  created () {
    if (!this.validator) {
      return
    }
    let vs = this.validator.split(';')
    for (let i=0; i<vs.length; i++) {
      vs[i] = vs[i].trim()
      if (!vs[i]) {
        continue
      }
      let func, params=[], error
      vs[i] = vs[i].split('|')
      let tmp = vs[i][0].trim()
      if (vs[i].length > 1) {
        error = vs[i][1].trim()
      }
      if (!error && (this.title || this.label || this.placeholder)) {
        error = (this.title || this.label || this.placeholder) + '有误'
      }
      let pos = tmp.indexOf('(')
      if (pos >= 0) {
        func = tmp.substr(0, pos).trim()
        tmp = tmp.substr(pos+1, tmp.length-pos-2).split(',')
        for (let j=0; j<tmp.length; j++) {
          tmp[j] = tmp[j].trim()
          if (tmp[j]) {
            params.push(tmp[j])
          }
        }
      } else {
        func = tmp
      }
      this.$data.__validators.push([func, params, error])
    }
    let dataKeys = Object.keys(this.$data)
    dataKeys = dataKeys.concat(Object.keys(this.$props))
    if (this.validateKey) {
      this.$data.__validateKey = this.validateKey
    } else {
      for (let i=0; i<validateKeys.length; i++) {
        if (dataKeys.indexOf(validateKeys[i]) > -1) {
          this.$data.__validateKey = validateKeys[i]
          break
        }
      }
    }
    if (this.$data.__validateKey) {
      this.$watch(function () {
        if(dataKeys.indexOf(this.$data.__validateKey) > -1) {
          return this.$data[this.$data.__validateKey]
        } else {
          return this.$props[this.$data.__validateKey]
        }
      }, function (val) {
        this.validate(true)
      })
    }
  },
  methods: {
    validate (ignoreEmpty, showError) {
      if (this.$data.__validators.length < 1) {
        return true
      }
      let status = true, error
      let value
      let dataKeys = Object.keys(this.$data)
      if (dataKeys.indexOf(this.$data.__validateKey) > -1) {
        value = this.$data[this.$data.__validateKey]
      } else {
        value = this.$props[this.$data.__validateKey]
      }
      for (let i=0; i<this.$data.__validators.length; i++) {
        let validate = this.$data.__validators[i]
        if (!Validate(validate[0], value, validate[1], ignoreEmpty)) {
          status = false
          error = validate[2]
          break
        }
      }
      if (!status) {
        if (!error) {
          let title = this.$data.title || this.$data.label || ''
          error = title + this.defaultError
        }
        this.$data.__error = error
        this.$data[this.warnKey] = true
        if (showError) {
          alert(error, () => {
            if (this.focus === 'function') {
              this.focus()
            } else {
              let rect = this.$parent.$el.getBoundingClientRect()
              document.querySelector('.page-view').scrollTop = rect.top + document.querySelector('.page-view').scrollTop - 50
            }
          })
        }
      } else {
        this.$data[this.warnKey] = false
        this.$data.__error = ''
      }
      return status
    },
    validates (showError) {
      let status = true, errors = [], indexs = []
      for (let i=0; i<this.$children.length; i++) {
        if (typeof this.$children[i].validate === 'function') {
          if(!this.$children[i].validate(false)) {
            status = false
            if (this.$children[i].$data.__error) {
              errors.push(this.$children[i].$data.__error)
              indexs.push(i)
            }
          }
        }
      }
      if (!status && showError) {
        let target = this.$children[indexs[0]]
        alert(errors[0], function () {
          if (typeof target.focus === 'function') {
            target.focus()
          } else {
            let rect = this.$parent.$el.getBoundingClientRect()
            document.querySelector('.page-view').scrollTop = rect.top + document.querySelector('.page-view').scrollTop - 50
          }
        })
      }
      return [status, indexs, errors]
    },
    validate4Groups (groups, showError) {
      for (let i=0; i<groups.length; i++) {
        let s = groups[i].validates(showError)
        if (!s[0]) {
          return s
        }
      }
      return [true]
    },
    validateRefs (showError) {
      let ok = true, status={}
      let refKeys = Object.keys(this.$refs)
      for (let i=0; i<refKeys.length; i++) {
        if (this.$refs[refKeys[i]].validate) {
          if (!this.$refs[refKeys[i]].validate(false, showError)) {
            ok = false
            status[refKeys[i]] = false
          }
        }
      }
      return [ok, status]
    }

  }
}
