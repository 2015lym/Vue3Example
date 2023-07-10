<template>
  <div>
    AssetOverview
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import request from '@/config/axios'

export default defineComponent({
  setup() {
    let provideValue = ref();
    request.get({ url: 'http://localhost:3000/users' }).then(response => {
      console.log(response)
      provideValue.value = response[0].name
    }).catch(error => {
      console.error(error);
    });
    

    return {
      provideValue
    };
  },
});
</script>