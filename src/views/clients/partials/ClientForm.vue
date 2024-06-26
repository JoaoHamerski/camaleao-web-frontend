<script>
import { every } from 'lodash-es'
import { CreateClient, UpdateClient } from '@/graphql/Client.gql'
import { GetCities } from '@/graphql/City.gql'
import { GetClientsForCityModal } from '@/graphql/Resources.gql'
import { GetBranches } from '@/graphql/Branch.gql'
import { GetShippingCompanies } from '@/graphql/ShippingCompany.gql'
import { GetClients } from '@/graphql/Client.gql'
import { formatPhone } from '@/utils/formatters'
import { GetOrder } from '@/graphql/Order.gql'

import { handleSuccess, handleError } from '@/utils/forms'
import { maskCurrencyBRL, maskPhone } from '@/utils/masks'
import Form from '@/utils/Form'
import roles from '@/constants/roles'

export default {
  apollo: {
    cities: {
      query: GetCities,
      variables: {
        orderBy: [{ column: 'NAME', order: 'ASC' }]
      },
      result ({ loading }) {
        if (!loading) {
          this.loaded.cities = true
        }
      }
    },
    branches: {
      query: GetBranches,
      result ({ data, loading }) {
        if (!loading) {
          this.branches = data.branches.filter((branch) => !!branch.city)
          this.loaded.branches = true
        }
      }
    },
    shippingCompanies: {
      query: GetShippingCompanies,
      result ({ loading }) {
        if (!loading) {
          this.loaded.shippingCompanies = true
        }
      }
    }
  },
  props: {
    client: {
      type: Object,
      default: null
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      maskPhone,
      isLoading: false,
      isClientLoading: false,
      cities: [],
      branches: [],
      shippingCompanies: [],
      clients: [],
      roles,
      loaded: {
        cities: false,
        branches: false,
        shippingCompanies: false,
      },
      form: new Form({
        name: '',
        phone: '',
        city_id: '',
        branch_id: '',
        client_recommended_id: '',
        bonus: 'R$ 0,00'
      }),
      maskCurrencyBRL: maskCurrencyBRL()
    }
  },
  computed: {
    isQueryLoading () {
      return !!this.$apollo.loading
    }
  },
  watch: {
    loaded: {
      immediate: true,
      deep: true,
      handler (value) {
        const isAllQueriesLoaded = every({ ...value }, item => item === true)

        if (this.isEdit && isAllQueriesLoaded) {
          this.populateForm()
        }
      }
    }
  },
  mounted() {
    if (!this.client?.client_recommended) {
      this.loaded.client = true
    }
  },
  methods: {
    async findClients (search) {
      const column = search.match(/^\d/)
        ? 'PHONE'
        : 'NAME'

      this.isClientLoading = true

      const { data } = await this.$apollo.query({
        query: GetClients,
        variables: {
          first: 10,
          where: {
            column,
            operator: 'LIKE',
            value: `%${search}%`
          }
        }
      })

      this.isClientLoading = false

      this.clients = data.clients.data
    },
    populateForm () {
      const {
        name,
        phone,
        city,
        branch,
        shipping_company,
        is_sponsor,
        client_recommended,
        bonus
      } = this.client

      this.form.name = name
      this.form.phone = phone
      this.form.is_sponsor = !!is_sponsor
      this.form.bonus = this.$helpers.toBRL(bonus)

      if (city) {
        this.form.city_id = this.cities.find(({ id }) => city.id === id)
        this.cities.find(({ id }) => city.id === id)
      }

      if (branch) {
        this.form.branch_id = this.branches.find(({ id }) => branch.id === id)
      }

      if (shipping_company) {
        this.form.shipping_company_id = this.shippingCompanies.find(
          ({ id }) => shipping_company.id === id
        )
      }

      if (client_recommended) {
        this.form.client_recommended_id = client_recommended
      }
    },
    getFormattedData () {
      const form = this.form.data()

      form.city_id = form.city_id?.id || ''
      form.branch_id = form.branch_id?.id || ''
      form.shipping_company_id = form.shipping_company_id?.id || ''
      form.client_recommended_id = form.client_recommended_id?.id || ''

      return form
    },
    async create (input) {
      try {
        await this.$apollo.mutate({
          mutation: CreateClient,
          variables: { input },
          refetchQueries: [{
            query: GetClientsForCityModal,
            variables: {
              where: { column: 'CITY_ID', operator: 'EQ', value: input.city_id }
            }
          }]
        })

        this.$helpers.clearCacheFrom({ fieldName: 'clients' })

        handleSuccess(this, { message: 'Cliente cadastrado!', resetForm: true })
      } catch (error) {
        handleError(this, error)
      }
    },
    async update (input) {
      try {
        await this.$apollo.mutate({
          mutation: UpdateClient,
          variables: { id: this.client.id, input },
          refetchQueries: [GetOrder]
        })

        handleSuccess(this, { message: 'Cliente atualizado!' })
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
    },
    customLabelCity ({ name, state }) {
      if (state === null) {
        return name
      }

      return `${name} - ${state.abbreviation}`
    },
    customLabelBranch ({ city }) {
      if (!city) {
        return 'N/A'
      }

      const { state } = city

      if (state === null) {
        return city.name
      }

      return `${city.name} - ${state.abbreviation}`
    },
    customLabelClient ({name, phone}) {
      if (!phone) {
        return name
      }
      return `${name} - ${formatPhone(phone)}`
    },
    onCitySelected (city) {
      this.form.branch_id = this.branches.find(
        branch => branch.id === city?.branch?.id || ''
      )

      this.form.shipping_company_id = this.shippingCompanies.find(
        company => company.id === city.branch?.shipping_company?.id || ''
      )
    }
  }
}
</script>

<template>
  <AppForm
    :on-submit="onSubmit"
    :form="form"
  >
    <AppLoading v-show="isQueryLoading" />
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
      @input="onCitySelected"
    >
      Cidade
      <template #hint>
        Ao selecionar a <b>Cidade</b>, a <b>Filial</b> e <b>Transportadora</b> serão preenchidos automaticamente caso haja algum dado relacionado.
      </template>
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
      Frete - Transportadora
    </AppSelect>

    <AppSelect
      v-model="form.client_recommended_id"
      name="client_recommended_id"
      :options="clients"
      :error="form.errors.get('client_recommended_id')"
      optional
      :custom-label="customLabelClient"
      :loading="isClientLoading"
      @search-change="findClients"
    >
      Cliente que indicou
    </AppSelect>

    <AppInput
      v-if="isEdit && $helpers.canView(roles.GERENCIA)"
      v-model="form.bonus"
      name="bonus"
      placeholder="Alterar bônus do cliente..."
      :mask="maskCurrencyBRL"
    >
      Bônus
    </AppInput>
    <div class="row">
      <div class="col">
        <AppButton
          :loading="isLoading"
          type="submit"
          color="success"
          class="fw-bold"
          block
        >
          {{ isEdit ? 'Atualizar' : 'Cadastrar' }}
        </AppButton>
      </div>
      <div class="col">
        <AppButton
          type="button"
          color="light"
          data-bs-dismiss="modal"
          block
          :disabled="isLoading"
        >
          Cancelar
        </AppButton>
      </div>
    </div>
  </AppForm>
</template>
