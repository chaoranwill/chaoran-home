import Vue from 'vue'
import Router from 'vue-router'
import Transition from '@/Transition'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Transition',
      name: 'Transition',
      component: Transition
    }
  ]
})
