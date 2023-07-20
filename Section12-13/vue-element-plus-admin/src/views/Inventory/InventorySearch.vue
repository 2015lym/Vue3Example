<template>
  <ContentWrap>
    <div style="display: flex;">
      <el-input style="width: 200px; margin-right: 16px;" v-model="searchValue" placeholder="请输入标题关键字"></el-input>
      <el-button @click="search" type="primary">搜索</el-button>
      <el-button @click="resetSearch">重置</el-button>
    </div>
    <el-table :data="listData" style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column prop="title" label="商品名"/>
      <el-table-column prop="number" label="库存" width="180" />
      <el-table-column prop="price" label="价格" width="180" />
      <el-table-column prop="post" label="邮寄方式" width="180" />
      <el-table-column prop="author" label="添加人" width="180" />
      <el-table-column prop="create_time" label="创建时间" width="180" />
    </el-table>
  </ContentWrap>
</template>

<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { ref } from 'vue'
import request from '@/config/axios'

const listData = ref([])

const getData = async () => {
  const res = await request.get({ url: 'http://localhost:3000/products' })
  if (res) {
    listData.value = res || [];
  }
}
getData()

const searchValue = ref('')
const search = () => {
  listData.value = listData.value.filter(
    (rtn) =>
      !searchValue.value ||
      rtn.title.toLowerCase().includes(searchValue.value.toLowerCase())
  )
}
const resetSearch = () => {
  searchValue.value = ''
  getData()
}
</script>