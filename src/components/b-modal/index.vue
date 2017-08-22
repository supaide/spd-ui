<template>
<div v-transfer-dom  class="modal fade">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{title}}</h5>
        <button v-if="hasClose" type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
      <div class="modal-footer">
        <button v-if="ok" type="button" class="btn btn-primary" @click="process">{{ok}}</button>
        <button v-if="cancel" type="button" class="btn btn-secondary" data-dismiss="modal">{{cancel}}</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import TransferDom from '../../directives/transfer-dom/index.js' 
export default {
  directives: {
    TransferDom
  },
  props: {
    size: String,
    title: String,
    hasClose: {
      type: Boolean,
      default: true
    },
    ok: {
      type: String,
      default: '确定'
    },
    cancel: {
      type: String,
      default: '取消'
    },
    processer: Function 
  },
  mounted () {
    $(this.$el).on('show.bs.modal', () => {
      this.$emit('on-show')
    })
    $(this.$el).on('hide.bs.modal', () => {
      this.$emit('on-hide')
    })
  },
  methods: {
    show () {
      $(this.$el).modal('show')
    },
    hide () {
      $(this.$el).modal('hide')
    },
    process () {
      if (this.processer) {
        this.processer()
      } else {
        this.hide()
      }
    }
  }
}
</script>
