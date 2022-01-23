import './sass/app.scss'
import '@/components'
import './plugins'
import 'bootstrap'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createProvider } from './vue-apollo'

Vue.config.productionTip = false

store.dispatch('sidebar/bootstrap')

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
