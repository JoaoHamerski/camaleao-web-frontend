import Vue from 'vue'
import VueMeta from 'vue-meta'
import VueChimera from 'vue-chimera'
import VueToast from 'vue-toast-notification'
import VueTippy from 'vue-tippy'
import client from '@/request'
import helpers from '@/utils/helpers'
import 'cleave.js/dist/addons/cleave-phone.br'

const custom = {
  install (Vue) {
    Vue.prototype.$helpers = helpers
  }
}

Vue.use(VueTippy, {
  duration: 150,
  arrow: true
})

Vue.use(VueToast, {
  position: 'top-right'
})

Vue.use(VueMeta)

Vue.use(custom)
Vue.use(VueChimera, {
  axios: client
})
