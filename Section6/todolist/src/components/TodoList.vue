<template>
  <div>
    <AddTask @addTask="addTask" />
    <div class="container">
      <TodoItem header="Todo" :items="items.filter(item => item.status === 'todo')" :onDragStart="onDragStart" :onDrop="() => onDrop('todo')" />
      <TodoItem header="Doing" :items="items.filter(item => item.status === 'doing')" :onDragStart="onDragStart" :onDrop="() => onDrop('doing')" />
      <TodoItem header="Done" :items="items.filter(item => item.status === 'done')" :onDragStart="onDragStart" :onDrop="() => onDrop('done')" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import AddTask from './AddTask.vue';
import TodoItem from './TodoItem.vue';

interface Item {
  id: number;
  title: string;
  status: 'todo' | 'doing' | 'done';
}

export default ({
  name: 'TaskBoard',
  components: {
    AddTask,
    TodoItem,
  },
  setup() {
    const items = ref<Item[]>([
      { id: 1, title: '任务 1', status: 'todo' },
      { id: 2, title: '任务 2', status: 'todo' },
      { id: 3, title: '任务 3', status: 'doing' },
      { id: 4, title: '任务 4', status: 'done' },
    ]);
    const onDragStart = (item: Item) => {
      event?.dataTransfer?.setData('item', JSON.stringify(item));
    };
    const onDrop = (status: 'todo' | 'doing' | 'done') => {
      const item = JSON.parse(event?.dataTransfer?.getData('item') || '{}');
      item.status = status;
      const index = items.value.findIndex(element => element.id === item.id);
      if (index !== -1) {
        items.value[index] = item;
      }
    };
    function addTask(title: string) {
      items.value.push({
        id: Date.now(),
        title,
        status: 'todo',
      });
    }
    return {
      items,
      onDragStart,
      onDrop,
      addTask
    };
  },
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: flex-start;
  width: 100%;
}

</style>
