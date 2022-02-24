<script>
import { cityMassUpdateState } from '@/graphql/City.gql'
import Form from '@/utils/Form'
import { map } from 'lodash-es'
import { handleError, handleSuccess } from '@/utils/forms'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    selectedCities: {
      type: Array,
      default: () => ([])
    },
    states: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      isLoading: false,
      form: new Form({
        state: null
      })
    }
  },
  methods: {
    async onSubmit () {
      const data = this.form.data()

      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: cityMassUpdateState,
          variables: {
            ids: map(this.selectedCities, 'id'),
            state_id: data.state?.id || ''
          }
        })

        handleSuccess(this, { message: 'Cidades alteradas!', resetForm: true })
      } catch (error) {
        handleError(this, error)
      }

      this.isLoading = false
    },
    customStateLabel (state) {
      return `${state.name} - ${state.abbreviation}`
    },
    getCityNameAndStateAbbr (city) {
      return `${city.name} - ${this.$helpers.fallback(city.state, 'abbreviation')}`
    }
  }
}
</script>

<template>
  <AppModal
    id="editCitiesModal"
    color="primary"
    :value="value"
    centered
    v-on="$listeners"
  >
    <template #title>
      Alterar estado das cidades
    </template>

    <template #body>
      <div class="mb-2 fw-bold">
        Cidades selecionadas:
      </div>

      <ul class="list-group list-group-sm">
        <li
          v-for="city in selectedCities"
          :key="city.id"
          class="list-group-item"
        >
          {{ getCityNameAndStateAbbr(city) }}
        </li>
      </ul>

      <div class="mt-4">
        <div class="form-label fw-bold">
          Novo estado para as cidades selecionadas:
        </div>
        <AppForm
          :form="form"
          :on-submit="onSubmit"
        >
          <AppSelect
            v-model="form.state"
            name="state_id"
            placeholder="Selecione um estado"
            :custom-label="customStateLabel"
            :options="states"
            :error="form.errors.get('state_id')"
          />
        </AppForm>
      </div>

      <div class="row mt-5">
        <div class="col">
          <AppButton
            block
            color="success"
            btn-class="fw-bold"
            :loading="isLoading"
            @click.prevent="onSubmit"
          >
            Confirmar
          </AppButton>
        </div>
        <div class="col">
          <AppButton
            block
            color="light"
            data-bs-dismiss="modal"
          >
            Cancelar
          </AppButton>
        </div>
      </div>
    </template>
  </AppModal>
</template>
