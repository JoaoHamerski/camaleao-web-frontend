<script>
import {
  GetOrdersBySector,
  GetAuthUserSectors,
  StepToStatus
} from '@/graphql/OrderControl.gql'

import { map } from 'lodash-es'

import ProductionTrackNavItems from './ProductionTrackNavItems.vue'
import ModalOrderStatusOverrideDates from '@/views/orders/partials/ModalOrderStatusOverrideDates.vue'

export default {
  components: {
    ProductionTrackNavItems,
    ModalOrderStatusOverrideDates
  },
  props: {
    order: {
      type: Object,
      required: true,
    },
    linkedStatus: {
      type: Array,
      required: true
    },
    sectorStatus: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    overridingStatus: [],
    preConfirmedStatus: null,
    overridingStatusOption: 'UPDATE'
  }),
  computed: {
    confirmedStatus () {
      return this.linkedStatus.filter(status => status.pivot.is_confirmed)
    },
    getProgressBarWidth () {
      const hasNextStatus = !!this.sectorStatus.next_status
      const confirmedStatusIds = map(this.confirmedStatus, 'id')
      const sectorStatusIds = map(this.sectorStatus.items, 'id')
      const matchedStatus = confirmedStatusIds.filter(
        id => sectorStatusIds.includes(id)
      )

      return (100 * matchedStatus.length) / (sectorStatusIds.length + (hasNextStatus ? 1 : 0))
    },
  },
  methods: {
    getStatusOverriding (statusA, statusB) {
      const status = this.$helpers.getStatusBetween(statusA, statusB, this.linkedStatus)

      return status.filter(s => s.pivot.confirmed_at)
    },
    async stepToStatus (status, viaContinueButton = false) {
      const order = this.order
      const statusWithPivot = this.linkedStatus.find(s => s.id === status.id)

      const overridingStatus = this.getStatusOverriding(order.status, statusWithPivot)

      if (overridingStatus.length && !viaContinueButton) {
        this.preConfirmedStatus = status
        this.overridingStatus = overridingStatus
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
            statusId: statusWithPivot.id,
            overrideOption: this.overridingStatusOption
          },
          refetchQueries: [
            GetOrdersBySector,
            GetAuthUserSectors
          ],
          awaitRefetchQueries: true
        })

        this.$emit('loading', {
          id: this.order.id,
          value: false
        })

        this.overridingStatus = []
        this.preConfirmedStatus = null

        this.$toast.success('Status atualizado!')
      } catch (error) {
        this.$toast.error('Ops! Algo deu errado')
      }

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
        <ProductionTrackNavItems
          v-for="_status in sectorStatus.items"
          :key="_status.id"
          :status="_status"
          :confirmed-status="confirmedStatus"
          :pre-confirmed-status="preConfirmedStatus"
          @step-click="stepToStatus"
        />
        <ProductionTrackNavItems
          v-if="sectorStatus.next_status"
          :pre-confirmed-status="preConfirmedStatus"
          :status="sectorStatus.next_status"
          :confirmed-status="confirmedStatus"
          @step-click="stepToStatus"
        />
      </ul>
      <AppContainer
        v-if="overridingStatus.length"
        class="mt-3 mb-2"
      >
        <template #title>
          Conflito de data de confirmação
        </template>
        <template #body>
          <div class="small">
            <ModalOrderStatusOverrideDates
              v-model="overridingStatusOption"
              :status="overridingStatus"
            />
          </div>
          <div>
            <AppButton
              btn-class="btn-sm fw-bold"
              @click.prevent="stepToStatus(preConfirmedStatus, true)"
            >
              Continuar
            </AppButton>
          </div>
        </template>
      </AppContainer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/sass/_bootstrap-utilities.scss";

// Status classes: step.step-confirmed | step.step-confirmable

::v-deep {
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


      &.step-pre-confirmed {
        .step-label {
          color: $success;
        }

        .step-number {
          color: $success;
          border-color: $success;

          &:before {
            background: $success;
          }
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
}
</style>
