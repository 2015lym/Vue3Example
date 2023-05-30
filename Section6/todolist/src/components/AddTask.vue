<template>
  <div class="add-task">
    <input type="text" v-model="taskTitle" @keyup.enter="addTask" placeholder="Enter task title" />
    <button @click="addTask">添加</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'AddTask',
  setup(_, { emit }) {
    const taskTitle = ref('');

    function addTask() {
      if (taskTitle.value.trim()) {
        emit('addTask', taskTitle.value.trim());
        taskTitle.value = '';
      }
    }
    return {
      taskTitle,
      addTask,
    };
  },
});
</script>

<style scoped>
.add-task {
  display: flex;
  align-items: center;
  margin: 16px;
  width: 280px;
}

input {
  flex-grow: 1;
  margin-right: 16px;
}
</style>
