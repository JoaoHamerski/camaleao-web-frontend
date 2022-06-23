<script>
import { formatPhone } from '@/utils/formatters'
import { GetClientsForForm } from '@/graphql/Resources.gql'
import{ isNumeric } from '@/utils/helpers'

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
    value: {
      type: [Object, String],
      default: ''
    },
    id: {
      type: String,
      required: true
    },
    error: undefined
  },
  data () {
    return {
      clients: {
        items: [],
        isLoading: false
      }
    }
  },
  methods: {
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
        query: GetClientsForForm,
        variables: {
          where: whereClientsClause(query),
          page: 1
        }
      })

      this.clients.isLoading = false
      this.clients.items = data
    },
  }
}
</script>

<template>
  <AppSelect
    :id="id"
    :value="value"
    :name="id"
    :options="clients.items"
    placeholder="Procure por nome ou telefone"
    :error="error"
    :custom-label="customLabelClients"
    :searchable="true"
    :internal-search="false"
    :loading="clients.isLoading"
    v-on="$listeners"
    @search-change="asyncFindClients"
  >
    <slot />

    <template
      v-if="$slots.noOptions"
      #noOptions
    >
      <slot name="noOptions" />
    </template>

    <template
      v-if="$slots.noResult"
      #noResult
    >
      <slot name="noResult" />
    </template>
  </AppSelect>
</template>
