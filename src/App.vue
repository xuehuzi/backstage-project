<template>
  <div id="app">
    <div class="main">
      <router-view name="main"></router-view>
    </div>
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

  }
</style>
