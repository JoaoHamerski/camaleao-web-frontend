<script>
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'

import { GetStatus } from '@/graphql/Status.gql'
import { UpdateOrder } from '@/graphql/Order.gql'

import { handleError, handleSuccess } from '@/utils/forms'

export default {
  apollo: {
    status: {
      query: GetStatus
    }
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
      status: [],
      selected: this.order.status.id
    }
  },
  computed: {
    clientKey () {
      return this.$route.params.clientKey
    },
    orderKey () {
      return this.$route.params.orderKey
    }
  },
  methods: {
    async updateStatus () {
      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: UpdateOrder,
          variables: {
            id: this.order.id,
            input: {
              status_id: this.selected
            }
          }
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
        <div class="text-center mb-3">
          <div class="text-secondary small">
            STATUS ATUAL
          </div>
          <h5
            class="fw-bold"
            :class="order.status.avaliable ? 'text-success' : 'text-warning'"
          >
            {{ order.status.text }}
          </h5>
        </div>

        <h6 class="fw-bold">
          Alterar para:
        </h6>
        <div
          v-for="option in status"
          :key="option.id"
          class="form-check"
        >
          <input
            :id="`radio__${option.id}__id`"
            v-model="selected"
            :value="option.id"
            class="form-check-input"
            type="radio"
            :name="`radio__${option.id}__name`"
            :checked="selected === order.status.id"
          >
          <label
            class="form-check-label"
            :for="`radio__${option.id}__id`"
          >
            {{ option.id }}. {{ option.text }}
          </label>
        </div>
      </div>

      <div class="row">
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
