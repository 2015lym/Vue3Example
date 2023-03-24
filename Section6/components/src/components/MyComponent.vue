<script lang="ts">
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
  }
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