<script>
import { formatPhone } from '@/utils/formatters'
import ClientCardItem from './ClientCardItem.vue'

export default {
  components: {
    ClientCardItem
  },
  props: {
    client: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    clientCityInfo () {
      const city = this.client.city?.name
      const state = this.client.city?.state?.abbreviation

      if (!city) {
        return 'N/A'
      }

      return `${city} - ${state || 'N/A'}`
    },
    clientBranchInfo () {
      const city = this.client.branch?.city?.name
      const state = this.client.branch?.city?.state?.name

      if (!city) {
        return 'N/A'
      }

      return `${city} - ${state || 'N/A'}`
    }
  },
  methods: {
    formatPhone
  }
}
</script>
<template>
  <div>
    <ClientCardItem
      label="Nome"
      :text="client.name"
    />
    <hr>
    <ClientCardItem
      label="Telefone/Celular"
      :text="formatPhone(client.phone)"
    />
    <hr>
    <ClientCardItem
      label="Cidade"
      :text="clientCityInfo"
    />
    <hr>
    <ClientCardItem
      label="Filial"
      :text="clientBranchInfo"
    />
    <hr>
    <ClientCardItem
      label="Transportadora"
      :text="$helpers.fallback(client.shipping_company, 'name')"
    />
    <hr>
    <ClientCardItem
      :color="client.total_owing > 0 ? 'danger' : 'success'"
      label="Total devendo"
    >
      <template #text>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="$helpers.toBRL(client.total_owing, true)" />
      </template>
    </ClientCardItem>
  </div>
</template>
