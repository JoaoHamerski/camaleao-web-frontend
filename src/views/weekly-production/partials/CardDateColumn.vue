<script>
import { faUpload } from '@fortawesome/free-solid-svg-icons'

import { formatDatetime } from '@/utils/formatters'
import { DateTime } from 'luxon'
import filesMixin from '@/mixins/filesMixin'

import CardDateColumnOrder from './CardDateColumnOrder'

const DRAG_STATES = {
  DRAG_LEAVE: 0,
  DRAG_ENTER: 1
}

export default {
  components: {
    CardDateColumnOrder
  },
  mixins: [filesMixin],
  props: {
    selectedDate: {
      type: String,
      default: ''
    },
    date: {
      type: Object,
      default: () => ({})
    },
    active: {
      type: Boolean,
      default: false
    },
    orderToCreate: {
      type: Object,
      default: null
    },
    isCompact: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      DateTime,
      DRAG_STATES,
      dragState: DRAG_STATES.DRAG_LEAVE,
      compactMode: false,
      icons: {
        faUpload
      }
    }
  },
  computed: {
    isDateToday () {
      return this.date.date === DateTime.now().toISODate()
    },
    cardHeaderClasses () {
      return [
        this.isDateToday ? 'bg-link-success' : 'bg-link-primary'
      ]
    }
  },
  methods: {
    onCompactModeChange (value) {
      this.$emit('is-compact:update', value)
    },
    async onImageUploaded (fileList) {
      try {
        const files = await this.getBase64Files(fileList)
        const validFiles = this.getOnlyValidFiles(files, ['image'])
        const file = validFiles[0]

        if (!validFiles.length) {
          return
        }

        this.$emit('uploaded-file', { file, date: this.date.date })
      } catch (error) {
        this.$toast.error('Ops! Algo deu errado, tente novamente.')
      }
    },
    onCardHeaderClick () {
      this.$emit('change-state', {
        date: this.date.date,
        active: !this.active
      })
    },
    formatDate (date) {
      if (this.active) {
        return formatDatetime(date, 'dd/MM - EEEE')
      }

      return formatDatetime(date, 'dd/MM - EEE')
    },
    onCancelCreate (order) {
      this.$emit('cancel-create', order)
    },
    onOrderCreated (order) {
      this.$emit('order-created', order)
    },
    onFileDrop (event) {
      const { dataTransfer: { files } } = event
      this.dragState = DRAG_STATES.DRAG_LEAVE

      if (!files.length) {
        this.$toast.error('Não foram encontrados arquivos!')
        return
      }

      this.onImageUploaded(files)
    }
  }
}
</script>

<template>
  <div
    class="col card-column"
    :class="active && 'active'"
  >
    <div
      class="card"
    >
      <div
        class="card-header text-white text-center clickable"
        :class="cardHeaderClasses"
        @click.prevent="onCardHeaderClick"
      >
        <b class="text-uppercase">
          {{ formatDate(date.date) }}
        </b>
      </div>
      <div
        v-show="dragState === DRAG_STATES.DRAG_ENTER"
        class="card-body position-relative"
        @dragover.prevent.stop="dragState = DRAG_STATES.DRAG_ENTER"
        @dragleave.prevent.stop="dragState = DRAG_STATES.DRAG_LEAVE"
        @drop.prevent.stop="onFileDrop"
      >
        <div class="pointer-events-none text-center text-success">
          <div
            class="my-4"
            :class="active && 'my-5 py-5'"
          >
            <FontAwesomeIcon
              :icon="icons.faUpload"
              size="2x"
            />
            <div class="mt-2 fw-bold">
              SOLTE AQUI
            </div>
          </div>
        </div>
      </div>
      <div
        v-show="dragState === DRAG_STATES.DRAG_LEAVE"
        class="card-body px-2"
        :class="active && 'row gx-2'"
        @dragenter.prevent.stop="dragState = DRAG_STATES.DRAG_ENTER"
      >
        <div
          v-if="active"
          class="d-flex justify-content-between mb-2"
        >
          <div class="d-inline-block">
            <AppInputFile
              id="orderImage"
              :default-margin="false"
              :disable-input-area="true"
              accept="image/*"
              placeholder="asd"
              @input="onImageUploaded"
            />
          </div>
          <div>
            <AppCheckboxSwitch
              id="compact_mode"
              :value="isCompact"
              @input="onCompactModeChange"
            >
              Modo compacto
            </AppCheckboxSwitch>
          </div>
        </div>

        <template v-if="date.orders.length">
          <CardDateColumnOrder
            v-for="order in date.orders"
            :key="`order-${order.id}`"
            :order="order"
            :is-active="active"
            :selected-date="selectedDate"
            :is-compact="isCompact"
            @cancel-create="onCancelCreate"
            @order-created="onOrderCreated"
          />
        </template>
        <small
          v-else
          class="d-block text-center text-secondary py-3"
          :class="active && 'py-5 my-5'"
        >
          SEM PEDIDOS
        </small>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/sass/variables/_colors";

.drag-enter-overlap {
  z-index: 20;
  color: $success;
  position: absolute;
  background-color: white;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  text-align: center;
  opacity: .8;

  .overlap-text {
    font-weight: bold;
  }
}

.card-column {
  width: 20%;
  transition: width .15s, box-shadow .25s;
  z-index: 1;

  &.active {
    z-index: 10;
    position: absolute;
    transform: translate(50%, 0);
    right: 50%;
    width: 100%;
    box-shadow: 0 3px 5px rgba(0, 0, 0, .1);
  }

  .card-body {
    overflow-y: auto;
    max-height: 69vh;
  }

  .card-body::-webkit-scrollbar-track,
  .card-body::-webkit-scrollbar {
    background-color: white;
  }

  .card-body::-webkit-scrollbar-track {
    background-color: lighten($primary, 40%);
    width: 10px;
  }

  .card-body::-webkit-scrollbar {
    width: 6px;
  }

  .card-body::-webkit-scrollbar-thumb
  {
    border-radius: 3rem;
    border: 1px solid lighten($primary, 40%);
    background-color: $primary;

    &:hover {
      background-color: lighten($primary, 5%);
    }
  }
}

</style>
