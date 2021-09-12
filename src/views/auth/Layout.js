import TheLayout from '@/views/TheLayout'

export default {
  name: 'WrapperLayout',
  render (h) {
    return h(TheLayout, {}, [h('router-view')])
  }
}
