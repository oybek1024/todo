import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(axios)

new Vue({
  vuetify,
  render: h => h(App),
  router,
}).$mount('#app')
