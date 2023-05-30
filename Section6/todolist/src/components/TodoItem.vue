<template>
  <div class="list" @dragover.prevent @drop="onDrop">
    <div class="list-header">{{ header }}</div>
    <ul>
      <li
        v-for="item in items"
        :key="item.id"
        class="list-item"
        draggable="true"
        @dragstart="onDragStart(item)"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Item {
  id: number;
  title: string;
  status: 'todo' | 'doing' | 'done';
}

export default defineComponent({
  name: 'TodoItem',
  props: {
    header: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    onDragStart: {
      type: Function,
      required: true,
    },
    onDrop: {
      type: Function,
      required: true,
    },
  },
});
</script>


<style scoped>
.list {
  margin-left: 16px;
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
