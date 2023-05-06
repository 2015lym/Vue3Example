<template>
  <el-dialog title="登录" :visible.sync="visible" @close="reset">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset">取消</el-button>
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const form = ref({
      username: "",
      password: "",
    });

    const reset = () => {
      form.value.username = "";
      form.value.password = "";
      emit("update:visible", false);
    };

    const login = () => {
      emit("update:visible", false);
      store.commit("setLoggedIn", true);
      localStorage.setItem("username", form.value.username);
      localStorage.setItem("password", form.value.password);
    };

    return {
      form,
      reset,
      login,
    };
  },
});
</script>