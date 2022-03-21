<script>
import { isEmpty } from 'lodash-es'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

import { formatCurrencyBRL } from '@/utils/formatters'
import { maskCurrencyBRL } from '@/utils/masks'
import { GetOrdersForForm } from '@/graphql/Resources.gql'

const whereOrdersClause = (query, client) => {
  const clientId = client?.id || client

  const AND = [
    { column: 'CLIENT_ID', operator: 'EQ', value: clientId },
    { column: 'PRICE', operator: 'IS_NOT_NULL' }
  ]

  if (!isEmpty(query)) {
    AND.push(
      { column: 'CODE', operator: 'LIKE', value: `%${query}%` }
    )
  }

  return { AND }
}

export default {
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      maskCurrencyBRL: maskCurrencyBRL(),
      hasReminder: false,
      icons: {
        faQuestionCircle
      },
      orders: {
        isLoading: false,
        items: []
      }
    }
  },
  computed: {
    clientExists () {
      return typeof this.form.client.id === 'object'
        && !isEmpty(this.form.client.id)
    }
  },
  watch: {
    'form.client.id': {
      async handler () {
        await this.asyncFillOrders()
      }
    }
  },
  methods: {
    formatCurrencyBRL,
    toggleOrderState () {
      if (!this.form.order.isNew) {
        this.form.order.id = ''
      }

      this.form.order.isNew = !this.form.order.isNew
    },
    customLabelOrders ({ code, name, price }) {
      if (!name) {
        return `${code} - ${formatCurrencyBRL(price)}`
      }

      return `${code} - ${name} - ${formatCurrencyBRL(price)}`
    },
    getOrdersQuery (query) {
      return this.$apollo.query({
        query: GetOrdersForForm,
        variables: {
          where: whereOrdersClause(query, this.form.client.id),
          orderBy: [{ column: 'CREATED_AT', order: 'DESC' }]
        }
      })
    },
    async asyncFillOrders () {
      const query = null
      this.orders.isLoading = true

      const { data: { orders: { data } } } = await this.getOrdersQuery(query)

      this.orders.isLoading = false
      this.orders.items = data.filter(item => item.total_owing > 0)
    },
    async asyncFindOrders (query) {
      if (isEmpty(query)) {
        await this.asyncFillOrders()
        return
      }

      this.orders.isLoading = true

      const { data: { orders: { data } } } = await this.getOrdersQuery(query)

      this.orders.isLoading = false
      this.orders.items = data.filter(item => item.total_owing > 0)
    }
  }
}
</script>

<template>
  <div v-if="!form.order.isNew">
    <div class="d-flex justify-content-between align-items-center mb-2">
      <label
        for="order"
        class="fw-bold text-primary form-label mb-2"
      >Pedido</label>
      <AppButton
        :disabled="!clientExists"
        color="success"
        btn-class="btn-sm fw-bold"
        :tooltip="!clientExists && 'Informe o cliente primeiro'"
        @click.prevent="toggleOrderState"
      >
        Cadastrar novo
      </AppButton>
    </div>

    <AppSelect
      v-model="form.order.id"
      name="order"
      class="mb-2"
      placeholder="Procure pelo código"
      :error="form.errors.get('order.id')"
      :default-margin="false"
      :custom-label="customLabelOrders"
      :searchable="true"
      :internal-search="false"
      :options="orders.items"
      :loading="orders.isLoading"
      :disabled="!clientExists"
      :tooltip="!clientExists && 'Informe o cliente primeiro.'"
      @open="form.errors.clear('order.id')"
      @search-change="asyncFindOrders"
    >
      <template #noOptions>
        Faça uma busca para exibir resultados
      </template>
      <template #noResult>
        Nenhum pedido encontrado, <a
          href="#"
          class="fw-bold text-decoration-none"
          @click.prevent="toggleOrderState"
        >cadastrar novo</a>
      </template>
    </AppSelect>
    <div
      v-if="form.order.id"
      class="small text-secondary"
    >
      <b>Faltar pagar: </b> {{ formatCurrencyBRL(form.order.id.total_owing) }}
    </div>
  </div>
  <div v-else>
    <div class="d-flex justify-content-between align-items-center mb-2">
      <label
        for="order"
        class="fw-bold form-label mb-2"
      >Código do pedido</label>
      <AppButton
        v-if="clientExists && !form.isNewClient"
        color="primary"
        class="fw-bold"
        btn-class="btn-sm"
        @click.prevent="toggleOrderState"
      >
        Procurar pedido
      </AppButton>
    </div>
    <AppInput
      id="order"
      v-model="form.order.code"
      :error="form.errors.get('order.code')"
      name="order.code"
      placeholder="Digite o cód. do pedido..."
    />
    <AppInput
      id="price"
      v-model="form.order.price"
      :error="form.errors.get('order.price')"
      name="order.price"
      value="R$"
      :mask="maskCurrencyBRL"
    >
      Valor
    </AppInput>

    <AppCheckbox
      id="reminderCheckbox"
      v-model="hasReminder"
    >
      Adicionar lembrete
      <FontAwesomeIcon
        v-tippy
        content="Adicione uma anotação para lembrar do pedido na página de pedidos"
        :icon="icons.faQuestionCircle"
        class="ms-1 text-primary"
      />
    </AppCheckbox>

    <template v-if="hasReminder">
      <AppInput
        id="reminder"
        v-model="form.order.reminder"
        name="reminder"
        placeholder="Algo que lembre o pedido..."
        optional
      >
        Lembrete
      </AppInput>
    </template>
  </div>
</template>
