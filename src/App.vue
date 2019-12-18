<template>
  <div id="app">
    <login></login>
  </div>
</template>

<script>
  import login from './components/login'

  export default {
    name: 'App',
    components:{
      login
    }
  }
</script>

<style>

  * {
    padding: 0;
    margin: 0;
  }

  #app {
    position: fixed;
    background: url("./assets/timg.jpg") no-repeat;
    width: 100%;
    height: 100%;
    min-width: 1080px;
    background-size: 100% 100%;
  }
</style>
