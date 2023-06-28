<template>
  <div>
    <h2>孙组件</h2>
    <p>Project/Inject传值：{{ provideValue }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

export default defineComponent({
  setup() {
    const provideValue = inject<string>('provide');
    return {
      provideValue
    };
  },
});
</script>