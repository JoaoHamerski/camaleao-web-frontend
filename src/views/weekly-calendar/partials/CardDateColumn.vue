<script lang="jsx">
import roles from '@/constants/roles'
import filesMixin from '@/mixins/filesMixin'
import classNames from 'classnames'

import CardDateColumnOrder from './CardDateColumnOrder.vue'
import CardDateColumnHeader from './CardDateColumHeader.vue'
import CardDateColumnSubHeader from './CardDateColumnSubHeader.vue'
const CardDateColumnDragged = () => import('./CardDateColumnDragged.vue')
import Draggable from 'vuedraggable'

export const DRAG_STATES = {
  DRAG_LEAVE: 0,
  DRAG_ENTER: 1
}

const renderCardDateColumnHeader = (h, context) => {
  const events = {
    'header-clicked': context.onHeaderClicked
  }

  return (
    <CardDateColumnHeader
      {...{
        attrs: {date: context.date, active: context.active},
        on: {...events}
      }}
    />
  )
}

const renderCardDateColumnDragged = (h, context) => {
  const events = {
    'drag-state-changed': context.onDragStateChanged,
    'file-drop': context.onFileDrop
  }

  return (
    <CardDateColumnDragged {...{on: {...events}}} />
  )
}

const renderCardDateColumnOrder = (h, context, order, index) => {
  const events = {
    'cancel-create': context.onCancelCreate,
    'order-created': context.onOrderCreated,
  }

  return (
    <CardDateColumnOrder
      key={`order__${order.id}`}
      order={order}
      index={index}
      is-active={context.active}
      is-compact={context.isCompact}
      is-orderable={context.isOrderable && context.active}
      field={context.field}
      orders={context.date.orders}
      {...{on: { ...events }}}
    />
  )
}

const renderOrders = (h, context) => {
  return context.date.orders.map(
    (order, index) => renderCardDateColumnOrder(h, context, order, index)
  )
}

const renderCardDateColumnOrders = (h, context) => {
  const events = {
    start: () => { context.drag = true },
    end: () => { context.drag = false }
  }

  const attrs = {
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "ghost"
  }

  if (context.hasOrders && context.isOrderable && context.active) {
    return (
      <Draggable
        tag="div"
        list={context.date.orders}
        {...{
          on: {...events },
          attrs: {...attrs}
        }}
      >
        <TransitionGroup
          class={classNames(context.active && 'row gx-2')}
          tag="div"
          type="transition"
          name={!context.drag ? 'flip-list' : null}
        >
          { renderOrders(h, context) }
        </TransitionGroup>
      </Draggable>
    )
  }

  if (context.hasOrders) {
    return (
      <div class={classNames(context.active && 'row gx-2')}>
        { renderOrders(h, context) }
      </div>
    )
  }

  return (
    <span
      class={classNames([
        'd-block text-center text-secondary py-3',
        {
          'py-5 my-5 h6': context.active,
          'small': !context.active
        }
      ])}
    >
      SEM PEDIDOS
    </span>
  )
}

const renderCardDateSubHeader = (h, context) => {
  const events = {
    'orderable-mode-changed': context.onOrderableModeChanged,
    'orderable-mode-canceled': context.onOrderableModeCanceled,
    'compact-mode-changed': context.onCompactModeChange,
    'input-image': context.onImageUploaded,
  }

  const { date, isCompact, isOrderable, field } = context

  if (!context.active) {
    return
  }

  return (
    <CardDateColumnSubHeader
      {...{
        attrs: {date, isCompact, isOrderable, field },
        on: {...events}
      }}
    />
  )
}

const renderCardDateColumnBody = (h, context) => {
  if (context.dragState === DRAG_STATES.DRAG_ENTER) {
    return renderCardDateColumnDragged(h, context)
  }

  return (
    <div
      class={classNames(['card-body px-2'])}
      vOn:dragenter_stop_prevent={context.onDragOverCard}
    >
      { renderCardDateSubHeader(h, context) }
      { renderCardDateColumnOrders(h, context) }
    </div>
  )
}

export default {
  mixins: [filesMixin],
  props: {
    field: {
      type: String,
      required: true
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
    },
    isOrderable: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      DRAG_STATES,
      dragState: DRAG_STATES.DRAG_LEAVE,
      drag: false
    }
  },
  computed: {
    hasOrders () {
      return this.date.orders.length
    }
  },
  methods: {
    onOrderableModeCanceled () {
      this.$emit('orderable-mode-canceled')
    },
    onOrderableModeChanged (value) {
      this.$emit('orderable-mode-changed', value)
    },
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
    onDragOverCard () {
      if (this.isOrderable) {
        return
      }

      if (this.$helpers.canView(roles.GERENCIA, roles.ATENDIMENTO, roles.DESIGN)) {
        this.dragState = DRAG_STATES.DRAG_ENTER
      }
    }
  },
  render (h) {
    return (
      <div
        class={classNames([
          'col card-column', this.active && 'active'
        ])}
      >
        <div class="card position-relative">
          <AppLoading v-show={this.isLoading && this.active} />

          { renderCardDateColumnHeader(h, this) }
          { renderCardDateColumnBody(h, this) }
        </div>
      </div>
    )
  }
}
</script>

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
