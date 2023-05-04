<template>
  <div>
    <p>当前计数：{{ count }}</p>
    <p>计数的两倍：{{ doubleCount }}</p>
    <button @click="increment">增加计数</button>
    <button @click="incrementAsync">异步增加计数</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    const count = computed(() => store.state.count)
    const doubleCount = computed(() => store.getters.doubleCount)

    const increment = () => {
      store.commit('increment')
    }

    const incrementAsync = () => {
      store.dispatch('incrementAsync')
    }

    return {
      count,
      doubleCount,
      increment,
      incrementAsync
    }
  }
})
</script>