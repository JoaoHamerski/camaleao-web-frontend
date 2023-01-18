<script setup>
import { get, map } from 'lodash-es'
import { faCheck, faClock, faUser } from '@fortawesome/free-solid-svg-icons'
import { formatDatetime } from '@/utils/formatters'

export default {
  props: {
    status: {
      type: Object,
      required: true
    },
    concludedStatus: {
      type: Array,
      required: true
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
  methods: {
    get,
    formatDatetime,
    isStepConfirmable(status) {
      const concludedStatusIds = map(this.concludedStatus, 'id')

      if (concludedStatusIds.includes(status.id)) {
        return false
      }

      return true
    },
    isStepConfirmed(status) {
      return this.concludedStatus.some(concluded => {
        return concluded.id === status.id
      })
    },
    onStepClick (status) {
      if (this.isStepConfirmed(status)) {
        return
      }

      this.$emit('step-click', status)
    },
    getConcludedStatus(props = null) {
      const concludedStatus = this.concludedStatus.find(
        _status => _status.id === this.status.id
      )

      if (props) {
        return get(concludedStatus, props)
      }

      return concludedStatus
    },
  }
}
</script>

<template>
  <li
    class="step w-100"
    :class="{
      'step-confirmed': isStepConfirmed(status),
      'step-confirmable': isStepConfirmable(status)
    }"
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
    <template v-if="isStepConfirmed(status)">
      <div
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
