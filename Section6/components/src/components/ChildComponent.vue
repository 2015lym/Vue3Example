<script lang="ts">
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, onActivated, onDeactivated, onErrorCaptured } from 'vue';


export default {
  setup(props, context) {
    console.log('setup')
    onBeforeMount(() => {
      console.log('onBeforeMount 子组件即将挂载到页面');
    });
    onMounted(() => {
      console.log('onMounted 子组件已经挂载到页面');
    });
    onBeforeUpdate(() => {
      console.log('onBeforeUpdate 子组件即将更新');
    });
    onUpdated(() => {
      console.log('onUpdated 子组件已经更新');
    });
    onBeforeUnmount(() => {
      console.log('onBeforeUnmount 子组件即将卸载');
    });
    onUnmounted(() => {
      console.log('onUnmounted 子组件已经卸载');
    });
    onActivated(() => {
      console.log('onActivated 子组件被激活');
    });
    onDeactivated(() => {
      console.log('onDeactivated 子组件被停用');
    });
    onErrorCaptured((error, vm, info) => {
      console.log('onErrorCaptured')
      console.error('捕获到错误：', error);
      console.error('错误信息：', info);
    });
    return {}
  },
}
</script>

<template>
  <div>
    我是子组件
  </div>
</template>

<style>
</style>

