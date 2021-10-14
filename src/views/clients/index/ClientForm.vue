<script>
import Form from '@/utils/Form'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import { maskPhone } from '@/utils/masks'

export default {
  chimera: {
    _cities: {
      url: '/api/cities'
    },
    _branches: {
      url: '/api/branches'
    },
    _shippingCompanies: {
      url: '/api/shipping-companies'
    },
    _newClient () {
      return {
        url: '/api/clients',
        method: 'POST',
        params: {
          ...this.form.data()
        },
        on: {
          error ({ error }) {
            this.$toast.error('Algo está incorreto, verifique os dados, por favor.', {
              duration: 4000
            })

            if (error.errors) {
              this.form.onFail(error.errors)
            }

            this.isLoading = false
          }
        },
        success () {
          this.form.reset()
          this.isLoading = false
          this.$emit('submitted')
        }
      }
    }
  },
  data () {
    return {
      maskPhone,
      isLoading: false,
      form: new Form({
        name: '',
        phone: '',
        city_id: '',
        branch_id: '',
        shipping_company_id: ''
      })
    }
  },
  computed: {
    cities () {
      return this.$chimera?._cities?.data?.data || []
    },
    branches () {
      return this.$chimera?._branches?.data?.data || []
    },
    shippingCompanies () {
      return this.$chimera?._shippingCompanies?.data?.data || []
    }
  },
  methods: {
    onSubmit () {
      this.isLoading = true
      this.$chimera._newClient.fetch()
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
