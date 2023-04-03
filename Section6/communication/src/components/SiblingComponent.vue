<template>
  <div>
    <h2>兄弟组件</h2>
    <p>当前消息：{{ state.message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
import bus from '@/event-bus';

export default defineComponent({
  setup() {
    let state = reactive({
      message: '',
    });
    onMounted(() => {
      bus.on('event', (msg): void => {
        console.log('兄弟组件收到消息');
        state.message = msg as string;
      });
    });
    return {
      state
    };
  },
});
</script>