<script lang="ts">
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, onActivated, onDeactivated, onErrorCaptured } from 'vue';


export default {
  data() {
    return {
      text: '',
      displayText: ''
    }
  },
  methods: {
    showText() {
      this.displayText = this.text
    }
  },
  setup(props, context) {
    console.log('setup')
    onBeforeMount(() => {
      console.log('onBeforeMount 组件即将挂载到页面');
    });
    onMounted(() => {
      console.log('onMounted 组件已经挂载到页面');
    });
    onBeforeUpdate(() => {
      console.log('onBeforeUpdate 组件即将更新');
    });
    onUpdated(() => {
      console.log('onUpdated 组件已经更新');
    });
    onBeforeUnmount(() => {
      console.log('onBeforeUnmount 组件即将卸载');
    });
    onUnmounted(() => {
      console.log('onUnmounted 组件已经卸载');
    });
    onActivated(() => {
      console.log('onActivated 组件被激活');
    });
    onDeactivated(() => {
      console.log('onDeactivated 组件被停用');
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
    <input v-model="text" />
    <button @click="showText">显示</button>
    <div v-if="displayText">{{ displayText }}</div>
  </div>
</template>

<style>
button {
  margin-left: 10px;
}
</style>

