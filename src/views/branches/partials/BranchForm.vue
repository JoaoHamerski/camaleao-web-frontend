<script>
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { branchCreate, branchUpdate } from '@/graphql/Branch.gql'
import { handleError, handleSuccess } from '@/utils/forms'
import { filter, map } from 'lodash-es'

import Form from '@/utils/Form'

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    shippingCompanies: {
      type: Array,
      default: () => []
    },
    cities: {
      type: Array,
      default: () => []
    },
    branch: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      icons: {
        faQuestionCircle
      },
      isLoading: false,
      form: new Form({
        branch_id: '',
        shipping_company_id: '',
        cities_id: []
      })
    }
  },
  mounted () {
    if (this.isEdit) {
      this.populateForm()
    }
  },
  methods: {
    populateForm () {
      const branchCitiesIds = map(this.branch.cities, 'id')

      this.form.branch_id = this.cities.find(
        city => city.id === this.branch.city.id
      )

      this.form.shipping_company_id = this.shippingCompanies.find(
        company => company.id === this.branch?.shipping_company?.id || ''
      )

      this.form.cities_id = filter(
        this.cities,
        item => branchCitiesIds.includes(item.id)
      )
    },
    getCityName (city) {
      if (city.state) {
        return `${city.name} - ${city.state.abbreviation}`
      }

      return city.name
    },
    isToAppendAlreadyOnBranch (city, isCitiesInput) {
      if (this.isEdit) {
        return isCitiesInput
          && city.branch
          && !map(this.branch.cities, 'id').includes(city.id)
      }

      return isCitiesInput
          && city.branch
    },
    customCityLabel (city, isCitiesInput = false) {
      const cityName = this.getCityName(city)

      if (this.isToAppendAlreadyOnBranch(city, isCitiesInput)) {
        return `${cityName} - (Já em uma filial)`
      }

      return cityName
    },
    getFormattedData () {
      const data = { ...this.form.data() }

      data.branch_id = data.branch_id?.id || ''
      data.shipping_company_id = data.shipping_company_id?.id || ''
      data.cities_id = data.cities_id.map(city => city.id)

      return data
    },
    async create (input) {
      try {
        await this.$apollo.mutate({
          mutation: branchCreate,
          variables: { input }
        })

        handleSuccess(this, { message: 'Filial registrada!', resetForm: true })
      } catch (error) {
        handleError(this, error)
      }
    },

    async update (input) {
      try {
        await this.$apollo.mutate({
          mutation: branchUpdate,
          variables: {
            id: this.branch.id,
            input
          }
        })

        handleSuccess(this, { message: 'Filial atualizada!', resetForm: true })
      } catch (error) {
        handleError(this, error)
      }
    },
    async onSubmit () {
      const data = this.getFormattedData()

      this.isLoading = true

      if (this.isEdit) {
        await this.update(data)
      } else {
        await this.create(data)
      }

      this.isLoading = false
    }
  }
}
</script>
<template>
  <AppForm
    :form="form"
    :on-submit="onSubmit"
  >
    <AppSelect
      v-model="form.branch_id"
      name="city_id"
      :options="cities"
      :custom-label="customCityLabel"
      placeholder="Selecione uma cidade"
      :error="form.errors.get('city_id')"
    >
      Filial:
      <template #hint>
        A lista de filiais é sincronizada com a lista de cidades no sistema.
        <FontAwesomeIcon
          v-tippy
          :icon="icons.faQuestionCircle"
          class="text-primary"
          content="Isso significa que caso o nome de uma cidade seja alterado, é refletido no nome da cidade da filial."
        />
      </template>
    </AppSelect>

    <AppSelect
      v-model="form.shipping_company_id"
      name="shipping_company_id"
      :options="shippingCompanies"
      :custom-label="item => item.name"
      placeholder="Selecione uma transportadora"
      :error="form.errors.get('shipping_company_id')"
    >
      Transportadoras:
    </AppSelect>

    <AppSelect
      v-model="form.cities_id"
      name="cities_id"
      :options="cities"
      :custom-label="item => customCityLabel(item, true)"
      :multiple="true"
      :close-on-select="false"
      track-by="id"
      placeholder="Selecione uma cidade"
      :error="form.errors.get('cities_id')"
    >
      Cidades:
      <template #hint>
        Caso selecione uma cidade que já está em uma filial, ela será removida da filial a que pertence.
      </template>
    </AppSelect>

    <div class="row mt-4">
      <div class="col">
        <AppButton
          btn-class="fw-bold"
          color="success"
          block
          :loading="isLoading"
        >
          {{ isEdit ? 'Atualizar' : 'Cadastrar' }}
        </AppButton>
      </div>
      <div class="col">
        <AppButton
          color="light"
          block
          data-bs-dismiss="modal"
          type="button"
        >
          Fechar
        </AppButton>
      </div>
    </div>
  </AppForm>
</template>
