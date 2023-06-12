<script>
import Form from '@/utils/Form'
import Vue from 'vue'
import { maskCurrencyBRL,  } from '@/utils/masks'
import { CreateGarmentMatch } from '@/graphql/GarmentMatch.gql'

import GarmentMatchFormValues from './GarmentMatchFormValues.vue'
import GarmentMatchFormMatches from './GarmentMatchFormMatches.vue'
import GarmentMatchFormSizes from './GarmentMatchFormSizes.vue'
import GarmentMatchFormUniqueValue from './GarmentMatchFormUniqueValue.vue'
import { handleError } from '@/utils/forms'

export const form = Vue.observable(new Form({
  is_unique_value: false,
  unique_value: 'R$ ',
  model_id: '',
  material_id: '',
  neck_type_id: '',
  sleeve_type_id: '',
  values: [
    {start: '0', end: '', value: 'R$ ',},
    {start: '', end: '', value: 'R$ '},
  ],
  sizes: []
}))

export default {
  components: {
    GarmentMatchFormValues,
    GarmentMatchFormMatches,
    GarmentMatchFormSizes,
    GarmentMatchFormUniqueValue
  },
  data: () => ({
    maskCurrencyBRL: maskCurrencyBRL(),
    form,
    isLoading: false
  }),
  methods: {
    async store (input) {
      await this.$apollo.mutate({
        mutation: CreateGarmentMatch,
        variables: { input }
      })
    },
    async onSubmit () {
      const input = this.form.data()
      this.isLoading = true

      try {
        await this.store(input)
      } catch (error) {
        handleError(this, error)
      }

      this.isLoading = false
    }
  }
}
</script>

<template>
  <AppForm
    :on-submit="onSubmit"
    :form="form"
  >
    <AppContainer class="mb-3">
      <template #title>
        Combinação
      </template>
      <template #body>
        <GarmentMatchFormMatches />
      </template>
    </AppContainer>

    <AppContainer class="mb-3">
      <template #title>
        Valores
      </template>
      <template #body>
        <div class="col mb-3">
          <AppCheckboxSwitch
            id="is_unique_value"
            v-model="form.is_unique_value"
            name="is_unique_value"
          >
            Valor único
          </AppCheckboxSwitch>

          <GarmentMatchFormValues v-if="!form.is_unique_value" />
          <GarmentMatchFormUniqueValue v-else />
        </div>
      </template>
    </AppContainer>

    <AppContainer class="mb-3">
      <template #title>
        Tamanhos
      </template>
      <template #body>
        <GarmentMatchFormSizes />
      </template>
    </AppContainer>

    <div class="d-flex justify-content-between align-items-end">
      <div class="col">
        <AppButton
          color="success"
          btn-class="fw-bold btn-lg w-50"
          type="submit"
          :loading="isLoading"
        >
          SALVAR
        </AppButton>
      </div>

      <div class="col text-end">
        <AppButton
          color="light"
          data-bs-dismiss="modal"
          btn-class="w-50"
          type="button"
          :disabled="isLoading"
        >
          Fechar
        </AppButton>
      </div>
    </div>
  </AppForm>
</template>
