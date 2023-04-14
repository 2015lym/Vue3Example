<template>
  <main>
    <RouterLink to="/">Dashboard</RouterLink>
    <RouterLink to="/Profile">Profile</RouterLink>
    <button @click="toProfile">编程式导航</button>
    <button @click="toParams">Params</button>
    <button @click="toQuery">Query</button>
    <RouterView />
  </main>
</template>

<script lang="ts">
import type { Router } from 'vue-router'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router: Router = useRouter()
    const toProfile = (): void => {
      router.push('/Profile')
    }
    const toParams = (): void => {
      router.push({ name: 'params', params: { id: 123 } })
    }
    const toQuery = (): void => {
      router.push({ name: 'query', query: { id: 123 } })
    }
    return {
      toProfile,
      toParams,
      toQuery
    };
  },
};
</script>

<style scoped>
a {
  margin-right: 16px;
}
button {
  margin-right: 16px;
}
</style>