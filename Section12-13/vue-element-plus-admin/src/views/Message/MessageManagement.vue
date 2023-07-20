<template>
  <ContentWrap>
    <div style="display: flex;">
      <el-input style="width: 200px; margin-right: 16px;" v-model="searchValue" placeholder="请输入标题关键字"></el-input>
      <el-button @click="search" type="primary">搜索</el-button>
      <el-button @click="resetSearch">重置</el-button>
    </div>
    <el-table :data="listData" style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column prop="title" label="消息标题" />
      <el-table-column prop="content" label="消息内容" />

      <el-table-column label="消息类型" width="180">
        <template #default="scope">
          <el-tag :type="getType(scope.row)">{{ scope.row.type }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="create_time" label="创建时间" width="180" />
    </el-table>
  </ContentWrap>
</template>

<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { ref } from 'vue'
import request from '@/config/axios'

const listData = ref([])

const getType = (item) => {
  if (item.type == '通知') return 'info'
  if (item.type == '反馈') return 'warning'
  else return ''
}

const getData = async () => {
  const res = await request.get({ url: 'http://localhost:3000/messages' })
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