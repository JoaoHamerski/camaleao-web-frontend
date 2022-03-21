import Vue from 'vue'
import VueMeta from 'vue-meta'
import VueToast from 'vue-toast-notification'
import VueTippy from 'vue-tippy'
import helpers from '@/utils/helpers'
import 'cleave.js/dist/addons/cleave-phone.br'

const custom = {
  install (Vue) {
    Vue.prototype.$helpers = helpers
  }
}

Vue.use(VueTippy, {
  duration: 150,
  arrow: true,
  appendTo: () => document.querySelector('#app')
})

Vue.use(VueToast, {
  position: 'top-right'
})

Vue.use(VueMeta)

Vue.use(custom)
