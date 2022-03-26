import { throttle } from 'lodash-es'

const MOBILE_BREAKPOINT = 575.98

export const checkIsMobile = () => window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches

const plugin = (store) => {
  const onResize = throttle(() => {
    const isMobile = checkIsMobile()

    store.commit('SET_IS_MOBILE', isMobile)
  }, 600)

  window.addEventListener('resize', onResize)
}

export default plugin
