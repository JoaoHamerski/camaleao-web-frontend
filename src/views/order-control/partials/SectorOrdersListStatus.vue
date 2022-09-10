<script>
import { GetOrdersBySector, GetAuthUserSectors, StepToStatus } from '@/graphql/OrderControl.gql'

import { faCheck, faClock, faUser } from '@fortawesome/free-solid-svg-icons'
import { first, last, get, map } from 'lodash-es'
import { formatDatetime } from '@/utils/formatters'

export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
    concludedStatus: {
      type: Array,
      required: true
    },
    status: {
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
  computed: {
    getProgressBarWidth () {
      const concludedStatusIds = map(this.concludedStatus, 'id')
      const sectorStatusIds = map(this.status, 'id')
      const matched = concludedStatusIds.filter(
        id => sectorStatusIds.includes(id)
      )

      return (100 * matched.length) / sectorStatusIds.length
    }
  },
  methods: {
    get,
    formatDatetime,
    getConcludedStatus(status, props = null) {
      const concludedStatus = this.concludedStatus.find(
        _status => _status.id === status.id
      )

      if (props) {
        return get(concludedStatus, props)
      }

      return concludedStatus
    },
    isStepConfirmable(status) {
      const statusId = status.id
      const concludedStatusIds = map(this.concludedStatus, 'id')

      if (concludedStatusIds.includes(statusId)) {
        return false
      }

      return true
    },
    isStepConfirmed(status) {
      return this.concludedStatus.some(concluded => {
        return concluded.id === status.id
      })
    },
    async onStepClick (status) {
      const order = this.order

      if (!this.isStepConfirmable(status)) {
        return
      }

      this.$emit('loading', {
        id: this.order.id,
        value: true
      })

      try {
        await this.$apollo.mutate({
          mutation: StepToStatus,
          variables: {
            orderId: order.id,
            statusId: status.id
          },
          refetchQueries: [
            GetOrdersBySector,
            GetAuthUserSectors
          ],
          awaitRefetchQueries: true
        })

        this.$helpers.clearCacheFrom({fieldName: 'ordersBySector'})

        this.$toast.success('Status atualizado!')
      } catch (error) {
        this.$toast.error('Ops! Algo deu errado')
      }

      this.$emit('loading', {
        id: '',
        value: false
      })
    }
  }
}
</script>

<template>
  <div>
    <div class="step-container position-relative mt-3">
      <div
        class="step-progress-bar"
        :style="{
          width: `${getProgressBarWidth}%`
        }"
      />
      <div class="step-progress-bar-placeholder" />
      <ul class="step-progress w-100 table-responsive">
        <li
          v-for="_status in status"
          :key="_status.id"
          class="step w-100"
          :class="{
            'step-confirmed': isStepConfirmed(_status),
            'step-confirmable': isStepConfirmable(_status)
          }"
        >
          <div
            class="step-number"
            @click.prevent="onStepClick(_status)"
          >
            <FontAwesomeIcon
              :icon="icons.faCheck"
            />
          </div>
          <div class="step-label">
            {{ _status.text }}
          </div>
          <template v-if="isStepConfirmed(_status)">
            <div
              class="step-info"
            >
              <FontAwesomeIcon
                :icon="icons.faClock"
                fixed-width
              />
              {{
                formatDatetime(
                  getConcludedStatus(_status, 'pivot.created_at'),
                  "dd/LL 'às' HH:mm"
                )
              }}
            </div>
            <div
              v-if="getConcludedStatus(_status, 'pivot.user.name')"
              class="small text-secondary"
            >
              <FontAwesomeIcon
                :icon="icons.faUser"
                fixed-width
              />
              {{ getConcludedStatus(_status, 'pivot.user.name') }}
            </div>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "@/sass/_bootstrap-utilities.scss";

  // Status classes: step.step-confirmed | step.step-confirmable

  .step-container {
    position: relative;
  }

  .step-progress-bar,
  .step-progress-bar-placeholder {
    top: 17px;
    position: absolute;
    height: 5px;
  }

  .step-progress-bar-placeholder {
    z-index: 10;
    width: 100%;
    background-color: lighten($secondary, 30%);
  }

  .step-progress-bar {
    z-index: 11;
    background-color: $success;
  }

  .step-progress {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;

    .step {
      z-index: 20;

      .step-info {
        font-size: .8rem;
        font-weight: bold;
        color: $secondary;
      }

      &.step-confirmed {
        .step-label {
          margin-right: .25rem;
          color: $success;
        }

        .step-number {
          color: white;
          background-color: lighten($success, 5%);
          border: 2px solid white;

          &:before {
            background: $success;
          }
        }
      }

      &.step-confirmable {
        .step-label {
          color: $primary;
        }

        .step-number {
          cursor: pointer;
          color: $primary;
          transition: background-color .2s;
          border: 2px solid $primary;

          &:before {
            background: $primary;
          }

          &:hover {
            background-color: darken(white, 10%);
          }

          &:active {
            background-color: darken(white, 15%);
          }
        }
      }

      .step-label {
        margin-top: .85rem;
        text-transform: uppercase;
        font-weight: bold;
        color: $secondary;
        font-size: .8rem;
      }

      .step-number {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        line-height: 0;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 100% ;
        background-color: white;
        border: 2px solid lighten($secondary, 30%);
        color: $secondary;


        &:before {
          content: '';
          position: absolute;
          width: 3px;
          height: 8px;
          bottom: -8px;
          border-bottom-left-radius: 1.5rem;
          border-bottom-right-radius: 1.5rem;
          background: lighten($secondary, 30%);
        }
      }
    }
  }

  @include media-breakpoint-down(sm) {
    .step-number {
      width: 2rem !important;
      height: 2rem !important;
    }

    .step-label,
    .step-info {
      font-size: .7rem !important;
    }
  }
</style>
