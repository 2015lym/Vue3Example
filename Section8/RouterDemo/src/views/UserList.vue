<template>
  <div>
    <el-table :data="userList" border>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="email" label="Email"></el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

interface User {
  name: string;
  email: string;
  age: number;
}

const userList: User[] = reactive([
  { name: '张三', email: 'zhangsan@example.com', age: 28 },
  { name: '李四', email: 'lisi@example.com', age: 32 },
  { name: '王五', email: 'wangwu@example.com', age: 27 },
  { name: 'John Doe', email: 'john@example.com', age: 25 },
  { name: 'Jane Smith', email: 'jane@example.com', age: 30 },
]);
</script>