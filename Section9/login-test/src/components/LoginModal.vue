<template>
  <el-dialog title="登录" v-model="dialogVisible" :before-close="reset">
    <el-form ref="formRef" :model="submitInfo" :rules="rules" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="submitInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="submitInfo.password" type="password"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset">取消</el-button>
      <el-button type="primary" @click="login(formRef)">登录</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import type { FormInstance, FormRules } from 'element-plus'
import { useStore } from "vuex";
import { watch } from 'vue';
export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const dialogVisible = ref(props.visible)
    const formRef = ref<FormInstance>();
    const rules = reactive<FormRules>({
      username: [
        { required: true, message: "请输入用户名", trigger: "blur" },
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
      ],
    });
    const store = useStore();
    const submitInfo = reactive({
      username: "",
      password: "",
    });

    watch(() => props.visible, (newValue) => {
      dialogVisible.value = newValue;
    });

    const reset = () => {
      submitInfo.username = "";
      submitInfo.password = "";
      dialogVisible.value = false;
      emit("update:visible", false);
    };


    const login = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        console.log(valid)
        console.log(fields)
        if (valid) {
          dialogVisible.value = false;
          emit("update:visible", false);
          store.commit("setLoggedIn", true);
          localStorage.setItem("username", submitInfo.username);
          localStorage.setItem("password", submitInfo.password);
        } else {
          console.log('error submit!', fields)
        }
      })
    }

    return {
      dialogVisible,
      rules,
      formRef,
      submitInfo,
      reset,
      login,
    };
  },
});
</script>