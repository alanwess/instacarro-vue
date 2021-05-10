import Vue from 'vue'
import Router from 'vue-router'
import Produtos from '@/views/Produtos'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/produtos' },
    {
      path: '/produtos',
      name: 'Produtos',
      component: Produtos
    }
  ]
})