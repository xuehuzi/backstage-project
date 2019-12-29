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
        <template slot-scope="scope">
          <span v-if="scope.row.isset">{{scope.row._serverData.user_password}}</span>
          <el-input
            v-if="!scope.row.isset"
            maxLength="12"
            minlength="5"
            v-model="scope.row._serverData.user_password">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="_serverData.header_icon"
        label="头像">
        <template slot-scope="scope">
          <span v-if="scope.row.isset">{{scope.row._serverData.header_icon}}</span>
          <el-input v-if="!scope.row.isset" v-model="scope.row._serverData.header_icon"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="btn_edit(scope.$index, scope.row)">编辑</el-button>
          <el-button @click="btn_keep(scope.$index, scope.row)" :disabled="scope.row.isset">保存</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {query, AV} from './get_data'

  export default {
    name: "user_data",
    data: function () {
      return {
        backstage_username: [],
        search_result: null,
        search_value: '',
        search_flg: false,
        search_tips: '未查询',
        tips: ''
      }
    },
    methods: {
      search_data: function () {
        for (let i = 0; i < this.backstage_username.length; i++) {
          if (this.search_value === this.backstage_username[i]._serverData.user_name) {
            this.search_result = this.backstage_username[i];
            this.search_flg = true;
            break
          } else {
            this.search_flg = false;
            this.search_tips = '账号没注册'
          }
        }
      },
      btn_edit(index) {
        this.backstage_username[index].isset = false;
      },
      btn_keep: function (index) {
        this.backstage_username[index].isset = true;
        let copy_data = JSON.parse(JSON.stringify(this.backstage_username));
        let val_length = this.backstage_username[index]._serverData.user_password.length;
        if (5 <= val_length && val_length <= 12) {//长度验证
          if (this.backstage_username[index]._serverData.user_password === copy_data[index].user_password) {//两次密码是否相同
            this.$message({
              message: '密码相同',
              type: 'error'
            })
          } else {
            let todo = AV.Object.createWithoutData('backstage_username', this.backstage_username[index].id);
            todo.set('user_password', this.backstage_username[index]._serverData.user_password);
            todo.save();
            this.$message({
              message: '密码修改成功',
              type: 'success'
            })
          }
        } else {
          this.$message({
            message: '修改失败：密码长度在5~12个字符之间',
            type: 'error'
          });
          this.backstage_username[index]._serverData.user_password = copy_data[index].user_password
        }
      }
    },
    created() {
      let that = this;
      query.find().then(
        function (todos) {
          that.backstage_username = todos;//.map((tgas) => tgas.attributes);
          that.backstage_username.map(i => {
            //实例创建后,添加新的属性到实例上，它不会触发视图更新。需通过$set添加属性
            that.$set(i, 'isset', true);
            return i;
          });
        })
    }
  }
</script>

<style scoped>

</style>
