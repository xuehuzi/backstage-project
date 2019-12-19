<template>
  <div class="login_bg">
    <div class="login">
      <h2>后台管理系统</h2>
      <el-form :model="form_msg" :rules="rules" ref="form_msg" label-width="" class="submit-btn">
        <el-form-item prop="user_name">
          <el-input placeholder="请输入内容" v-model="form_msg.user_name" clearable></el-input>
        </el-form-item>
        <el-form-item prop="user_password">
          <el-input placeholder="请输入密码" v-model="form_msg.user_password" show-password></el-input>
        </el-form-item>
        <el-button type="primary" @click="newsubmit()">登陆</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
  import main_list from './main_list'

  export default {
    name: "login",
    components: {main_list},
    data() {
      return {
        form_msg: {
          user_name: '',
          user_password: '',
        },
        rules: {
          user_name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
          ],
          user_password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur'}
            ]
        },
        ///
        user_info: null,
        post_flg: null,
      }
    },
    methods: {
      newsubmit: function () {
        for (let i = 0; i < this.user_info.length; i++) {
          if (this.user_info[i].user_name === this.form_msg.user_name) {//账号存在
            if (this.user_info[i].user_password === this.form_msg.user_password) {//密码正确
              console.log('登陆成功')
              //路由跳转
              this.$router.push({ path: "/main_list" })
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
            user_name: this.form_msg.user_name,
            user_password: this.form_msg.user_password,
            account_status: false,
            header_icon: ''
          })
            .then(() => {
              this.post_flg = false
              this.form_msg.user_name = ''
              this.form_msg.user_password = ''
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
  .login_bg {
    position: fixed;
    background: url("../assets/timg.jpg") no-repeat;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
  }

  .login {
    width: 350px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    text-align: center;
    padding: 25px;
    border-radius: 10px;
  }

  .login h2{
    margin-bottom: 25px;
  }

  .submit-btn button {
    width: 100%;
  }

</style>
