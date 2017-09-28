// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import map from 'lodash/map'
import components from './components'
import VueResource from 'vue-resource'

Vue.config.productionTip = false

Vue.use(VueResource)

console.log(components)
map(components, (cmp, name) => Vue.component(cmp.name, cmp))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
