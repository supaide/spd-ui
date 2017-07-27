<template>
  <div class="vue-ui-spinner-double-bounce" :style="{
      width: spinnerSize,
      height: spinnerSize
    }">
    <div class="vue-ui-spinner-double-bounce-bounce1" :style="{ backgroundColor: spinnerColor }"></div>
    <div class="vue-ui-spinner-double-bounce-bounce2" :style="{ backgroundColor: spinnerColor }"></div>
  </div>
</template>

<script>
  import common from './common.vue';

  export default {
    name: 'double-bounce',

    mixins: [common]
  };
</script>

<style lang="less">
.vue-ui-spinner-double-bounce {
  box-sizing: border-box;
  position: relative;
  .vue-ui-spinner-double-bounce-bounce1, .vue-ui-spinner-double-bounce-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;

    animation: vue-ui-spinner-double-bounce 2.0s infinite ease-in-out;
  }
  .vue-ui-spinner-double-bounce-bounce2 {
    animation-delay: -1.0s;
  }
}

@keyframes vue-ui-spinner-double-bounce {
  0%, 100% {
    transform: scale(0.0);
  }

  50% {
    transform: scale(1.0);
  }
}
</style>
