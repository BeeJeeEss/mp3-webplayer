import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import Vuex from './store/index'
Vue.use(Vuex, axios)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store: Vuex,
}).$mount('#app')
