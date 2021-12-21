<script>
export default {
  chimera: {
    _status () {
      return {
        url: 'api/status'
      }
    },
    _updateStatus () {
      return {
        method: 'PATCH',
        url: `api/clients/${this.clientKey}/orders/${this.orderKey}/update-status`,
        on: {
          success () {
            this.$toast.success('Status alterado com sucesso!')
            this.$emit('success')
          },
          error (data) {
            this.$toast.error('Algo deu errado!')
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
    orderStatus: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      selected: this.orderStatus.id
    }
  },
  computed: {
    clientKey () {
      return this.$route.params.clientKey
    },
    orderKey () {
      return this.$route.params.orderKey
    },
    status () {
      return this.$chimera._status?.data?.data || []
    }
  },
  methods: {
    updateStatus () {
      this.$chimera._updateStatus.fetch(true, {
        params: {
          status: this.selected
        }
      })
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
            :class="orderStatus.avaliable ? 'text-success' : 'text-warning'"
          >
            {{ orderStatus.text }}
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
            :checked="selected === orderStatus.id"
          >
          <label
            class="form-check-label"
            :for="`radio__${option.id}__id`"
          >
            {{ option.id }}. {{ option.text }}
          </label>
        </div>
      </div>

      <div class="d-flex justify-content-between">
        <AppButton
          color="success"
          class="fw-bold"
          @click="updateStatus"
        >
          Salvar
        </AppButton>
        <AppButton
          color="light"
          data-bs-dismiss="modal"
        >
          Fechar
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>
