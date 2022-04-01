<script>
import pasteFilesMixin from '@/mixins/pasteFilesMixin'
import filesMixin from '@/mixins/filesMixin'
import Cookies from 'js-cookie'
import classNames from 'classnames'
import CardDateColumn from '../partials/CardDateColumn'
import { Carousel, Slide } from 'vue-carousel'
import { DateTime } from 'luxon'

function renderCardDatePlaceholder(h, date) {
  return (
    <div
      class="col"
      key={`${date.date}__placeholder`}
    />
  )
}

function renderCardDateColumn (h, context, date) {
  const listeners = {
    'is-compact:update': context.onCompactModeChange,
    'change-state': context.onStateChanged,
    'uploaded-file': context.onFileUploaded,
    'cancel-create': context.onCancelCreate
  }

  return (
    <CardDateColumn
      class="mb-2"
      key={`${date.date}__date`}
      date={date}
      selected-date={context.selectedDate}
      active={context.activeDate === date.date || context.$isMobile}
      is-compact={context.isCompact}
      {...{on: listeners}}
    />
  )
}

function renderCardDateColumns (h, context) {
  const shouldRenderPlaceholder = (date) => context.activeDate === date.date

  return context.dates.map((date) => {
    return [
      renderCardDateColumn(h, context, date),
      shouldRenderPlaceholder(date) && renderCardDatePlaceholder(h, date)
    ]
  })
}

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
  components: {
    CardDateColumn,
  },
  mixins: [filesMixin, pasteFilesMixin],
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    selectedDate: {
      type: String,
      default: ''
    },
    dates: {
      type: Array,
      default: () => []
    },
    orderToCreate: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      activeDate: '',
      isCompact: false
    }
  },
  watch: {
    dates (dates) {
      if (!this.$isMobile) {
        return
      }

      if (dates.length) {
        this.$nextTick(() => {
          this.goToTodayDate()
        })
      }
    }
  },
  mounted () {
    window.addEventListener('keydown', this.disableActiveCard)
    window.addEventListener('paste', this.onPasteEvent)
    this.isCompact = Cookies.get('production-card-compact-mode') === 'true' ?? false

    if (this.$isMobile && this.dates) {
      this.$nextTick(() => {
        this.goToTodayDate()
      })
    }
  },
  beforeDestroy () {
    window.removeEventListener('keydown', this.disableActiveCard)
    window.removeEventListener('paste', this.onPasteEvent)
  },
  methods: {
    goToTodayDate () {
      const today = DateTime.now().toFormat('yyyy-MM-dd')
      const index = this.dates.findIndex(date => date.date === today)

      if (index === -1) {
        this.$refs.carousel.goToPage(0)
        return
      }

      this.$refs.carousel.goToPage(index)
    },
    afterPaste (files) {
      const validFiles = this.getOnlyValidFiles(files, ['image'])

      if (!validFiles.length) {
        this.$toast.error('Nenhum arquivo válido foi detectado')
        return
      }

      if (this.activeDate === '') {
        this.$toast.warning('Abra um dia da semana para colar uma imagem')
        return
      }

      if (!validFiles.length) {
        return
      }

      this.onFileUploaded({ file: validFiles[0], date: this.activeDate })
    },
    onStateChanged ({ date, active }) {
      if (active) {
        this.activeDate = date
        return
      }

      this.activeDate = ''
    },
    disableActiveCard ({ key }) {
      if (key === 'Escape') {
        this.activeDate = ''
      }
    },
    onFileUploaded ({ file, date }) {
      if (this.activeDate === '') {
        this.activeDate = date
      }

      this.$emit('uploaded-file', {
        file, date
      })
    },
    onCancelCreate (order) {
      this.$emit('cancel-create', order)
    },
    onCompactModeChange (value) {
      Cookies.set('production-card-compact-mode', value)
      this.isCompact = value
    }
  },
  render (h) {
    return (
      <div class={classNames(['position-relative row gx-1', {
        'py-5': !this.dates.length
      }])}
      >
        { this.isLoading && <AppLoading /> }

        {
          this.$isMobile
            ? renderCardDateColumnsMobile(h, this)
            : renderCardDateColumns(h, this)
        }
      </div>
    )
  }
}
</script>
