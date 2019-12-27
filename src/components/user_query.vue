<template>
    <div class="user_query">
      <div>
        <el-input placeholder="请输入要查询的账户名" v-model="search_value">
          <el-button @click="search_data" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <table style="width: 100%;height: 50px">
          <tr>
            <td v-if="!search_flg">{{search_tips}}</td>
            <td v-if="search_flg">{{search_result.createdAt | change_date}}</td>
            <td v-if="search_flg">{{search_result._serverData.user_name}}</td>
            <td v-if="search_flg">{{search_result._serverData.user_password}}</td>
            <td v-if="search_flg">{{search_result._serverData.header_icon}}</td>
          </tr>
        </table>
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
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
        search_result: null,
        search_value: '',
        search_flg: false,
        search_tips:'未查询'
      }
    },
    methods: {
      search_data: function () {
        for (let i = 0; i < this.backstage_username.length; i++) {
          if (this.search_value === this.backstage_username[i]._serverData.user_name) {
            //console.log(this.backstage_username[i]);
            this.search_result = this.backstage_username[i];
            this.search_flg = true;
            break
          } else {
            this.search_flg = false;
            this.search_tips = '账号没注册'
          }
        }
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
    created() {
      let that = this;
      query.find().then(
        function (todos) {
          that.backstage_username = todos;//.map((tgas) => tgas.attributes);
        })
    }
  }
</script>

<style scoped>

</style>
