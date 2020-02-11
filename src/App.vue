<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style>

  * {
    padding: 0;
    margin: 0;
  }

  #app {
    min-height: 100vh;
  }

  .cell {
    text-align: center;
  }

  .self_dialog>div:nth-child(2) {
    padding: 0;
  }
</style>
