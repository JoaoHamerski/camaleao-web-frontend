<script>
import { isEmpty } from 'lodash-es'
import { CancelEntry } from '@/graphql/Entry.gql'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    entry: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    isEmpty,
    async onConfirmClick () {
      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: CancelEntry,
          variables: {
            uid: this.entry.bank_uid
          }
        })

        this.$toast.success('Entrada cancelada!')
        this.$emit('success', this.entry)
      } catch {
        this.$toast.error('Ops! Algo deu errado!')
      }

      this.isLoading = false
    }
  }
}
</script>

<template>
  <AppModal
    v-bind="$attrs"
    id="entryCancelModal"
    :value="value"
    color="danger"
    centered
    v-on="$listeners"
  >
    <template #title>
      Cancelar entrada
    </template>
    <template #body>
      <h5 class="text-center my-4">
        Tem certeza que deseja cancelar a entrada:
      </h5>

      <div v-if="!isEmpty(entry)">
        <div class="mb-3">
          <div class="fw-bold text-secondary">
            Valor
          </div>
          <h5>{{ $helpers.toBRL(entry.value) }}</h5>
        </div>

        <div class="mb-3">
          <div class="fw-bold text-secondary">
            Descrição
          </div>
          <div class="small">
            {{ entry.description }}
          </div>
        </div>

        <div class="mb-3">
          <div class="fw-bold text-secondary">
            Data
          </div>
          <div>{{ entry.date }}</div>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col">
          <AppButton
            color="success"
            btn-class="fw-bold"
            block
            :loading="isLoading"
            @click.prevent="onConfirmClick"
          >
            CONFIRMAR
          </AppButton>
        </div>
        <div class="col">
          <AppButton
            color="light"
            block
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
