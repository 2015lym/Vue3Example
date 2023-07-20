<template>
  <ContentWrap>
    <el-table :data="listData" style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column prop="title" label="商品名" width="200"/>
      <el-table-column prop="description" label="商品描述" />
      <el-table-column prop="price" label="价格" width="180" />
      <el-table-column prop="post" label="邮寄方式" width="180" />
      <el-table-column prop="author" label="添加人" width="180" />
      <el-table-column prop="create_time" label="创建时间" width="180" />
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button type="danger" size="small" @click.prevent="deleteRow(scope.$index, scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </ContentWrap>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
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

const deleteRow = (index: number, id: number) => {
  listData.value.splice(index, 1)
  request.delete({ url: 'http://localhost:3000/products/' + id })
  ElMessage({
    message: '删除成功！',
    type: 'success',
  })
}
</script>