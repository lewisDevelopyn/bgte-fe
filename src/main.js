import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router';
import store from './store';
import { API } from './utils/axios'

Vue.config.productionTip = false

require('@/assets/main.scss');

Vue.use(Vuex)
Vue.prototype.$http = API;


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
