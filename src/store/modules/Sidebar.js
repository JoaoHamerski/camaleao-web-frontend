import Cookies from 'js-cookie'

const DEFAULT_SIDEBAR_STATE = true

const hasSidebarCookie = () => {
  return Cookies.get('is_sidebar_active') !== undefined
}

const hasSidebarState = (state) => {
  return state.isSidebarActive !== undefined
}

const getSidebarCookie = () => {
  return Cookies.get('is_sidebar_active') === 'true'
}

export const namespaced = true

export const state = {
  isSidebarActive: undefined
}

export const getters = {
  isSidebarActive (state) {
    if (!hasSidebarState(state)) {
      return getSidebarCookie()
    }

    return state.isSidebarActive
  }
}

export const actions = {
  bootstrap ({ state, commit }) {
    if (!hasSidebarCookie()) {
      commit('SET_SIDEBAR_STATE', DEFAULT_SIDEBAR_STATE)
    }
  }
}

export const mutations = {
  SET_SIDEBAR_STATE (state, sidebarState) {
    Cookies.set('is_sidebar_active', sidebarState ? 'true' : 'false')

    state.isSidebarActive = sidebarState
  }
}
