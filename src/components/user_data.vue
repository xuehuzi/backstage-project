<template>
  <div class="user_data">
    <div>
      <el-input placeholder="请输账户名" v-model="search_value">
        <el-button @click="search_data" slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-table
      :data="backstage_username"
      style="width: 100%">
      <el-table-column
        prop="createdAt"
        label="注册日期">
        <template slot-scope="scope">{{scope.row.createdAt | change_date}}</template>
      </el-table-column>
      <el-table-column
        prop="_serverData.user_name"
        label="账户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="_serverData.user_password"
        label="密码"
        width="180">
      </el-table-column>
      <el-table-column
        prop="_serverData.header_icon"
        label="头像">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {query} from './get_data'

  export default {
    name: "user_data",
    data: function () {
      return {
        backstage_username: null,
        search_value: ''
      }
    },
    methods: {
      search_data:function () {
        this.backstage_username.forEach((item)=>{
          if(this.search_value === item._serverData.user_name){
            console.log('找到了')
            console.log(item)
          }else {
            console.log('不存在')
          }
        })
      }
    },
    created() {
      let that = this;
      query.find().then(
        function (todos) {
          that.backstage_username = todos;//.map((tgas) => tgas.attributes);
          //console.log(that.backstage_username)
        })
    }
  }
</script>

<style scoped>

</style>
