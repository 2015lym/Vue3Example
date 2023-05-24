<template>
  <el-card :body-style="{ display: 'flex', 'align-items': 'center', 'font-size': '20px' }">
    <div class="avatar">
      <img src="@/assets/avatar.jpg" alt="Avatar">
    </div>
    <div class="user-details">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
      <p>年龄: {{ user.age }}</p>
      <p>分数: {{ user.score }}</p>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
interface User {
  name: string;
  email: string;
  age: number;
  score: number;
}

const user = ref<User>({
  name: '张三',
  email: 'zhangsan@example.com',
  age: 28,
  score: 99
});
</script>

<style scoped>
.user-info-card {
  height: 100%;

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