<script>
import {
  faBoxes,
  faUsers,
  faDollarSign,
  faStickyNote,
  faFunnelDollar,
  faCity,
  faTruck,
  faBuilding,
  faTshirt,
} from '@fortawesome/free-solid-svg-icons'
import { formatDatetime } from '@/utils/formatters'

const ICONS_MAP = {
  orders: faBoxes,
  clients: faUsers,
  payments: faDollarSign,
  notes: faStickyNote,
  expenses: faFunnelDollar,
  users: faUsers,
  cities: faCity,
  shipping_companies: faTruck,
  branches: faBuilding,
  configs_orders: faBoxes
}

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    description: {
      type: Object,
      required: true
    },
    attributes: {
      type: Object,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      icons: { ...ICONS_MAP }
    }
  },
  computed: {
    eventType () {
      return this.description.type
    },
    userDeletedItself () {
      return this.eventType === 'deleted'
        && this.description?.causerProps?.name === this.attributes.name
    },
    userUpdatedItself () {
      return this.eventType === 'updated'
       && this.description?.causerProps?.name === this.attributes.name
    },
    isItemDeleted () {
      if (this.description.type === 'configs') {
        return false
      }

      return !this.item.subject && this.description.type !== 'deleted'
    }
  },
  methods: {
    formatDatetime
  }
}
</script>
<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="d-flex flex-column flex-sm-row justify-content-between">
    <div
      :class="{
        'text-decoration-line-through': isItemDeleted
      }"
    >
      <FontAwesomeIcon
        :icon="icons[item.log_name]"
        fixed-width
        class="me-2"
        :class="{
          'text-success': eventType === 'created',
          'text-primary': eventType === 'updated',
          'text-danger': eventType === 'deleted',
        }"
      />
      <span v-if="userDeletedItself">
        <b>{{ attributes.name }}</b> deletou a própria conta
      </span>
      <span v-else-if="userUpdatedItself">
        <b>{{ item.subject.name || attributes.name }}</b> alterou dados da própria conta
      </span>
      <span
        v-else
        :class="$isMobile && 'small'"
        v-html="text"
      />
    </div>
    <div class="small text-secondary text-sm-end my-2 my-sm-0 ms-0 ms-sm-2">
      <div>
        {{ formatDatetime(item.created_at) }}
        <br class="d-none d-sm-block">
        {{ formatDatetime(item.created_at, 'HH:mm') }}
      </div>
    </div>
  </div>
</template>
