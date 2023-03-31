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
      message: '123',
    });
    onMounted(() => {
      bus.on('event', (msg:string):void => {
        console.log('event received');
        state.message = msg;
      });
    });
    

    return {
      state
    };
  },
});
</script>