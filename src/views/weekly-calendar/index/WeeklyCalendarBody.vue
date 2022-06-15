<script>
import pasteFilesMixin from '@/mixins/pasteFilesMixin'
import filesMixin from '@/mixins/filesMixin'
import Cookies from 'js-cookie'
import classNames from 'classnames'

const CardDateColumnsMobile = () => import('./CardDateColumnsMobile.vue')
const CardDateColumn = () => import('../partials/CardDateColumn.vue')

function renderCardDatePlaceholder (h, date) {
  return (
    <div
      class="col"
      key={`${date.date}__placeholder`}
    />
  )
}

export const renderCardDateColumn = (h, context, date) => {
  const listeners = {
    'is-compact:update': context.onCompactModeChange,
    'change-state': context.onStateChanged,
    'uploaded-file': context.onFileUploaded,
    'cancel-create': context.onCancelCreate,
    'orderable-mode-canceled': context.onOrderableModeCanceled,
    'orderable-mode-changed': context.onOrderableModeChanged
  }

  return (
    <CardDateColumn
      class="mb-2"
      key={`${date.date}__date`}
      date={date}
      active={context.isColumnActive(date)}
      is-compact={context.isCompact}
      is-orderable={context.isOrderable}
      field={context.field}
      {...{on: listeners}}
    />
  )
}

function shouldRenderPlaceholder (context, date) {
  return context.activeDate === date.date
}

function renderCardDateColumns (h, context) {
  return context.dates.map((date) => {
    return [
      renderCardDateColumn(h, context, date),
      shouldRenderPlaceholder(context, date) && renderCardDatePlaceholder(h, date)
    ]
  })
}

export default {
  mixins: [filesMixin, pasteFilesMixin],
  props: {
    field: {
      type: String,
      required: true
    },
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
      isCompact: false,
      isOrderable: false,
      modalReport: {
        value: false,
        src: ''
      }
    }
  },
  mounted () {
    window.addEventListener('keydown', this.disableActiveCard)
    window.addEventListener('paste', this.onPasteEvent)
    this.isCompact = Cookies.get('production-card-compact-mode') === 'true' ?? false
  },
  beforeDestroy () {
    window.removeEventListener('keydown', this.disableActiveCard)
    window.removeEventListener('paste', this.onPasteEvent)
  },
  methods: {
    onOrderableModeChanged (value) {
      this.isOrderable = value
    },
    onOrderableModeCanceled () {
      this.isOrderable = false
      this.$emit('orderable-mode-canceled')
    },
    isColumnActive (date) {
      return this.activeDate === date.date
        || this.$isMobile
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

      if (this.isOrderable) {
        this.onOrderableModeCanceled()
      }
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
    },
    onReportModalHidden() {
      this.modalReport.src = ''
    }
  },
  render (h) {
    return (
      <div class={classNames(['position-relative h-100 row gx-1', {
        'py-5': !this.dates.length
      }])}
      >
        { this.isLoading && <AppLoading class="py-5" /> }

        {
          this.$isMobile
            ? <CardDateColumnsMobile
                context={this}
              />
            : renderCardDateColumns(h, this)
        }
      </div>
    )
  }
}
</script>
