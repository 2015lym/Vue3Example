<template>
  <div>
    <ElCard shadow="never">
      <ElSkeleton :loading="loading" animated>
        <ElRow :gutter="20" justify="space-between">
          <ElCol :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <div class="flex items-center">
              <img src="@/assets/imgs/avatar.jpg" alt="" class="w-70px h-70px rounded-[50%] mr-20px" />
              <div>
                <div class="text-20px text-700">
                  你好，管理员，新的一天工作顺利
                </div>
                <div class="mt-10px text-14px text-gray-500">
                  {{ t('workplace.toady') }}，20℃ - 32℃！
                </div>
              </div>
            </div>
          </ElCol>
          <ElCol :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <div class="flex h-70px items-center justify-end <sm:mt-20px">
              <div class="px-8px text-right">
                <div class="text-14px text-gray-400 mb-20px">{{ t('workplace.project') }}</div>
                <CountTo class="text-20px" :start-val="0" :end-val="totalSate.project" :duration="2600" />
              </div>
              <ElDivider direction="vertical" />
              <div class="px-8px text-right">
                <div class="text-14px text-gray-400 mb-20px">{{ t('workplace.toDo') }}</div>
                <CountTo class="text-20px" :start-val="0" :end-val="totalSate.todo" :duration="2600" />
              </div>
              <ElDivider direction="vertical" border-style="dashed" />
              <div class="px-8px text-right">
                <div class="text-14px text-gray-400 mb-20px">{{ t('workplace.access') }}</div>
                <CountTo class="text-20px" :start-val="0" :end-val="totalSate.access" :duration="2600" />
              </div>
            </div>
          </ElCol>
        </ElRow>
      </ElSkeleton>
    </ElCard>
  </div>
  <PanelGroup style="margin-top: 16px;" />
  <ElRow :gutter="20" justify="space-between">
    <ElCol :xl="16" :lg="16" :md="24" :sm="24" :xs="24" class="mb-20px">
      <ElCard shadow="never" class="mt-20px">
        <template #header>
          <div class="flex justify-between">
            <span>操作记录</span>
            <ElLink type="primary" :underline="false">更多</ElLink>
          </div>
        </template>
        <ElSkeleton :loading="loading" animated>
          <div v-for="(item, index) in dynamics" :key="`dynamics-${index}`">
            <div class="flex items-center">
              <img src="@/assets/imgs/avatar.jpg" alt="" class="w-35px h-35px rounded-[50%] mr-20px" />
              <div>
                <div class="text-14px">
                  <!-- <Highlight :keys="item.keys.map((v) => t(v))"> -->
                  {{ item.user }} {{ item.content }}
                  <!-- </Highlight> -->
                </div>
                <div class="mt-15px text-12px text-gray-400">
                  {{ useTimeAgo(new Date()) }}
                </div>
              </div>
            </div>
            <ElDivider />
          </div>
        </ElSkeleton>
      </ElCard>
    </ElCol>
    <ElCol :xl="8" :lg="8" :md="24" :sm="24" :xs="24" class="mb-20px">
      <ElCard shadow="never" class="mt-20px">
        <template #header>
          <span>贡献指数</span>
        </template>
        <ElSkeleton :loading="loading" animated>
          <Echart :options="radarOptionData" :height="400" />
        </ElSkeleton>
      </ElCard>
    </ElCol>
  </ElRow>
</template>

<script setup lang="ts">
import { useTimeAgo } from '@/hooks/web/useTimeAgo'
import PanelGroup from './components/PanelGroup.vue'
import { useI18n } from '@/hooks/web/useI18n'
import { ref, reactive } from 'vue'
import { CountTo } from '@/components/CountTo'
import { Echart } from '@/components/Echart'
import { EChartsOption } from 'echarts'
import { radarOption } from './echarts-data'

import { getRadarApi } from '@/api/dashboard/workplace'
import { set } from 'lodash-es'
import request from '@/config/axios'

const loading = ref(true)

// 获取数据
let totalSate = reactive({
  project: 0,
  access: 0,
  todo: 0
})
let dynamics = reactive([])

const getCount = async () => {
  const res = await request.get({ url: 'http://localhost:3000/home' })
  if (res) {
    totalSate.project = res.project || 0;
    totalSate.todo = res.todo || 0;
    totalSate.access = res.access || 0;
    dynamics = res.operation_record || [];
  }
}

// 获取指数
let radarOptionData = reactive<EChartsOption>(radarOption) as EChartsOption

const getRadar = async () => {
  const res = await getRadarApi().catch(() => { })
  if (res) {
    set(
      radarOptionData,
      'radar.indicator',
      res.data.map((v) => {
        return {
          name: t(v.name),
          max: v.max
        }
      })
    )
    set(radarOptionData, 'series', [
      {
        name: '贡献指数',
        type: 'radar',
        data: [
          { value: res.data.map((v) => v.personal), name: '个人' },
          { value: res.data.map((v) => v.team), name: '团队' }
        ]
      }
    ])
  }
}

const getAllApi = async () => {
  await Promise.all([getCount(), getRadar()])
  loading.value = false
}

getAllApi()

const { t } = useI18n()
</script>

