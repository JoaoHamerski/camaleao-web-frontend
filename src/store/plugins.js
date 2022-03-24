import { throttle } from 'lodash-es'

const MOBILE_BREAKPOINT = 576

const plugin = (store) => {
  const onResize = throttle(() => {
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT

    store.commit('SET_IS_MOBILE', isMobile)
  }, 600)

  window.addEventListener('resize', onResize)
}

export default plugin
