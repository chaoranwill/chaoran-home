import Vue from 'vue'
import Router from 'vue-router'
import TransitionTop from '@/pages/pageSwitch/TransitionTop'
import TransitionLeft from '@/pages/pageSwitch/TransitionLeft'
import TransitionLeftIndex from '@/pages/pageSwitch/TransitionLeftIndex'
import TransitionLeftPage1 from '@/pages/pageSwitch/TransitionLeftPage1'
import TransitionLeftPage2 from '@/pages/pageSwitch/TransitionLeftPage2'

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/TransitionTop',
      name: 'TransitionTop',
      component: TransitionTop
    },
    {
      path: '/TransitionLeft',
      name: 'TransitionLeft',
      component: TransitionLeft,
      children: [{
        path: '/',
        name: 'index',
        component: TransitionLeftIndex
      },{
        path: '/TransitionLeft/page1',
        name: 'page1',
        component: TransitionLeftPage1
      },{
        path: '/TransitionLeft/page2',
        name: 'page2',
        component: TransitionLeftPage2
      }]
    }
  ]
})

export default router