<script>
import { renderCardDateColumn } from './WeeklyCalendarBody.vue'
import { Carousel, Slide } from 'vue-carousel'
import { DateTime } from 'luxon'

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
   watch: {
    'context.dates' (dates) {
      if (dates.length) {
        this.$nextTick(() => {
          this.goToTodayDate()
        })
      }
    }
  },
  mounted () {
    if (this.context.dates) {
      this.$nextTick(() => {
        this.goToTodayDate()
      })
    }
  },
  methods: {
    goToTodayDate () {
      const today = DateTime.now().toFormat('yyyy-MM-dd')
      const index = this.context.dates.findIndex(date => date.date === today)

      if (index === -1) {
        this.$refs.carousel.goToPage(0)
        return
      }

      this.$refs.carousel.goToPage(index)
    },
  },
  render(h) {
    return renderCardDateColumnsMobile(h, this.context)
  }
}
</script>
