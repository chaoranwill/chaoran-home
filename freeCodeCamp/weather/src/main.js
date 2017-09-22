// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import map from 'lodash/map'
import components from '@/components'

Vue.config.productionTip = false

const key = window.key = 'd3bc5bd960634da7af9e9a6aa6d181af'
const cip = window.cip = returnCitySN['cip']


$.get('https://free-api.heweather.com/v5/now',{city: cip,key:key}, function (res) {
  console.log(res)
})
console.log(components)
map(components, (cmp, name) => Vue.component(cmp.name, cmp))
//alert(returnCitySN['cip'] + returnCitySN['cname']);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
