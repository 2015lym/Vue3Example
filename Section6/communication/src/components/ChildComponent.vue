<template>
  <div>
    <h2>子组件</h2>
    <p>当前消息：{{ message }}</p>
    <button @click="sendMessage">发送消息</button>
    <GrandsonComponent />
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';
const props = defineProps({
  message: {
    type: String,
    required: true
  }
})
const message = toRefs(props)
const emit = defineEmits(['eventMessage'])
const sendMessage = () => {
  const message = '子组件发出了新消息!';
  emit('eventMessage', message);
};
// return {
//   sendMessage,
// };
</script>