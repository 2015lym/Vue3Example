<template>
  <ContentWrap>
    <el-form :model="form" label-width="120px">
      <el-form-item label="商品名">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="邮寄方式">
        <el-select v-model="form.post" placeholder="请选择">
          <el-option label="包邮" value="包邮" />
          <el-option label="12元" value="12元" />
        </el-select>
      </el-form-item>
      <el-form-item label="价格">
        <el-input-number v-model="form.price" :min="1" />
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker v-model="form.create_time" type="datetime" placeholder="请选择" value-format="YYYY-MM-DD hh:mm:ss" />
      </el-form-item>
      <el-form-item label="添加人">
        <el-radio-group v-model="form.author">
          <el-radio label="管理员" />
          <el-radio label="张三" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" style="width: 300px">添加</el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { ContentWrap } from '@/components/ContentWrap'
import { reactive } from 'vue'
import request from '@/config/axios'
import { useRouter } from 'vue-router'

const { push } = useRouter()

const form = reactive({
  title: '',
  post: '',
  create_time: '',
  author: '',
  description: '',
  price: 0
})

const addData = async () => {
  await request.post({ url: 'http://localhost:3000/products', data: form })
}
const onSubmit = () => {
  addData()
  ElMessage({
    message: '添加成功！',
    type: 'success',
  })
  setTimeout(() => { push('/Product/ProductSearch') }, 1000);
}

</script>