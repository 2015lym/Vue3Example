<template>
  <ContentWrap>
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
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button type="primary" size="small" @click.prevent="showDialog(scope.row)">
            处理
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </ContentWrap>
  <Dialog v-model="dialogVisible" title="处理">
    <Editor />
    <template #footer>
      <ElButton type="primary" @click="dialogVisible = false">保存</ElButton>
      <ElButton @click="dialogVisible = false">关闭</ElButton>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { Dialog } from '@/components/Dialog'
import { Editor } from '@/components/Editor'
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
    listData.value = res.filter(
      (rtn) => rtn.type == '反馈'
    ) || [];
  }
}
getData()

const dialogVisible = ref(false)
const showDialog = (item) => {
  dialogVisible.value = true;
}
</script>