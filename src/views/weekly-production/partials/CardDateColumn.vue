<script>
import roles from '@/constants/roles'
import filesMixin from '@/mixins/filesMixin'

import CardDateColumnOrder from './CardDateColumnOrder.vue'
import CardDateColumnHeader from './CardDateColumHeader.vue'
import CardDateColumnSubHeader from './CardDateColumnSubHeader.vue'

export const DRAG_STATES = {
  DRAG_LEAVE: 0,
  DRAG_ENTER: 1
}

export default {
  components: {
    CardDateColumnOrder,
    CardDateColumnHeader,
    CardDateColumnDragged: () => import('./CardDateColumnDragged.vue'),
    CardDateColumnSubHeader
  },
  mixins: [filesMixin],
  props: {
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
      DRAG_STATES,
      dragState: DRAG_STATES.DRAG_LEAVE
    }
  },
  computed: {
    hasOrders () {
      return this.date.orders.length
    }
  },
  methods: {
    onCompactModeChange (value) {
      this.$emit('is-compact:update', value)
    },
    onHeaderClicked({date, active}) {
      this.$emit('change-state', {date, active})
    },
    onDragStateChanged(state) {
      this.dragState = state
    },
    async onImageUploaded (event) {
      try {
        const files = await this.getBase64Files(event)
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
    },
    onDragOverCard (event) {
      if (this.$helpers.canView(roles.GERENCIA, roles.ATENDIMENTO, roles.DESIGN)) {
        this.dragState = DRAG_STATES.DRAG_ENTER
      }
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
      <CardDateColumnHeader
        v-bind="{ date, active }"
        @header-clicked="onHeaderClicked"
      />

      <CardDateColumnDragged
        v-if="dragState === DRAG_STATES.DRAG_ENTER"
        @drag-state-changed="onDragStateChanged"
        @file-drop="onFileDrop"
      />

      <div
        v-else
        class="card-body px-2"
        :class="active && 'row gx-2'"
        @dragenter.prevent.stop="onDragOverCard"
      >
        <CardDateColumnSubHeader
          v-show="active"
          v-bind="{ date, isCompact }"
          @compact-mode-changed="onCompactModeChange"
          @input-image="onImageUploaded"
        />

        <template v-if="hasOrders">
          <CardDateColumnOrder
            v-for="order in date.orders"
            :key="`order__${order.id}`"
            :order="order"
            :is-active="active"
            :is-compact="isCompact"
            @cancel-create="onCancelCreate"
            @order-created="onOrderCreated"
          />
        </template>
        <span
          v-else
          class="d-block text-center text-secondary py-3"
          :class="{
            'py-5 my-5 h6': active,
            'small': !active
          }"
        >
          SEM PEDIDOS
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/sass/bootstrap-utilities";

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
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0 3px 5px rgba(0, 0, 0, .1);
  }

  @include media-breakpoint-down (sm) {
    &.active {
      width: 95%;
    }
  }

  @include media-breakpoint-up (sm) {
    .card-body {
      overflow-y: auto;
      max-height: 69vh;
    }
  }

  @include media-breakpoint-down (sm) {
    .card-body {
      overflow-y: auto;
      max-height: 60vh;
    }
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

  .card-body::-webkit-scrollbar-thumb {
    border-radius: 3rem;
    border: 1px solid lighten($primary, 40%);
    background-color: $primary;

    &:hover {
      background-color: lighten($primary, 5%);
    }
  }
}


@include media-breakpoint-down (sm) {
  .card-column {
    width: 100%;

    &.active {
      position: static;
      right: 0;
      transform: none;
    }
  }
}
</style>
