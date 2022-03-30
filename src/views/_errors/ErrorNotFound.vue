<script>
import ErrorPage from './ErrorPage.vue'

export default {
  functional: true,
  render (h) {
    return (
      <ErrorPage error={404} />
    )
  }
}
</script>
