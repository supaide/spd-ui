<script>
import {picker, datePicker} from '../../components/picker/picker.js'

export default {
  methods: {
    picker () {
      return picker.apply(this, arguments)
    },
    datePicker () {
      return datePicker.apply(this, arguments)
    }
  }
}
</script>
<style lang="less">
@import '../../style/weui/widget/weui-tips/weui-mask.less';
@import '../../style/weui/widget/weui-picker/weui-picker.less';
@import '../../style/weui/widget/weui-animate/weui-animate.less';
</style>
