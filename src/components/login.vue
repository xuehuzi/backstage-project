<template>
  <div class="login_bg">
    <div class="login">
      <h2>后台管理系统</h2>
      <el-form :model="form_msg" :rules="rules" ref="form_msg" label-width="" class="submit-btn">
        <el-form-item prop="user_name">
          <el-input placeholder="请输入账户名" v-model="form_msg.user_name" clearable></el-input>
        </el-form-item>
        <el-form-item prop="user_password">
          <el-input placeholder="请输入密码" v-model="form_msg.user_password" show-password></el-input>
        </el-form-item>
        <p class="tips">{{form_msg.tips}}</p>
        <el-button type="primary" @click="newsubmit('form_msg')">登陆</el-button>
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
      let pat = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
      let check_name = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空'));
        }
        setTimeout(() => {
          if (!pat.test(value)) {
            callback(new Error('不能含有特殊符号'));
          } else {
            callback();
          }
        }, 1000);
      };
      let check_password = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };

      return {
        form_msg: {
          user_name: '',
          user_password: '',
          tips: '注意：未被注册账号名登陆，将直接注册',
        },
        rules: {
          user_name: [
            {validator: check_name},
            {required: true, trigger: 'blur'},
            {min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
          ],
          user_password: [
            {validator: check_password},
            {required: true, trigger: 'blur'},
            {min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur'}
          ]
        },
        ///
        user_info: null,
        post_flg: null,
      }
    },
    methods: {
      newsubmit: function (form_msg) {
        this.$refs[form_msg].validate((valid) => {//输入验证
          if (valid) {
            console.log('验证结果' + valid);
            //
            for (let i = 0; i < this.user_info.length; i++) {//遍历账号密码
              if (this.user_info[i].user_name === this.form_msg.user_name) {//账号存在
                if (this.user_info[i].user_password === this.form_msg.user_password) {//密码正确
                  console.log('登陆成功');
                  //路由跳转
                  this.$router.push({path: "/main_list/business_query"})
                } else {
                  this.$message({
                    message: "密码错误",
                    type: "error"
                  })
                }
                this.post_flg = true;
                break
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
                  this.post_flg = false;
                  this.form_msg.user_name = '';
                  this.form_msg.user_password = '';
                  this.$router.push({path: "/main_list"})
                });
            }
            //
          } else {
            this.$message({
              message: "输入错误重新输入",
              type: "error"
            });
            return false;
          }
        })
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

  .login h2 {
    margin-bottom: 25px;
  }

  .submit-btn button {
    width: 100%;
  }

  .tips {
    color: #909399;
    font-size: 13px;
    margin: 15px;
  }


</style>
