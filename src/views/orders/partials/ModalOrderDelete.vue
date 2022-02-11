<script>
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { orderDelete } from '@/graphql/Orders.gql'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    order: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      preConfirmed: false,
      orderCode: '',
      icons: {
        faTrashAlt
      },
      isLoading: false
    }
  },
  computed: {
    isPreConfirmed () {
      return this.orderCode === this.order.code
    },
    clientKey () {
      return this.$route.params.clientKey
    },
    orderKey () {
      return this.$route.params.orderKey
    }
  },
  methods: {
    async delete () {
      await this.$apollo.mutate({
        mutation: orderDelete,
        variables: {
          id: this.order.id
        }
      })

      this.$emit('success')
    },
    deleteOrder () {
      this.isLoading = true

      if (!this.isPreConfirmed) {
        this.isLoading = false
        this.$toast.error('Confirme o código do pedido primeiramente.')

        return
      }

      this.delete()
    }
  }
}
</script>

<template>
  <AppModal
    id="orderDeleteModal"
    color="danger"
    centered
    :value="value"
    v-on="$listeners"
  >
    <template #title>
      Deletar pedido - {{ order.code }}
    </template>

    <template #body>
      <div>
        <div class="text-center">
          <FontAwesomeIcon
            class="text-danger"
            :icon="icons.faTrashAlt"
            size="4x"
          />
          <h5 class="fw-bold mt-3">
            Você tem certeza?
          </h5>
          <div>Isso deleterá todos os pagamentos, anexos e anotações do pedido.</div>
        </div>

        <div class="mt-3">
          <AppInput
            id="code"
            v-model="orderCode"
            name="code"
          >
            Confirme o código do pedido ({{ order.code }}):
          </AppInput>
        </div>

        <div class="d-flex justify-content-between mt-5">
          <AppButton
            class="fw-bold"
            color="success"
            :disabled="!isPreConfirmed"
            :loading="isLoading"
            @click="deleteOrder"
          >
            CONFIRMAR
          </AppButton>
          <AppButton
            data-bs-dismiss="modal"
            color="light"
          >
            Cancelar
          </AppButton>
        </div>
      </div>
    </template>
  </AppModal>
</template>
