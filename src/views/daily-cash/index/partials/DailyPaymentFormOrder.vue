<script>
import { isEmpty } from 'lodash-es'
import { formatCurrencyBRL } from '@/utils/formatters'
import { maskCurrencyBRL } from '@/utils/masks'
import { ordersIndex } from '@/graphql/Order.gql'

import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

const whereOrdersClause = (query, clientId) => {
  return {
    AND: [
      { column: 'CLIENT_ID', operator: 'EQ', value: clientId },
      { column: 'CODE', operator: 'LIKE', value: `%${query}%` }
    ]
  }
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
    apiUrl () {
      return this.$store.getters.apiURL
    },
    clientExists () {
      return typeof this.form.client.id === 'object' && !isEmpty(this.form.client.id)
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
    async asyncFindOrders (query) {
      if (!query.length) {
        this.orders.items = []
        return
      }

      this.orders.isLoading = true

      const { data: { orders: { data } } } = await this.$apollo.query({
        query: ordersIndex,
        variables: {
          where: whereOrdersClause(query, this.form.client.id)
        }
      })

      this.orders.isLoading = false
      this.orders.items = data
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
      placeholder="Procure por código"
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
