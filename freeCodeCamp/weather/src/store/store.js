import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const MONTH = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const store = new Vuex.Store({
  state: {
    'month': MONTH
  },
  actions: {

  },
  mutations: {

  },
  getters: {
    
  },
  modules: {

  }
})

export default store