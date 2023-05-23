<template>
  <el-card>
    <div class="user-info-card">
      <div class="avatar">
        <img :src="user.avatar" alt="Avatar">
      </div>
      <div class="user-details">
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
        <p>Age: {{ user.age }}</p>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
interface User {
  name: string;
  email: string;
  age: number;
  avatar: string;
}

const user = ref<User>({
  name: '张三',
  email: 'zhangsan@example.com',
  age: 28,
  avatar: 'https://avatars.githubusercontent.com/u/16334445?v=4',
});
</script>

<style scoped>
.user-info-card {
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 20px;
}

.avatar img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}

.user-details {
  margin-left: 20px;
}
</style>