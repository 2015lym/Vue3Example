<template>
  <div>
    <h2>子组件</h2>
    <p>当前消息：{{ message }}</p>
    <button @click="sendMessage">发送消息</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const sendMessage = () => {
      const message = '子组件发出了新消息!';
      emit('eventMessage', message);
    };
    return {
      sendMessage,
    };
  },
});
</script>