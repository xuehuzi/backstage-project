import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import main_list from '../components/main_list'
import user_data from '../components/user_data'
import order_data from '../components/order_data'
import user_query from '../components/user_query'
import business_query from '../components/business_query'

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
        },
        {
          path: 'business_query',
          name: 'business_query',
          components: {
            main_content: business_query
          }
        },
        {
          path: 'user_query',
          name: 'user_query',
          components: {
            main_content: user_query
          }
        }
      ]
    },

  ]
})
