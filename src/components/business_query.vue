<template>
  <div class="business_query">
    <div>
      <el-input placeholder="请输入要查询的账户名" v-model="search_value">
        <el-button @click="search_data" slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-table :data="business_data">
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column width="1">
        <template slot-scope="scope">
          <el-dialog title="收货地址" :visible.sync="scope.row.isset" width="90%">
            <el-form
              inline
              label-width="90px"
              size="small"
              :rules="rules"
              :ref="scope.row._serverData"
              :model="scope.row._serverData">
              <el-row class="my-el-row" type="flex">
                <el-form-item label="店铺名称:" prop="name">
                  <el-input v-model="scope.row._serverData.name"></el-input>
                </el-form-item>
                <el-form-item label="店铺电话:" prop="tel">
                  <el-input style="width: 137px" v-model="scope.row._serverData.tel"></el-input>
                </el-form-item>
                <el-form-item label="店铺公告:" prop="notice">
                  <el-input style="width: 500px" v-model="scope.row._serverData.notice"></el-input>
                </el-form-item>
                <el-form-item label="店铺地址:" prop="address">
                  <el-input style="width: 700px" v-model="scope.row._serverData.address"></el-input>
                </el-form-item>
              </el-row>
              <el-table :data="scope.row._serverData.goods">
                <el-table-column min-width="15%" label="商品名称:">
                  <template slot-scope="scope">
                    <el-form-item :prop="'goods.'+scope.$index+'.name'" :rules="rules.goods_name">
                      <el-input v-model="scope.row.goods_name"></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column min-width="10%" label="商品数量:">
                  <template slot-scope="scope">
                    <el-form-item :prop="'goods.'+scope.$index+'.numb'" :rules="rules.numb">
                      <el-input v-model.number="scope.row.numb"></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column min-width="10%" label="商品价格:">
                  <template slot-scope="scope">
                    <el-form-item :prop="'goods.'+scope.$index+'.price'" :rules="rules.price">
                      <el-input v-model="scope.row.price"></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column min-width="65%" label="商品描述:">
                  <template slot-scope="scope">
                    <el-form-item :prop="'goods.'+scope.$index+'.title'" :rules="rules.title">
                      <el-input style="width: 1000px" v-model="scope.row.title"></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column min-width="65%" label="商品图片:">
                  <template slot-scope="scope">
                    <img :src="scope.row.goods_pic">
                  </template>
                </el-table-column>
              </el-table>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="newsubmit(scope.row,scope.row._serverData)">确 定</el-button>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
      <el-table-column
        label="店铺名称"
        min-width="20%">
        <template slot-scope="scope">
          <span>{{scope.row._serverData.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="店铺电话"
        min-width="15%">
        <template slot-scope="scope">
          <span>{{scope.row._serverData.tel}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="店铺公告"
        min-width="90%">
        <template slot-scope="scope">
          <span>{{scope.row._serverData.notice}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="店铺地址"
        min-width="80%">
        <template slot-scope="scope">
          <span>{{scope.row._serverData.address}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="店铺图片"
        min-width="30%">
        <template slot-scope="scope">
          <img :src="scope.row._serverData.icon" alt="">
        </template>
      </el-table-column>
      <el-table-column min-width="15%">
        <template slot-scope="scope">
          <el-button @click="open_menu(scope.row,scope.$index)">编辑1</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {business_data, AV} from './get_data'

  export default {
    name: "business_query",
    data: function () {
      let pat = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
      let check_name = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空1'));
        }
        setTimeout(() => {
          if (!pat.test(value)) {
            callback(new Error('不能含有特殊符号'));
          } else {
            callback();
          }
        }, 1000);
      };
      return {
        business_data: null,
        data: null,
        dialogFormVisible: true,
        rules: {
          address: [
            {required: true, message: '请输入地址', trigger: 'blur'},
            {min: 15, max: 45, message: '长度在 15 到 45 个字符', trigger: 'blur'}
          ],
          name: [
            {validator: check_name},
            {min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
          ],
          goods_name: [
            {validator: check_name},
            {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'}
          ],
          numb: [
            {type: 'number', message: '必须为数字'},
            {
              validator(rule, value, callback) {
                if (Number.isInteger(Number(value)) && Number(value) >= 0 && Number(value) < 999) {
                  callback()
                } else {
                  callback(new Error('必须正整数'))
                }
              },
              trigger: 'blur'
            }
          ],
          title: [
            {required: true, message: '请输入说明', trigger: 'blur'},
            {max: 60, message: '长度最多60个字符', trigger: 'blur'}
          ],
          price: [
            {
              validator(rule, value, callback) {
                let pat_price = /^[0-9]+([.]{1}[0-9]{1,2})?$/;
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
              },
              trigger: 'blur'
            }
          ],
          notice: [
            {max: 30, message: '最多30个字'}
          ],
          tel: [
            {
              validator(rule, value, callback) {
                let pat_tel = /^1[3456789]\d{9}$/;
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
              },
              trigger: 'blur'
            }
          ]
        },
        search_value: '',
      }
    },
    methods: {
      newsubmit: function (row, data) {
        console.log(row)
        console.log(data)
        this.$refs[data].validate((valid) => {
          if (valid) {
            let todo = AV.Object.createWithoutData('business_data', row.id);
            todo.set('name', row._serverData.name);
            todo.set('tel', row._serverData.tel);
            todo.set('notice', row._serverData.notice);
            todo.set('address', row._serverData.address);
            todo.set('goods', row._serverData.goods);
            todo.save();
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: "检查输入",
              type: "error"
            });
            return false;
          }
        })
      },
      open_menu: function (row) {
        row.isset = true
      },
      search_data() {

      },
    },
    created() {
      let that = this;
      business_data.find().then(
        function (todos) {
          that.business_data = todos;
          that.business_data.map(i => {
            that.$set(i, 'isset', false);
            return i;
          })
          console.log(that.business_data)
        })
    }
  }
</script>

<style scoped>
  .my-el-row {
    padding-left: 20px;
  }

  .my-el-row div {
    width: 200px;
    margin-right: 40px;
  }

  .my-el-row div:nth-child(2) {
    width: 137px;
  }

  .my-el-row div:nth-child(3) {
    width: 500px;
  }

  .my-el-row div:nth-child(4) {
    width: 700px;
  }
</style>
