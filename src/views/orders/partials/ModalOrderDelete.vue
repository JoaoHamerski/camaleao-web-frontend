<script>
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default {
  chimera: {
    _deleteOrder () {
      return {
        method: 'DELETE',
        url: `api/clients/${this.clientKey}/orders/${this.orderKey}`,
        on: {
          success () {
            this.$toast.success('Pedido deletado com sucesso!')
            this.$emit('success')
          },
          error () {
            this.isLoading = false
            this.$toast.error('Ops! Algo deu errado.')
          }
        }
      }
    }
  },
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
    deleteOrder () {
      this.isLoading = true

      if (!this.isPreConfirmed) {
        this.isLoading = false
        this.$toast.error('Confirme o código do pedido primeiramente.')

        return
      }

      this.$chimera._deleteOrder.fetch()
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
            Confirme o código do pedido:
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
