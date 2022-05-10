<script>
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { maskDate } from '@/utils/masks'
import { users } from '@/graphql/User.gql'

import Form from '@/utils/Form'

const SUBJECT_TYPES = [
  { text: 'Clientes', value: 'Client' },
  { text: 'Pedidos', value: 'Order' },
  { text: 'Pagamentos', value: 'Payment' },
  { text: 'Comissões', value: 'CommissionUser' },
  { text: 'Despesas', value: 'Expense' },
  { text: 'Cidades', value: 'City' },
  { text: 'Filiais', value: 'Branch' },
  { text: 'Transportadoras', value: 'ShippingCompany' },
  { text: 'Tipos de Roupas', value: 'ClothingType' },
  { text: 'Anotações', value: 'Note' },
  { text: 'Usuários', value: 'User' }
]

export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  apollo: {
    users: {
      query: users
    }
  },
  data () {
    return {
      maskDate,
      SUBJECT_TYPES,
      users: [],
      form: new Form({
        causer_id: '',
        subject_type: '',
        date: ''
      }),
      icons: {
        faFilter
      }
    }
  },
  methods: {
    onSubmit () {
      const data = this.form.data()

      this.$emit('filtered', data)
    },
    onClearFilterClick () {
      this.form.reset()
      this.$emit('clear')
    }
  }
}
</script>
<template>
  <AppCard
    color="success"
    collapsible
  >
    <template #header>
      <h6 class="fw-bold mb-0">
        <FontAwesomeIcon
          :icon="icons.faFilter"
          fixed-width
        />
        Filtrar atividades
      </h6>
    </template>

    <template #body>
      <AppForm
        :form="form"
        :on-submit="onSubmit"
      >
        <div class="row">
          <div class="col-12 col-sm">
            <AppSimpleSelect
              id="causer_id"
              v-model="form.causer_id"
              name="causer_id"
              placeholder="Selecione um usuário"
              :options="users"
              label-prop="name"
              value-prop="id"
            >
              Usuário:
            </AppSimpleSelect>
          </div>
          <div class="col-12 col-sm">
            <AppSimpleSelect
              id="subject_type"
              v-model="form.subject_type"
              name="subject_type"
              placeholder="Selecione uma entidade"
              :options="SUBJECT_TYPES"
              label-prop="text"
              value-prop="value"
            >
              Atividades em:
            </AppSimpleSelect>
          </div>
        </div>

        <div>
          <AppInput
            id="date"
            v-model="form.date"
            name="date"
            type="date"
            placeholder="Digite uma data..."
            :mask="maskDate"
            numeric
          >
            Data:
          </AppInput>
        </div>

        <div>
          <AppButton
            class="me-2"
            color="success"
            btn-class="fw-bold"
            :loading="isLoading"
          >
            Filtrar
          </AppButton>

          <AppButton
            type="button"
            color="light"
            :disabled="isLoading"
            @click.prevent="onClearFilterClick"
          >
            Limpar filtros
          </AppButton>
        </div>
      </AppForm>
    </template>
  </AppCard>
</template>
