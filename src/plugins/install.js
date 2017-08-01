import {$, util} from 'spd-webutil'
import dialog from './dialog/index.vue'
import picker from './picker/index.vue'

let init = function (Vue, target, component) {
  let c = Vue.extend(component)
  let vm = new c()
  vm.$destroy()

  util.each(component.methods, function (method) {
    target[method] = component.methods[method]
  })
}

let installed = false
export default {
  install (Vue, target) {
    if (installed) {
      return
    }
    installed = true
    $([dialog, picker]).forEach(function (component) {
      init(Vue, target, component)
    })
  }
}
