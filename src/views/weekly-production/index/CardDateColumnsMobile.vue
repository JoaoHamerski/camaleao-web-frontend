<script>
import { renderCardDateColumn } from './TheWeeklyProductionBody.vue'
import { Carousel, Slide } from 'vue-carousel'

function renderCardDateColumnsMobile (h, context) {
  return (
    <Carousel
      ref="carousel"
      per-page={1}
      pagination-enabled={false}
      min-swipe-distance={40}
    >
      {
        context.dates.map((date) => {
          return (
            <Slide key={`${date.date}__slide`}>
              { renderCardDateColumn(h, context, date) }
            </Slide>
          )
        })
      }
    </Carousel>
  )
}

export default {
  props: {
    context: {
      type: Object,
      required: true
    }
  },
  render(h) {
    return renderCardDateColumnsMobile(h, this.context)
  }
}
</script>
