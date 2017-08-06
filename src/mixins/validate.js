import alert from '../components/alert/alert.js'
import {Validate} from 'spd-webutil'
export default {
  props: {
    validator: String,
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      warn: false,
      currentValue: '',
      validators: [],
      error: ''
    }
  },
  created () {
    this.currentValue = this.value
    if (this.validator) {
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
        this.validators.push([func, params, error])
      }
    }
  },
  methods: {
    validate (ignoreEmpty) {
      if (this.validators.length < 1) {
        return true
      }
      let status = true, error
      let value = this.currentValue
      if (typeof value === 'object') {
        if (typeof value.length === 'undefined') {
          return true
        } else {
          if (value.length > 0) {
            value = value[value.length-1]
          } else {
            value = ''
          }
        }
      }
      for (let i=0; i<this.validators.length; i++) {
        let validate = this.validators[i]
        if (!Validate(validate[0], value, validate[1], ignoreEmpty)) {
          status = false
          error = validate[2]
          break
        }
      }
      if (!status) {
        if (!error) {
          error = this.title + '不正确'
        }
        this.error = error
        this.warn = true
      } else {
        this.warn = false
        this.error = ''
      }
      return status
    },
    validates (showError) {
      let status = true, errors = [], indexs = []
      for (let i=0; i<this.$children.length; i++) {
        if (typeof this.$children[i].validate === 'function') {
          if(!this.$children[i].validate(false)) {
            status = false
            if (this.$children[i].error) {
              errors.push(this.$children[i].error)
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
    }

  }
}
