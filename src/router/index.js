import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import main_list from '../components/main_list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      //定义根路由
      name: 'root',
      path: '/',
      components: {
        main: login
      }
    },
    {
      path: '/main_list',
      name: 'main_list',
      components: {
        main: main_list
      }
    },
  ]
})
