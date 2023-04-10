<template>
  <div class="container">
    <div class="list" @dragover.prevent @drop="onDrop('todo')">
      <div class="list-header">Todo</div>
      <div class="add-task">
      <input type="text" v-model="newTask" placeholder="Add new task" />
      <button @click="addTask">Add</button>
    </div>
      <ul>
        <li v-for="item in todo" :key="item.id" class="list-item" draggable="true" @dragstart="onDragStart(item)">
          {{ item.title }}
        </li>
      </ul>
    </div>
    <div class="list" @dragover.prevent @drop="onDrop('doing')">
      <div class="list-header">Doing</div>
      <ul>
        <li v-for="item in doing" :key="item.id" class="list-item" draggable="true" @dragstart="onDragStart(item)">
          {{ item.title }}
        </li>
      </ul>
    </div>
    <div class="list" @dragover.prevent @drop="onDrop('done')">
      <div class="list-header">Done</div>
      <ul>
        <li v-for="item in done" :key="item.id" class="list-item" draggable="true" @dragstart="onDragStart(item)">
          {{ item.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
interface Item {
  id: number;
  title: string;
  status: 'todo' | 'doing' | 'done';
}
export default ({
  name: 'TaskBoard',
  setup() {
    const items = ref<Item[]>([
      { id: 1, title: 'item 1', status: 'todo' },
      { id: 2, title: 'item 2', status: 'todo' },
      { id: 3, title: 'item 3', status: 'doing' },
      { id: 4, title: 'item 4', status: 'done' },
    ]);
    const todo = ref<Item[]>([]);
    const doing = ref<Item[]>([]);
    const done = ref<Item[]>([]);
    items.value.forEach(item => {
      if (item.status === 'todo') {
        todo.value.push(item);
      } else if (item.status === 'doing') {
        doing.value.push(item);
      } else {
        done.value.push(item);
      }
    });
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
      todo.value = items.value.filter(item => item.status === 'todo');
      doing.value = items.value.filter(item => item.status === 'doing');
      done.value = items.value.filter(item => item.status === 'done');
    };
    return {
      todo,
      doing,
      done,
      onDragStart,
      onDrop,
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
.list {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  width: 30%;
}
.list-header {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
.list-item {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 5px;
  padding: 10px;
  user-select: none;
}
.list-item:hover {
  background-color: #e0e0e0;
}
</style>
