<template>
  <div class="Params">
    <h1>Params{{ $route.params.id }}</h1>
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'

export default {
  name: 'Params',
  setup() {
    const route = useRoute()
    console.log(route.params)
  }
}
</script>