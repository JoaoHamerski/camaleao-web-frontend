import Vue from 'vue'
import VueMeta from 'vue-meta'
import VueChimera from 'vue-chimera'
import client from '@/request'
import helpers from '@/utils/helpers'

const custom = {
  install (Vue) {
    Vue.prototype.$helpers = helpers
  }
}

Vue.use(VueMeta)
Vue.use(custom)
Vue.use(VueChimera, {
  axios: client
})
