<template>
  <div class="Query">
    <h1>Query{{ $route.query.id }}</h1>
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'

export default {
  name: 'Query',
  setup() {
    const route = useRoute()
    console.log(route.query)
  }
}
</script>