<template>
  <div>
    <h2>父组件</h2>
    <p>当前消息：{{ message }}</p>
    <button @click="changeMessage">发送消息</button>
    <ChildComponent :message="message" @eventMessage="handleEventMessage" />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import bus from '@/event-bus';

export default {
  setup() {
    const message = ref('无');
    const changeMessage = () => {
      message.value = '父组件发出了新消息!';
      bus.emit('event', 'Hello, World!');
    };
    const handleEventMessage = (messageValue: string) => {
      message.value = messageValue;
    };
    return {
      message,
      changeMessage,
      handleEventMessage,
    };
  },
};
</script>