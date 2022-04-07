import Vue from 'vue'
import VueMeta from 'vue-meta'
import Toast, { POSITION } from 'vue-toastification'
import VueTippy from 'vue-tippy'
import helpers from '@/utils/helpers'
import store from '@/store'

const custom = {
  install (Vue) {
    Vue.prototype.$helpers = helpers
    Object.defineProperty(Vue.prototype, '$isMobile', {
      get: () => store.state.isMobile
    })
  }
}

Vue.use(VueTippy, {
  duration: 150,
  arrow: true,
  appendTo: () => document.querySelector('#app')
})

Vue.use(Toast, {
  containerClassName: 'camaleao-container',
  position: store.state.isMobile
    ? POSITION.BOTTOM_CENTER
    : POSITION.TOP_RIGHT
})

Vue.use(VueMeta)

Vue.use(custom)
