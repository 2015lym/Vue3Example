<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { Table } from '@/components/Table'
import { getUserListApi } from '@/api/login'
import { UserType } from '@/api/login/types'
import { ref, h } from 'vue'
import { ElButton, ElDialog, ElOption, ElSelect } from 'element-plus'
import { TableColumn } from '@/types/table'

interface Params {
  pageIndex?: number
  pageSize?: number
}

const columns: TableColumn[] = [
  {
    field: 'index',
    label: '序号',
    type: 'index'
  },
  {
    field: 'username',
    label: '用户名'
  },
  {
    field: 'password',
    label: '密码'
  },
  {
    field: 'role',
    label: '角色'
  },
  {
    field: 'remark',
    label: '备注',
    formatter: (row: UserType) => {
      return h(
        'span',
        row.username === 'admin' ? '后端控制路由' : '前端控制路由'
      )
    }
  },
  {
    field: 'action',
    label: '操作'
  }
]

const loading = ref(true)

let tableDataList = ref<UserType[]>([])

const getTableList = async (params?: Params) => {
  const res = await getUserListApi({
    params: params || {
      pageIndex: 1,
      pageSize: 10
    }
  })
  if (res) {
    tableDataList.value = res.data.list
    loading.value = false
  }
}
getTableList()

const dialogVisible = ref(false)
const region = ref(undefined)

</script>

<template>
  <ContentWrap title="用户管理" message="测试数据">
    <Table :columns="columns" :data="tableDataList" :loading="loading" :selection="false">
      <template #action="data">
        <ElButton type="primary" @click="dialogVisible = true">
          操作
        </ElButton>
      </template>
    </Table>
    <el-dialog v-model="dialogVisible" title="修改权限">
      <el-select v-model="region" placeholder="请选择">
        <el-option label="管理员" value="1" />
        <el-option label="普通用户" value="2" />
      </el-select>
      <template #footer>
        <ElButton type="primary" @click="dialogVisible = false">提交</ElButton>
        <ElButton @click="dialogVisible = false">取消</ElButton>
      </template>
    </el-dialog>
  </ContentWrap>
</template>
