import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import List from '@/components/List'
import Edit from '@/components/Edit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/forms',
      name: 'list',
      component: List
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: Edit
    }
  ]
})
