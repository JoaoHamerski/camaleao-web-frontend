import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from './modules/Auth'
import * as sidebar from './modules/Sidebar'
import plugins, { checkIsMobile } from './plugins'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    auth,
    sidebar
  },
  plugins: [plugins],
  state: {
    isMobile: checkIsMobile(),
    error: null
  },
  mutations: {
    SET_IS_MOBILE (state, isMobile) {
      state.isMobile = isMobile
    },
    SET_ERROR (state, error) {
      state.error = error
    }
  }
})
