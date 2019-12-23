<template>
  <div class="aside_lists">
    <el-row class="tac">
      <el-col class="user_active" :span="12">
        <el-menu
          router :default-active="$route.path"
          default-active="2"
          class="el-menu-vertical-demo user_active_border"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu
            v-for="(list,father_index) in lists"
            :key='father_index'
            :index="String(father_index+1)">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{list.title}}</span>
            </template>
            <el-menu-item-group class="user_active_indent">
              <el-menu-item
                v-for="(son_list,son_index) in list.son"
                :key='son_index'
                :index="son_list.router">
                {{son_list.name}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "aside_lists",
    components:{},
    data: function () {
      return {
        lists: [
          {
            title: '数据图表',
            son: [
              {
                name: '注册数据',
                router:'/main_list/user_data'
              },
              {
                name: '订单数据',
                router:'/main_list/order_data'
              },

            ]
          },
          {
            title: '信息查询',
            son: [
              {
                name: '用户查询',
                router:'/main_list/user_query'
              },
              {
                name: '商户查询',
                router:'/main_list/business_query'
              },
            ]
          },
        ]
      }
    }
  }
</script>

<style scoped>
  .user_active {
    width: 100%;
  }

  .user_active_border {
    border-right: none;
  }

  .user_active_indent {
    text-indent: 35px;
  }
</style>
