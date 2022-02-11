<script>
import { formatPhone } from '@/utils/formatters'
import { clientsIndex } from '@/graphql/Clients.gql'
import { stripNonDigits, isNumeric } from '@/utils/helpers'

const whereClientsClause = (query) => {
  if (query.startsWith('(')) {
    return {
      column: 'PHONE',
      operator: 'LIKE',
      value: `${stripNonDigits(query)}%`
    }
  }

  if (isNumeric(query)) {
    return {
      column: 'PHONE',
      operator: 'LIKE',
      value: `%${query}%`
    }
  }

  return {
    column: 'NAME',
    operator: 'LIKE',
    value: `%${query}%`
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
      clients: {
        isLoading: false,
        items: []
      }
    }
  },
  computed: {
    apiUrl () {
      return this.$store.getters.apiURL
    }
  },
  methods: {
    removeCurrentOrder () {
      this.form.order.id = ''
    },
    toggleClientState () {
      if (!this.form.client.isNew) {
        this.form.client.id = ''
        this.form.order.id = ''
      }

      this.form.client.isNew = !this.form.client.isNew
      this.form.order.isNew = this.form.client.isNew
    },
    customLabelClients ({ name, phone }) {
      return `${name} ${phone ? ' - ' + formatPhone(phone) : ''}`
    },
    async asyncFindClients (query) {
      if (!query.length) {
        this.clients.items = []
        return
      }

      this.clients.isLoading = true

      const { data: { clients: { data } } } = await this.$apollo.query({
        query: clientsIndex,
        variables: {
          where: whereClientsClause(query),
          page: 1
        }
      })

      this.clients.isLoading = false
      this.clients.items = data
    }
  }
}
</script>

<template>
  <div
    v-if="!form.client.isNew"
    class="mb-4"
  >
    <div class="d-flex justify-content-between align-items-center mb-2">
      <label
        for="client"
        class="fw-bold form-label text-primary"
      >Cliente</label>
      <AppButton
        color="success"
        class="fw-bold"
        btn-class="btn-sm"
        @click.prevent="toggleClientState"
      >
        Cadastrar novo
      </AppButton>
    </div>
    <AppSelect
      v-model="form.client.id"
      name="client"
      placeholder="Procure por nome ou telefone"
      :error="form.errors.get('client.id')"
      :custom-label="customLabelClients"
      :searchable="true"
      :internal-search="false"
      :options="clients.items"
      :loading="clients.isLoading"
      @open="form.errors.clear('client.id')"
      @search-change="asyncFindClients"
      @remove="removeCurrentOrder"
      @select="removeCurrentOrder"
    >
      <template #noOptions>
        Faça uma busca para exibir resultados
      </template>
      <template #noResult>
        Nenhum cliente encontrado, <a
          href="#"
          class="fw-bold text-decoration-none"
          @click.prevent="toggleClientState"
        >cadastrar novo</a>
      </template>
    </AppSelect>
  </div>
  <div
    v-else
    class="mb-4"
  >
    <div class="d-flex justify-content-between align-items-center mb-2">
      <label
        for="client"
        class="fw-bold form-label"
      >Nome do cliente</label>
      <AppButton
        color="primary"
        class="fw-bold"
        btn-class="btn-sm"
        @click.prevent="toggleClientState"
      >
        Procurar cliente
      </AppButton>
    </div>
    <AppInput
      id="client"
      v-model="form.client.name"
      :error="form.errors.get('client.name')"
      name="client.name"
      placeholder="Nome do cliente"
    />
  </div>
</template>
