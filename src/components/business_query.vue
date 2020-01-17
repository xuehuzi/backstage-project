<template>
  <div class="business_query">
    <div>
      <el-input placeholder="请输入要查询的账户名" v-model="search_value">
        <el-button @click="search_data" slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-table :data="business_data" ref="ref_list">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form
            inline
            :key="index"
            v-for="(val,index) in scope.row._serverData.goods">
            <el-form-item label="名称:">
              <el-form :model="val" :rules="rules" ref="goods_name">  
                <el-form-item prop="name">   
                  <el-input :disabled="scope.row.isset" v-model="val.name"></el-input>
                </el-form-item>
              </el-form>
            </el-form-item>
            <el-form-item label="数量:">
              <el-form :model="val" :rules="rules" ref="goods_numb">  
                <el-form-item prop="numb">   
                  <el-input :disabled="scope.row.isset" v-model.number="val.numb"></el-input>
                </el-form-item>
              </el-form>
            </el-form-item>
            <el-form-item label="价格:">
              <el-form :model="val" :rules="rules" ref="goods_price">  
                <el-form-item prop="price">   
                  <el-input :disabled="scope.row.isset" v-model="val.price"></el-input>
                </el-form-item>
              </el-form>
            </el-form-item>
            <el-form-item label="说明:">
              <el-form :model="val" :rules="rules" ref="goods_title">  
                <el-form-item prop="title">   
                  <el-input :disabled="scope.row.isset" v-model="val.title"></el-input>
                </el-form-item>
              </el-form>
            </el-form-item>
            <el-form-item>
              <el-button @click="goodstijiao(index)">保存</el-button>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="商户名称"
        min-width="30%">
        <template slot-scope="scope">
          <el-form :rules="rules" :model="scope.row._serverData" :ref="'ref_name'+scope.$index">
            <el-form-item prop="name">
              <span v-if="scope.row.isset">{{scope.row._serverData.name}}</span>
              <el-input :rules="rules" v-if="!scope.row.isset" v-model="scope.row._serverData.name"></el-input>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="电话"
        min-width="15%">
        <template slot-scope="scope">
          <el-form :rules="rules" :model="scope.row._serverData" :ref="'ref_tel'+scope.$index">
            <el-form-item prop="tel">
              <span v-if="scope.row.isset">{{scope.row._serverData.tel}}</span>
              <el-input v-if="!scope.row.isset" v-model="scope.row._serverData.tel"></el-input>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="公告"
        min-width="40%">
        <template slot-scope="scope">
          <el-form :rules="rules" :model="scope.row._serverData" :ref="'ref_notice'+scope.$index">
            <el-form-item prop="notice">
              <span v-if="scope.row.isset">{{scope.row._serverData.notice}}</span>
              <el-input v-if="!scope.row.isset" v-model="scope.row._serverData.notice"></el-input>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="地址">
        <template slot-scope="scope">
          <el-form :rules="rules" :model="scope.row._serverData" :ref="'ref_address'+scope.$index">
            <el-form-item prop="address">
              <span v-if="scope.row.isset">{{scope.row._serverData.address}}</span>
              <el-input v-if="!scope.row.isset" v-model="scope.row._serverData.address"></el-input>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="20%">
        <template slot-scope="scope">
          <el-button @click="btn_edit(scope.$index, scope.row)">编辑</el-button>
          <el-button @click="btn_keep(scope.$index, scope.row)" :disabled="scope.row.isset">提交</el-button>
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
        rules: {
          address: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
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
            {max: 12, message: '最多12个字符'}
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
      btn_edit(index, row) {
        this.business_data[index].isset = false;
        let $table = this.$refs.ref_list;
        $table.toggleRowExpansion(row, true);
      },
      btn_keep(index, row) {
        console.log(row._serverData.goods.length)
        let $table = this.$refs.ref_list;
        this.business_data[index].isset = true;
        $table.toggleRowExpansion(row, false);
        let that = this;
        let promise = function (val) {
          return new Promise(function (resolve, reject) {
            that.$refs[[val] + index].validate(valid => {
              if (valid) {
                resolve(true)
              } else {
                reject(false);
                return false;
              }
            })
          })
        };
        Promise.all(
          [
            promise('ref_name', index),
            promise('ref_tel', index),
            promise('ref_notice', index),
            promise('ref_address', index),
          ]
        ).then(
          () => {
            that.$message({
              message: '验证成功',
              type: 'success'
            })
          }
        ).catch(
          () => {
            that.$message({
              message: '验证失败',
              type: 'error'
            })
          }
        )
        // this.$refs["ref_list" + index].validate(valid => {
        //   if (valid) {
        //     console.log(index + "：OK");
        //   } else {
        //     console.log(index + "：NO");
        //     return false;
        //   }
        // })
      },
      goodstijiao(index) {
        let that = this;
        let promise = function (val) {
          return new Promise(function (resolve, reject) {
            that.$refs[[val]][index].validate(valid => {
              if (valid) {
                resolve(true)
              } else {
                reject(false);
                return false;
              }
            })
          })
        };
        Promise.all(
          [
            promise('goods_name', index),
            promise('goods_numb', index),
            promise('goods_price', index),
            promise('goods_title', index),
          ]
        ).then(
          () => {
            that.$message({
              message: '验证成功',
              type: 'success'
            })
          }
        ).catch(
          () => {
            that.$message({
              message: '验证失败',
              type: 'error'
            })
          }
        )
        // this.$refs.goods_name[index].validate(valid => {
        //   if (valid) {
        //     console.log(index + "：OK");
        //   } else {
        //     console.log(index + "：NO");
        //     return false;
        //   }
        // })
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
            that.$set(i, 'isset', true);
            return i;
          })
          console.log(that.business_data)
        })
    }
  }
</script>

<style scoped>


</style>
