<template>
  <div class="business_add">
    <h3 class="business_tips">店铺信息</h3>
    <el-form :model="business_msg" :rules="rules" ref="business_msg" class="submit-btn">
      <el-form-item prop="name" label="店名">
        <el-input placeholder="请输入账户名" v-model="business_msg.name" clearable></el-input>
      </el-form-item>
      <el-form-item prop="tel" label="电话">
        <el-input placeholder="请输入电话" v-model="business_msg.tel" clearable></el-input>
      </el-form-item>
      <el-form-item prop="address" label="地址">
        <el-input placeholder="请输入地址" v-model="business_msg.address" clearable></el-input>
      </el-form-item>
      <el-form-item prop="notice" label="公告">
        <el-input type="textarea" placeholder="请输入公告" v-model="business_msg.notice" clearable></el-input>
      </el-form-item>
      <h3 class="business_tips">商品信息</h3>

      <el-table :data="business_msg.goods">
        <el-table-column min-width="100%" label="商品名称">
          <template slot-scope="scope">
            <el-form-item :prop="'goods.'+scope.$index+'.goods_name'" :rules="rules.goods_name">
              <el-input v-model="scope.row.goods_name"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column min-width="25%" label="商品价格">
          <template slot-scope="scope">
            <el-form-item :prop="'goods.'+scope.$index+'.price'" :rules="rules.price">
              <el-input placeholder="价格" v-model="scope.row.price"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column min-width="25%" label="商品数量">
          <template slot-scope="scope">
            <el-form-item :prop="'goods.'+scope.$index+'.numb'" :rules="rules.numb">
              <el-input v-model.number="scope.row.numb"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column min-width="100%" label="商品说明">
          <template slot-scope="scope">
            <el-form-item :prop="'goods.'+scope.$index+'.title'" :rules="rules.title">
              <el-input v-model="scope.row.title"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column min-width="25%" label="操作">
          <template slot-scope="scope">
            <el-form-item>
              <el-button @click="btn_del(scope.$index, scope.row)">删除</el-button>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>

      <el-button type="primary" @click="newsubmit('business_msg')">提交</el-button>
      <el-button type="primary" @click="add">新增商品</el-button>
    </el-form>
  </div>
</template>

<script>
  import {query, AV} from './get_data'

  export default {
    name: "business_add",
    data: function () {
      let pat = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
      let pat_tel = /^1[3456789]\d{9}$/;
      let pat_price = /^[0-9]+([.]{1}[0-9]{1,2})?$/;
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

      let check_tel = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空'));
        }
        setTimeout(() => {
          if (!pat_tel.test(value)) {
            callback(new Error('请输入正确手机号'));
          } else {
            callback();
          }
        }, 1000);
      };

      let check_price = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空'));
        }
        setTimeout(() => {
          if (!pat_price.test(value)) {
            callback(new Error('价格错误'));
          } else {
            callback();
          }
        }, 1000);
      };

      return {
        business_msg: {
          name: '',
          tel: null,
          address: '',
          notice: '',
          goods: []
        },
        rules: {
          name: [
            {validator: check_name},
            {min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
          ],
          tel: [
            {validator: check_tel},
          ],
          address: [
            {required: true, trigger: 'blur', message: '不能为空'},
            {max: 30, message: '最多30个字'}
          ],
          notice: [
            {max: 30, message: '最多30个字'}
          ],
          goods_name: [
            {validator: check_name},
            {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'}
          ],
          price: [
            {validator: check_price},
          ],
          numb: [
            {type: 'number', message: '必须为数字'},
            {
              validator(rule, value, callback) {
                if (Number.isInteger(Number(value)) && Number(value) > 0 && Number(value) < 999) {
                  callback()
                } else {
                  callback(new Error('必须正整数'))
                }
              },
              trigger: 'blur'
            }
          ],
          title: [
            {max: 12, message: '最多12个字符'}
          ]
        }
      }
    },
    methods: {
      newsubmit: function (business_msg) {
        this.$refs[business_msg].validate((valid) => {
          if (valid) {
            let business_data = AV.Object.extend("business_data");
            let business_Data = new business_data();
            business_Data.save({
              name: this.business_msg.name,
              tel: this.business_msg.tel,
              address: this.business_msg.address,
              notice: this.business_msg.notice,
              goods: this.business_msg.goods
            }).then(
              () => {
                this.business_msg.goods=[];
                this.$message({
                  message: '新增商户成功',
                  type: 'success'
                })
              }
            )
          } else {
            this.$message({
              message: "检查输入",
              type: "error"
            });
            return false;
          }
        })
      },
      add: function () {
        this.business_msg.goods.push({
          goods_name: '',
          price: '',
          numb: '',
          title: ''
        })
      },
      btn_del: function (index) {
        this.business_msg.goods.splice(index, 1)
      }
    }
  }
</script>

<style scoped>
  .business_add {
    padding: 20px;
  }

  .business_tips {
    text-align: initial;
  }

</style>
