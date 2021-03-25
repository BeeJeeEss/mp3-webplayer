import Vue from 'vue'
import App from './App.vue'
import Vuex from './store/index'


Vue.use(Vuex)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store: Vuex,
}).$mount('#app')
