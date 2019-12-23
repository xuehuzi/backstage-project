<template>
  <div class="main_list">
    <el-container>
      <el-aside width="200px">
        <aside_lists></aside_lists>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view name="main_content"></router-view>
        </el-main>
      </el-container>
    </el-container>
    <router-view name="main_list"></router-view>
  </div>
</template>

<script>
  import aside_lists from './aside_lists'

  export default {
    name: "main_list",
    components: {aside_lists}
  }
</script>

<style scoped>


  body {
    min-height: 100vh;
  }

  .main .main_list {
    min-height: 100vh;
  }

  .main_list {
    min-height: 100vh;
  }

  .main_list section {
    min-height: 100vh;
  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    padding: 0;
  }
</style>
