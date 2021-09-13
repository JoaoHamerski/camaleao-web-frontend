<script>
import TheLayout from '../TheLayout'

export default {
  name: 'ClientsLayout',
  render (h) {
    return h(TheLayout, [h('router-view')])
  }
}
</script>
