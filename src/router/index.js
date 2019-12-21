import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import main_list from '../components/main_list'
import user_data from '../components/user_data'
import order_data from '../components/order_data'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/main_list',
      name: 'main_list',
      component: main_list,
      children: [
        {
          path: 'user_data',
          name: 'user_data',
          components: {
            main_content: user_data
          }
        },
        {
          path: 'order_data',
          name: 'order_data',
          components: {
            main_content: order_data
          }
        }
      ]
    },

  ]
})
