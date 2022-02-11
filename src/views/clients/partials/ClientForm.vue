<script>
import { clientCreate } from '@/graphql/Clients.gql'
import { cities } from '@/graphql/Cities.gql'
import { branches } from '@/graphql/Branches.gql'
import { shippingCompanies } from '@/graphql/ShippingCompanies.gql'

import Form from '@/utils/Form'
import { handleSuccess, handleError } from '@/utils/forms'
import { maskPhone } from '@/utils/masks'

export default {
  apollo: {
    cities: {
      query: cities
    },
    branches: {
      query: branches
    },
    shippingCompanies: {
      query: shippingCompanies
    }
  },
  data () {
    return {
      maskPhone,
      isLoading: false,
      cities: [],
      branches: [],
      shippingCompanies: [],
      form: new Form({
        name: '',
        phone: '',
        city_id: '',
        branch_id: '',
        shipping_company_id: ''
      })
    }
  },
  methods: {
    getFormattedData () {
      const form = this.form.data()

      form.city_id = form.city_id.id || ''
      form.branch_id = form.branch_id.id || ''
      form.shipping_company_id = form.shipping_company_id.id || ''

      return form
    },
    async onSubmit () {
      const data = this.getFormattedData()

      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: clientCreate,
          variables: {
            input: { ...data }
          }
        })

        handleSuccess(this, { message: 'Cliente cadastrado!', resetForm: true })
      } catch (error) {
        handleError(this, error)
      }

      this.isLoading = false
    },
    customLabelCity ({ name, state }) {
      if (state === null) {
        return name
      }

      return `${name} - ${state.abbreviation}`
    },
    customLabelBranch ({ city }) {
      const { state } = city

      if (state === null) {
        return city.name
      }

      return `${city.name} - ${state.abbreviation}`
    }
  }
}
</script>

<template>
  <AppForm
    :on-submit="onSubmit"
    :form="form"
  >
    <AppInput
      id="name"
      v-model="form.name"
      name="name"
      placeholder="Digite o nome..."
      :error="form.errors.get('name')"
    >
      Nome
    </AppInput>

    <AppInput
      id="phone"
      v-model="form.phone"
      optional
      name="phone"
      :mask="maskPhone"
      :error="form.errors.get('phone')"
      placeholder="Digite o telefone..."
    >
      Telefone
    </AppInput>

    <AppSelect
      v-model="form.city_id"
      name="city_id"
      :error="form.errors.get('city_id')"
      :options="cities"
      :custom-label="customLabelCity"
      optional
    >
      Cidade
    </AppSelect>

    <AppSelect
      v-model="form.branch_id"
      name="branch_id"
      :error="form.errors.get('branch_id')"
      :options="branches"
      :custom-label="customLabelBranch"
      optional
    >
      Filial
    </AppSelect>

    <AppSelect
      v-model="form.shipping_company_id"
      name="shipping_company_id"
      :error="form.errors.get('shipping_company_id')"
      :options="shippingCompanies"
      :custom-label="({name}) => name"
      optional
    >
      Frete
    </AppSelect>

    <div class="d-flex justify-content-between">
      <AppButton
        :loading="isLoading"
        type="submit"
        color="success"
        class="fw-bold"
      >
        Cadastrar
      </AppButton>
      <AppButton
        type="button"
        color="light"
        data-bs-dismiss="modal"
      >
        Cancelar
      </AppButton>
    </div>
  </AppForm>
</template>
