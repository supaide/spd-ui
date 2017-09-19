import dialog from './index.vue'

let installed = false
export default {
  install (Vue, target) {
    if (installed) {
      return
    }
    installed = true
    target = target || window
    Object.keys(dialog.methods).forEach(function (method) {
      target[method] = dialog.methods[method]
    })
    // 为了加载样式文件，先实例化dialog，再destroy
    let dialog0 = Vue.extend(dialog)
    let vm = new dialog0()
    vm.$destroy()
  }
}
