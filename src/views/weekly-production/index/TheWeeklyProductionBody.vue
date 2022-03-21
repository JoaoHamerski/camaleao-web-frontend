<script>
import CardDateColumn from '../partials/CardDateColumn'
import pasteFilesMixin from '@/mixins/pasteFilesMixin'
import filesMixin from '@/mixins/filesMixin'
import Cookies from 'js-cookie'

export default {
  components: {
    CardDateColumn
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
  }
}
</script>

<template>
  <div
    class="position-relative row gx-1"
    :class="!dates.length && 'py-5'"
  >
    <AppLoading v-show="isLoading" />

    <template v-for="date in dates">
      <CardDateColumn
        :key="date.date"
        :date="date"
        :selected-date="selectedDate"
        :active="activeDate === date.date"
        :is-compact="isCompact"
        @is-compact:update="onCompactModeChange"
        @change-state="onStateChanged"
        @uploaded-file="onFileUploaded"
        @cancel-create="onCancelCreate"
      />

      <div
        v-show="activeDate === date.date"
        :key="`${date.date}-placeholder`"
        class="col"
      />
    </template>
  </div>
</template>
