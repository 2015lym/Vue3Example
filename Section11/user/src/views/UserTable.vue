<template>
  <div>
    <!-- 表格 -->
    <el-table :data="users" border style="width: 100%">
      <el-table-column prop="id" label="ID" align="center" width="50"></el-table-column>
      <el-table-column prop="name" label="姓名" width="80"></el-table-column>
      <el-table-column prop="age" label="年龄" width="80"></el-table-column>
      <el-table-column prop="address" label="地址" width="180"></el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button type="danger" @click="deleteUser(row)">删除</el-button>
          <el-button type="primary" @click="showEditDialog(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 删除确认对话框 -->
    <el-dialog title="删除用户" v-model="deleteDialogVisible">
      <p>确定要删除该用户吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取消</el-button>
        <el-button type="danger" @click="confirmDeleteUser">确定</el-button>
      </span>
    </el-dialog>

    <!-- 添加用户表单 -->
    <el-form class="form-div" :model="form" label-width="80px">
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
import { ElMessage } from 'element-plus'
import { defineComponent, ref } from 'vue';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  age: number;
  address: string;
}

interface EditForm {
  id: number | null;
  name: string;
  age: number | null;
  address: string;
}

export default defineComponent({
  setup() {
    const users = ref<User[]>([]);

    // 查
    const fetchUsers = async () => {
      const response = await axios.get<User[]>('http://localhost:3000/users');
      users.value = response.data;
    };

    fetchUsers();

    // 删
    const deleteDialogVisible = ref(false);
    const userToDelete = ref<User | null>(null);

    const deleteUser = async (user: User) => {
      deleteDialogVisible.value = true;
      userToDelete.value = user;
    };

    const confirmDeleteUser = async () => {
      if (userToDelete.value) {
        await axios.delete(`http://localhost:3000/users/${userToDelete.value.id}`);
        users.value = users.value.filter(u => u.id !== userToDelete.value.id);
      }
      deleteDialogVisible.value = false;
    };

    // 增
    const form = ref<EditForm>({
      id: null,
      name: '',
      age: null,
      address: ''
    });

    const isFormValid = (form: EditForm) => {
      return form.name.trim() !== '' && form.age !== null && form.address.trim() !== '';
    };

    const addUser = async () => {
      if (!isFormValid(form.value)) {
        ElMessage.error('请填写完整');
        return;
      }
      const response = await axios.post<User>('http://localhost:3000/users', form.value);
      users.value.push(response.data);
      form.value = {
        id: null,
        name: '',
        age: null,
        address: ''
      };
    };

    // 改
    const editDialogVisible = ref(false);
    const editForm = ref<EditForm>({
      id: null,
      name: '',
      age: null,
      address: ''
    });

    const showEditDialog = (user: User) => {
      editDialogVisible.value = true;
      editForm.value = { ...user };
    };

    const updateUser = async () => {
      if (!isFormValid(editForm.value)) {
        ElMessage.error('请填写完整');
        return;
      }
      const response = await axios.put<User>(`http://localhost:3000/users/${editForm.value.id}`, editForm.value);
      const index = users.value.findIndex(u => u.id === editForm.value.id);
      if (index !== -1) {
        users.value[index] = response.data;
      }
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
      updateUser,
      deleteDialogVisible,
      confirmDeleteUser
    };
  }
});
</script>

<style scoped>
.form-div {
  margin-top: 16px;
}
</style>