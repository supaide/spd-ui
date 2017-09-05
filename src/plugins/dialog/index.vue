<script>
import dialog0 from '../../components/dialog/dialog.js'
import alert0 from '../../components/alert/alert.js'
import toast0 from '../../components/toast/toast.js'
import confirm0 from '../../components/confirm/confirm.js'
import loading0 from '../../components/loading/loading.js'

export default {
  methods: {
    toast () {
      return toast0.apply(this, arguments)
    },
    alert () {
      return alert0.apply(this, arguments)
    },
    confirm () {
      return confirm0.apply(this, arguments)
    },
    loading () {
      return loading0.apply(this, arguments)
    }
  }
}
</script>
<style lang="less">
@import '../../style/weui/widget/weui-tips/weui-mask.less';
@import '../../style/weui/widget/weui-tips/weui-dialog.less';
@import '../../style/weui/widget/weui-tips/weui-toast.less';
@import '../../style/weui/widget/weui-loading/weui-loading.less';
</style>
