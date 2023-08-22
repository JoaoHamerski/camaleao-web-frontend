<script>
import { get, map } from 'lodash-es'
import { faCheck, faClock, faUser } from '@fortawesome/free-solid-svg-icons'
import { formatDatetime } from '@/utils/formatters'

export default {
  props: {
    status: {
      type: Object,
      required: true
    },
    confirmedStatus: {
      type: Array,
      required: true
    },
    preConfirmedStatus: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      icons: {
        faCheck,
        faClock,
        faUser
      }
    }
  },
  computed:{
    isStepPreConfirmed () {
      if (!this.preConfirmedStatus) {
        return false
      }

      return this.status.order <= this.preConfirmedStatus.order
    },
    isStepConfirmable () {
      const concludedStatusIds = map(this.confirmedStatus, 'id')

      if (concludedStatusIds.includes(this.status.id)) {
        return false
      }

      return true
    },
    isStepConfirmed () {
      return this.confirmedStatus.some(confirmed => confirmed.id === this.status.id)
    },
    itemClass () {
      if (this.isStepConfirmed) {
        return 'step-confirmed'
      }

      if (this.isStepPreConfirmed) {
        return 'step-pre-confirmed'
      }

      if (this.isStepConfirmable) {
        return 'step-confirmable'
      }


      return ''
    }
  },
  methods: {
    get,
    formatDatetime,
    onStepClick (status) {
      if (this.isStepConfirmed) {
        return
      }

      this.$emit('step-click', status)
    },
    getConcludedStatus(props = null) {
      const confirmedStatus = this.confirmedStatus.find(
        _status => _status.id === this.status.id
      )

      if (props) {
        return get(confirmedStatus, props)
      }

      return confirmedStatus
    },
  }
}
</script>

<template>
  <li
    class="step w-100"
    :class="itemClass"
  >
    <div
      class="step-number"
      @click.prevent="onStepClick(status)"
    >
      <FontAwesomeIcon
        :icon="icons.faCheck"
      />
    </div>
    <div class="step-label">
      {{ status.text }}
    </div>
    <template v-if="isStepConfirmed">
      <div
        v-if="getConcludedStatus('pivot.created_at')"
        class="step-info"
      >
        <FontAwesomeIcon
          :icon="icons.faClock"
          fixed-width
        />
        {{
          formatDatetime(
            getConcludedStatus('pivot.created_at'),
            "dd/LL 'às' HH:mm"
          )
        }}
      </div>
      <div
        v-if="getConcludedStatus('pivot.user.name')"
        class="small text-secondary"
      >
        <FontAwesomeIcon
          :icon="icons.faUser"
          fixed-width
        />
        {{ getConcludedStatus('pivot.user.name') }}
      </div>
    </template>
  </li>
</template>
