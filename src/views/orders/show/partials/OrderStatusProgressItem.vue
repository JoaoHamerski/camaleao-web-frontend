<script>
import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons'
import { formatDatetime } from '@/utils/formatters'

export default {
  props: {
    concludedStatus: {
      type: Array,
      required: true
    },
    status: {
      type: Object,
      required: true
    }
  },
  computed: {
    isConcludedStatus() {
      const concludedStatusIds = this.concludedStatus.map(({id}) => id)

      return concludedStatusIds.includes(this.status.id)
    },
    getStatus () {
      if (this.isConcludedStatus) {
        return this.concludedStatus.find(status => status.id === this.status.id)
      }

      return this.status
    },
    getIcon () {
      return this.isConcludedStatus
        ? faCheck
        : faMinus
    }
  },
  methods: {
    formatDatetime
  }
}
</script>

<template>
  <li
    class="list-group-item d-flex justify-content-between"
  >
    <div
      :class="{
        'text-success': isConcludedStatus,
        'text-secondary': !isConcludedStatus
      }"
    >
      <div :class="isConcludedStatus && 'fw-bold'">
        <FontAwesomeIcon
          :icon="getIcon"
          fixed-width
        />
        {{ getStatus.text }}
      </div>
      <div
        v-if="isConcludedStatus && getStatus.pivot.user"
        class="small text-secondary"
      >
        {{ getStatus.pivot.user.name }}
      </div>
    </div>
    <div
      v-if="isConcludedStatus"
      class="text-secondary"
    >
      {{ formatDatetime(getStatus.pivot.created_at, 'dd/MM') }}
    </div>
  </li>
</template>
