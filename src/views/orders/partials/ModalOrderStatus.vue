<script>
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'
import { GetOrder, UpdateOrderStatus } from '@/graphql/Order.gql'
import { handleError, handleSuccess } from '@/utils/forms'

import ModalOrderStatusHeader from './ModalOrderStatusHeader.vue'
import ModalOrderStatusOptions from './ModalOrderStatusOptions.vue'
import ModalOrderStatusOverrideDates from './ModalOrderStatusOverrideDates.vue'

export default {
  components: {
    ModalOrderStatusHeader,
    ModalOrderStatusOptions,
    ModalOrderStatusOverrideDates
  },
  props: {
    order: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      icons: {
        faExchangeAlt
      },
      isLoading: false,
      selectedStatus: this.order.status.id,
      overrideOption: null,
      overrideStatus: []
    }
  },
  computed: {
    status () {
      return this.order.linked_status
    },
    hasOverrideDates () {
      return !!this.overrideStatus.length
    }
  },
  methods: {
    onOptionChange () {
      const selectedStatus = this.status.find((s) => s.id === this.selectedStatus)
      const orderStatus = this.order.status

      if (selectedStatus.order > orderStatus.order) {
        const status = this.$helpers.getStatusBetween(orderStatus, selectedStatus, this.status)

        if (status.some(s => s.pivot.confirmed_at)) {
          this.overrideStatus = status
          this.overrideOption = 'UPDATE'
          return
        }
      }

      this.overrideStatus = []
    },
    async updateStatus () {
      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: UpdateOrderStatus,
          variables: {
            id: this.order.id,
            status_id: this.selectedStatus,
            override_option: this.overrideOption
          },
          refetchQueries: [GetOrder],
          awaitRefetchQueries: true
        })

        handleSuccess(this, { message: 'Status alterado!' })
      } catch (error) {
          handleError(this, error)
      }

      this.isLoading = false
    }
  }
}
</script>

<template>
  <AppModal
    id="orderStatusModal"
    color="success"
    centered
    :value="value"
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faExchangeAlt"
        fixed-width
      />
      Alterar status do pedido
    </template>

    <template #body>
      <div class="mb-4">
        <ModalOrderStatusHeader :status="order.status" />

        <ModalOrderStatusOptions
          v-model="selectedStatus"
          :status="order.linked_status"
          @input="onOptionChange"
        />
      </div>

      <div v-if="hasOverrideDates">
        <ModalOrderStatusOverrideDates
          v-model="overrideOption"
          :status="overrideStatus"
        />
      </div>

      <div class="row mt-3">
        <div class="col">
          <AppButton
            :loading="isLoading"
            color="success"
            class="fw-bold"
            block
            @click.prevent="updateStatus"
          >
            Salvar
          </AppButton>
        </div>
        <div class="col">
          <AppButton
            type="button"
            block
            color="light"
            data-bs-dismiss="modal"
          >
            Fechar
          </AppButton>
        </div>
      </div>
    </template>
  </AppModal>
</template>
