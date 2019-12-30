<template>
  <div class="business_add">
    <h3 class="business_tips">店铺信息</h3>
    <el-form :model="business_msg" :rules="rules" ref="business_msg" label-width="70px" class="submit-btn">
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
      <el-form-item>
        <el-table :data="business_msg.goods" style="width: 100%">
          <el-table-column
            prop="business_msg.goods.name"
            label="商品名称"
            width="300">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="business_msg.goods.price"
            label="商品价格"
            width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.price"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="business_msg.goods.numb"
            label="商品数量"
            width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.numb"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="business_msg.goods.title"
            label="商品说明">
            <template slot-scope="scope">
              <el-input v-model="scope.row.title"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="105">
            <template slot-scope="scope">
              <el-button @click="btn_del(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
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
            //{validator: check_name},
            {required: true, trigger: 'blur'},
            {min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
          ],
          tel: [
            //{validator: check_password},
            {required: true, trigger: 'blur'},
            {min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur'}
          ]
        },
      }
    },
    methods: {
      newsubmit: function () {
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
            this.$message({
              message: '新增商户成功',
              type: 'success'
            })
          }
        )
      },
      add: function () {
        this.business_msg.goods.push({
          name: '',
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
