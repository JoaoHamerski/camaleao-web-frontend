<script>
import { faBoxes } from '@fortawesome/free-solid-svg-icons'
import { formatDatetime } from '@/utils/formatters'
import ActivityItemChanges from './ActivityItemChanges'

const ICONS_MAP = {
  orders: faBoxes
}

export default {
  components: {
    ActivityItemChanges
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      icons: { ...ICONS_MAP }
    }
  },
  computed: {
    description () {
      return JSON.parse(this.item.description)
    },
    text () {
      const { text, subjectProp, causerProp } = this.description

      const causer = this.getCauser(causerProp)
      const subject = this.getSubject(subjectProp)

      return text
        .replace(':causer', causer)
        .replace(':subject', subject)
    }
  },
  methods: {
    formatDatetime,
    getCauser (causerProp) {
      if (this.item.causer) {
        return `<b>${this.item.causer[causerProp]}</b>`
      }

      return `<del>${this.description.causer}</del>`
    },
    getSubject (subjectProp) {
      if (this.item.subject) {
        return `<b>${this.item.subject[subjectProp]}</b>`
      }

      return `<del class="fw-bold">${this.description.subject}</del>`
    }
  }
}
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <li class="list-group-item">
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <FontAwesomeIcon
          :icon="icons.orders"
          fixed-width
          class="text-primary me-2"
        />
        <span v-html="text" />
      </div>
      <div class="small text-center">
        <div>
          {{ formatDatetime(item.created_at) }}
        </div>
        <div>{{ formatDatetime(item.created_at, 'HH:mm') }}</div>
      </div>
    </div>

    <ActivityItemChanges
      v-if="description.type === 'updated'"
      :item="item"
    />
  </li>
</template>
