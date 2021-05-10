<template>
  <div id="app">
    <header-app user="Alan Wesley"></header-app>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'

  export default {
    name: 'App',
    components: {
      'header-app': Header
    }
  }
</script>

<style>
    #app {
        background-color: #ebebeb;
        font-family: 'Open Sans';
    }

    #app p, #app .h2 {
        margin: 0;
    }
</style>
