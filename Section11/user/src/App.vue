<template>
  <div id="app">
     <user-table></user-table>
   </div>
 </template>
 
 <script lang="ts">
 import { defineComponent } from 'vue';
 import UserTable from './views/UserTable.vue';
 
 export default defineComponent({
   components: {
     UserTable
   }
 });
 </script>