<script>
import Form from '@/utils/Form'
import Vue from 'vue'
import { maskCurrencyBRL,  } from '@/utils/masks'
import { CreateGarmentMatch, UpdateGarmentMatch } from '@/graphql/GarmentMatch.gql'

import GarmentMatchFormValues from './GarmentMatchFormValues.vue'
import GarmentMatchFormMatches from './GarmentMatchFormMatches.vue'
import GarmentMatchFormSizes from './GarmentMatchFormSizes.vue'
import GarmentMatchFormUniqueValue from './GarmentMatchFormUniqueValue.vue'
import { handleError, handleSuccess } from '@/utils/forms'
import { isEmpty } from 'lodash-es'

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
  props: {
    match: {
      type: Object,
      default: () => ({})
    },
  },
  data: () => ({
    maskCurrencyBRL: maskCurrencyBRL(),
    form,
    isLoading: false
  }),
  computed: {
    isEdit () {
      return !isEmpty(this.match)
    }
  },
  mounted () {
    if (this.isEdit) {
      this.populateForm()
    }
  },
  methods: {
    populateForm() {
      if (this.match.unique_value) {
        this.form.is_unique_value = true
      }
    },
    async store (input) {
      await this.$apollo.mutate({
        mutation: CreateGarmentMatch,
        variables: { input },
        refetchQueries: ['GetGarmentMatches'],
        awaitRefetchQueries: true
      })
    },
    async update(input) {
      await this.$apollo.mutate({
        mutation: UpdateGarmentMatch,
        variables: {id: this.match.id, input },
        refetchQueries: ['GetGarmentMatches'],
        awaitRefetchQueries: true
      })
    },
    async onSubmit () {
      const input = this.form.data()
      this.isLoading = true

      try {
        await (this.isEdit ? this.update(input) : this.store(input))

        handleSuccess(this, {
          message: this.isEdit
            ? 'Combinação atualizada!'
            : 'Combinação criada!'
        })

        this.form.reset()
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
        <GarmentMatchFormMatches
          :match="match"
          :is-edit="isEdit"
        />
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

          <GarmentMatchFormValues
            v-if="!form.is_unique_value"
            :match="match"
            :is-edit="isEdit"
          />
          <GarmentMatchFormUniqueValue
            v-else
            :match="match"
            :is-edit="isEdit"
          />
        </div>
      </template>
    </AppContainer>

    <AppContainer class="mb-3">
      <template #title>
        Tamanhos
      </template>
      <template #body>
        <GarmentMatchFormSizes :match="match" />
      </template>
    </AppContainer>

    <div class="d-flex justify-content-between align-items-end">
      <div class="col">
        <AppButton
          color="success"
          btn-class="fw-bold btn-lg w-50"
          type="submit"
          :loading="isLoading"
          block
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
