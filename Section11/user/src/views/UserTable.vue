<template>
  <div>
    <!-- 表格 -->
    <el-table :data="users" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="age" label="年龄" width="80"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button type="danger" @click="deleteUser(row)">删除</el-button>
          <el-button type="primary" @click="showEditDialog(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加用户表单 -->
    <el-form :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input-number v-model="form.age"></el-input-number>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addUser">添加</el-button>
      </el-form-item>
    </el-form>

    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户" v-model="editDialogVisible">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="editForm.age"></el-input-number>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updateUser">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';

export default defineComponent({
  setup() {
    const users = ref([]);

    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:3000/users');
      users.value = response.data;
    };

    fetchUsers();

    const form = ref({
      name: '',
      age: null,
      address: ''
    });

    const addUser = async () => {
      const response = await axios.post('http://localhost:3000/users', form.value);
      users.value.push(response.data);
      form.value = {
        name: '',
        age: null,
        address: ''
      };
    };

    const deleteUser = async (user) => {
      await axios.delete(`http://localhost:3000/users/${user.id}`);
      users.value = users.value.filter(u => u.id !== user.id);
    };

    const editDialogVisible = ref(false);
    const editForm = ref({
      id: null,
      name: '',
      age: null,
      address: ''
    });

    const showEditDialog = (user) => {
      editDialogVisible.value = true;
      editForm.value = { ...user };
    };

    const updateUser = async () => {
      const response = await axios.put(`http://localhost:3000/users/${editForm.value.id}`, editForm.value);
      const index = users.value.findIndex(u => u.id === editForm.value.id);
      users.value[index] = response.data;
      editDialogVisible.value = false;
    };

    return {
      users,
      form,
      addUser,
      deleteUser,
      editDialogVisible,
      editForm,
      showEditDialog,
      updateUser
    };
  }
});
</script>