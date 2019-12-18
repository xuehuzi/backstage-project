<template>
  <div class="login">
    <h2>后台管理系统</h2>
    <form class="login_form">
      <el-input v-model="user_name" placeholder="请输入账号"></el-input>
      <el-input placeholder="请输入密码" v-model="user_password" show-password></el-input>
      <button @click="newsubmit()">提交</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        user_name: '',
        user_password: '',
        user_info: null,
        post_flg: null
      }
    },
    methods: {
      newsubmit: function () {

        for (let i = 0; i < this.user_info.length; i++) {
          if (this.user_info[i].user_name === this.user_name) {//账号存在
            if (this.user_info[i].user_password === this.user_password) {//密码正确
              console.log('登陆成功')
              //路由跳转
            } else {
              console.log('密码错误')
            }
            this.post_flg = true
            break;
          } else {
            this.post_flg = false
          }
        }

        if (this.post_flg === false) {//账号不存在替用户注册
          let AV = require("leancloud-storage");
          let backstage_username = AV.Object.extend("backstage_username");
          let new_backstage_username = new backstage_username();
          new_backstage_username.save({
            user_name: this.user_name,
            user_password: this.user_password,
            account_status: false,
            header_icon: ''
          })
            .then(() => {
              this.post_flg = false
            });
        }

      }
    },
    created() {
      let that = this;
      let AV = require("leancloud-storage");
      let query = new AV.Query('backstage_username');
      query.find().then(
        function (todos) {
          let backstage_username = todos.map((tgas) => tgas.attributes);
          that.user_info = backstage_username;
          AV.Object.saveAll(todos);
        })
    }
  }
</script>

<style scoped>
  .login {
    width: 350px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
  }

</style>
