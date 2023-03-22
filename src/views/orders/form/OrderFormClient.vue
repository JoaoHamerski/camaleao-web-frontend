<script>
import { formatPhone } from '@/utils/formatters'
import { GetClientsForForm } from '@/graphql/Resources.gql'

export default {
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isLoadingClients: false,
      clients: []
    }
  },
  methods: {
    getWhereClause (query) {
      if (this.$helpers.isNumeric(query)) {
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
    },
    async onClientSearch (query) {
      this.isLoadingClients = true

      if (query === '') {
        this.clients = []
        this.isLoadingClients = false
        return
      }

      const { data: { clients } } = await this.$apollo.query({
        query: GetClientsForForm,
        variables: {
          where: this.getWhereClause(query),
          orderBy: [{ column: 'NAME', order: 'ASC' }]
        }
      })

      this.isLoadingClients = false

      this.clients = clients.data
    },
    clientCustomLabel (client) {
      if (client.phone) {
        return `${client.name} - ${formatPhone(client.phone)}`
      }

      return client.name
    }
  }
}
</script>

<template>
  <AppContainer class="mb-4">
    <template #title>
      Cliente do pedido
    </template>
    <template #body>
      <AppSelect
        id="client_id"
        :value="form.client_id"
        name="client_id"
        track-by="id"
        :options="clients"
        :custom-label="clientCustomLabel"
        :loading="isLoadingClients"
        placeholder="Busque um cliente..."
        :error="form.errors.get('client_id')"
        @input="form.set({client_id: $event})"
        @search-change="onClientSearch"
      >
        <template #noOptions>
          Faça uma busca para exibir resultados
        </template>

        Nome ou telefone do cliente:
      </AppSelect>
    </template>
  </AppContainer>
</template>
