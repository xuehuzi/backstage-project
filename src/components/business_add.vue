<template>
  <div class="business_add">
    <h3 class="business_tips">店铺信息</h3>
    <el-form :model="business_msg" :rules="rules" ref="business_msg" class="submit-btn">
      <div>
        <p class="upload_text">店铺图标</p>
        <div class="upload">
          <img class="upload_img" :src="business_icon" alt="">
          <input @change="get_url" class="upload_input" ref="myicon" type="file" accept=".jpg, .jpeg"/>
          <i class="upload_icon">+</i>
        </div>
      </div>
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
        <el-table-column min-width="75%" label="商品名称">
          <template slot-scope="scope">
            <el-form-item :prop="'goods.'+scope.$index+'.goods_name'" :rules="rules.goods_name">
              <el-input v-model="scope.row.goods_name"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column min-width="20%" label="商品价格">
          <template slot-scope="scope">
            <el-form-item :prop="'goods.'+scope.$index+'.price'" :rules="rules.price">
              <el-input placeholder="价格" v-model="scope.row.price"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column min-width="20%" label="商品数量">
          <template slot-scope="scope">
            <el-form-item :prop="'goods.'+scope.$index+'.numb'" :rules="rules.numb">
              <el-input v-model.number="scope.row.numb"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column min-width="110%" label="商品说明">
          <template slot-scope="scope">
            <el-form-item :prop="'goods.'+scope.$index+'.title'" :rules="rules.title">
              <el-input v-model="scope.row.title"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column min-width="20%" label="照片：">
          <template slot-scope="scope">
            <div class="goods_upload_bg">
              <div class="goods_upload">
                <img class="goods_upload_img" :src="goods_icon[scope.$index]" alt="">
                <input @change="goods_url(scope.$index)" class="goods_upload_input" :ref="'goods_pic'+scope.$index"
                       type="file"
                       accept=".jpg, .jpeg"/>
                <i class="goods_upload_icon">+</i>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="20%" label="操作">
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
          icon: '',
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
        },
        business_icon: '',
        goods_icon: []
      }
    },
    methods: {
      newsubmit: function (business_msg) {
        let business_data = AV.Object.extend("business_data");
        let business_Data = new business_data();
        let obj;
        let files = this.$refs.myicon.files;

        this.$refs[business_msg].validate((valid) => {//表单验证函数
          if (valid) {//验证成功
            if (files.length) {
              let file = new AV.File(files[0].name, files[0]);
              this.business_msg.icon = file.attributes.url;
              file.save().then(//店铺图上传
                (file) => {
                  this.business_msg.icon = file.attributes.url;
                  console.log(1)
                }, function (error) {
                  console.log(error)// 保存失败，可能是文件无法被读取，或者上传过程中出现问题
                }
              )
            } else {
              alert('检查店铺图')
            }

            for (let i = 0; i < this.business_msg.goods.length; i++) {//商品图
              let files = this.$refs['goods_pic' + [i]].files;
              if (files.length) {
                let file = new AV.File(files[0].name, files[0]);
                if (this.$refs['goods_pic' + [i]].value !== '') {
                  file.save()
                    .then(
                      (file) => {
                        this.business_msg.goods[i].goods_pic = file.attributes.url;
                        console.log(2)
                      })
                    .then(
                      () => {
                        obj = JSON.parse(JSON.stringify(this.business_msg));
                        business_Data.set('icon', obj.icon);
                        business_Data.set('name', obj.name);
                        business_Data.set('tel', obj.tel);
                        business_Data.set('address', obj.address);
                        business_Data.set('notice', obj.notice);
                        business_Data.set('goods', obj.goods);
                        console.log(3)
                      })
                    .then(
                      () => {
                        console.log(4)
                        business_Data.save();
                      })
                    .then(
                      () => {
                        alert('提交成功')
                      })
                }
              } else {
                alert('检查商品图')
              }
            }

          } else {
            alert('表单验证失败')
          }
        })

      },

      add: function () {
        this.business_msg.goods.push({
          goods_name: '',
          price: '',
          numb: '',
          title: '',
          goods_pic: ''
        })
      },

      btn_del: function (index) {
        this.business_msg.goods.splice(index, 1)
      },

      get_url: function () {
        let files = this.$refs.myicon.files;
        let url = window.URL || window.webkitURL;
        this.business_icon = url.createObjectURL(files[0]);
      },
      goods_url: function (index) {
        let files = this.$refs['goods_pic' + [index]].files;
        let url = window.URL || window.webkitURL;
        this.goods_icon.push(url.createObjectURL(files[0]));
        // console.log(url.createObjectURL(files[0]));
        // console.log(this.$refs['goods_pic' + [index]].files)
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

  .upload_text {
    display: flex;
    margin-top: 15px;
    margin-bottom: -10px;
    font-size: 14px;
    color: #606266;
  }

  .upload {
    margin: 20px 0;
    width: 150px;
    height: 150px;
    border: 1px dashed #c0ccda;
    display: flex;
  }

  .upload:hover {
    border-color: #409eff;
  }

  .upload_img {
    position: absolute;
    width: 150px;
    height: 150px;
  }

  .upload_input {
    width: 150px;
    height: 150px;
    opacity: 0;
    position: absolute;
  }

  .upload_input:hover {
    cursor: pointer;
  }

  .upload_icon {
    width: 150px;
    height: 150px;
    line-height: 150px;
    font-size: 28px;
    text-align: center;
  }

  .goods_upload_bg {
    display: flex;
    justify-content: center;
  }

  .goods_upload {
    width: 80px;
    height: 80px;
    border: 1px dashed #c0ccda;
    display: flex;
  }

  .goods_upload:hover {
    border-color: #409eff;
  }

  .goods_upload_img {
    position: absolute;
    width: 80px;
    height: 80px;

  }

  .goods_upload_input {
    width: 80px;
    height: 80px;
    opacity: 0;
    position: absolute;
  }

  .goods_upload_input:hover {
    cursor: pointer;
  }

  .goods_upload_icon {
    width: 80px;
    height: 80px;
    line-height: 80px;
    font-size: 28px;
    text-align: center;
  }

</style>
