import './sass/app.scss'
import '@/components'
import Vue from 'vue'
import VueMeta from 'vue-meta'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(VueMeta)
Vue.config.productionTip = false

store.dispatch('sidebar/bootstrap')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
