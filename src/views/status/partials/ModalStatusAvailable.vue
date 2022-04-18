<script>
import { GetStatus, SetAvailableStatus } from '@/graphql/Status.gql'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    statusList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isLoading: false,
      selected: []
    }
  },
  methods: {
    async onSetAvailable () {
      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: SetAvailableStatus,
          variables: {
            ids: this.selected
          },
          refetchQueries: [GetStatus]
        })

        this.$emit('success')
        this.$toast.success('Status alterados!')
      } catch (error) {
        this.$toast.error('Ops! Algo deu errado!')
      }

      this.$helpers.clearCacheFrom({fieldname: 'status'})

      this.isLoading = false
    },
    onModalShow () {
      const availableIds = this.statusList.filter(status => status.is_available)

      this.selected = availableIds.map(({id}) => id)
    }
  }
}
</script>

<template>
  <AppModal
    id="modalStatusAvailable"
    :value="value"
    v-bind="$attrs"
    centered
    v-on="$listeners"
    @show="onModalShow"
  >
    <template #title>
      Status disponíveis
    </template>
    <template #body>
      <div class="text-center text-secondary text-subtitle mb-3">
        Selecione quais status devem ser exibidos em verde, como disponíveis. O restante será exibido em amarelo, como pendente.
      </div>

      <div
        v-for="status in statusList"
        :key="status.id"
      >
        <div class="form-check form-check-inline">
          <input
            :id="status.id"
            v-model="selected"
            class="form-check-input"
            type="checkbox"
            :value="status.id"
          >
          <label
            class="form-check-label"
            :for="status.id"
          >{{ status.text }}</label>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col">
          <AppButton
            block
            color="success"
            btn-class="fw-bold"
            :loading="isLoading"
            @click.prevent="onSetAvailable"
          >
            Concluir
          </AppButton>
        </div>

        <div class="col">
          <AppButton
            block
            type="button"
            color="light"
            data-bs-dismiss="modal"
            :disabled="isLoading"
          >
            Cancelar
          </AppButton>
        </div>
      </div>
    </template>
  </AppModal>
</template>
