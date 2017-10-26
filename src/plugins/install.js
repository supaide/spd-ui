import dialog from './dialog/index.vue'
import picker from './picker/index.vue'

let init = function (Vue, target, component) {
  let c = Vue.extend(component)
  let vm = new c()
  vm.$destroy()

  Object.keys(component.methods).forEach(function (method) {
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
    let components = [dialog, picker]
    components.forEach(function (component) {
      init(Vue, target, component)
    })
  }
}
