<template>
  <ContentWrap>
    <el-table :data="listData" style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column prop="title" label="商品名"/>
      <el-table-column prop="author" label="添加人" width="180" />
      <el-table-column prop="number" label="库存" width="180" />
      <el-table-column label="操作" width="220">
        <template #default="scope">
          <el-input-number v-model="scope.row.number" :min="0" @change="handleChange(scope.row)" />
        </template>
      </el-table-column>
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

const handleChange = (item) => {
  request.put({ url: 'http://localhost:3000/products/' + item.id, data: item })
}

</script>