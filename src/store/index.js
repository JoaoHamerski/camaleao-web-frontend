import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from './modules/Auth'
import * as sidebar from './modules/Sidebar'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    auth,
    sidebar
  },
  getters: {
    apiURL () {
      return process.env.VUE_APP_API_URL
    }
  }
})
