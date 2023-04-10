<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import axios from 'axios';
import { onMounted } from 'vue';
import axiosInstance from '@/request/axiosInstance';

onMounted(() => {
  axios.get('https://jsonplaceholder.typicode.com/todos/1', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + 'your token'
    }
  }).then(response => {
    console.log(response)
  }).catch(error => {
    console.error(error);
  });

  axiosInstance.get('todos/1')
    .then((response) => {
      console.log('axiosInstance');
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
});
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
