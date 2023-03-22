import Cookies from 'js-cookie'
import { checkIsMobile } from '@/store/plugins'
import store from '@/store'

const IS_MOBILE = checkIsMobile()
const DEFAULT_SIDEBAR_STATE = !IS_MOBILE

const hasSidebarCookie = () => {
  return Cookies.get('is_sidebar_active') !== undefined
}

const hasSidebarState = (state) => {
  return state.isSidebarActive !== undefined
}

const isSidebarCookieActive = () => {
  return Cookies.get('is_sidebar_active') === 'true'
}

export const namespaced = true

export const state = {
  isSidebarActive: undefined
}

export const getters = {
  isSidebarActive (state) {
    if (!hasSidebarState(state)) {
      return isSidebarCookieActive()
    }

    return state.isSidebarActive
  }
}

export const actions = {
  bootstrap ({ commit }) {
    if (!hasSidebarCookie()) {
      commit('SET_SIDEBAR_STATE', DEFAULT_SIDEBAR_STATE)
    }
  }
}

export const mutations = {
  SET_SIDEBAR_STATE (state, sidebarState) {
    if (!store.state.isMobile) {
      Cookies.set('is_sidebar_active', sidebarState ? 'true' : 'false')
    }

    if (store.state.isMobile && isSidebarCookieActive()) {
      Cookies.set('is_sidebar_active', 'false')
    }

    state.isSidebarActive = sidebarState
  }
}
