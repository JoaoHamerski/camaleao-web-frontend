<script>
import { faUser } from '@fortawesome/free-solid-svg-icons'
import ClientCardItem from './ClientCardItem'

import { formatPhone } from '@/utils/formatters'

export default {
  components: {
    ClientCardItem
  },
  chimera: {
    _client () {
      return {
        url: `/api/clients/${this.clientId}`
      }
    }
  },
  props: {
    clientId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      icons: {
        faUser
      }
    }
  },
  computed: {
    client () {
      return this.$chimera._client?.data?.data
    },
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
  <AppCard
    v-if="client"
    color="success"
  >
    <template #header>
      <h6 class="mb-0 fw-bold">
        <FontAwesomeIcon
          class="fa-fw"
          :icon="icons.faUser"
        /> Cliente
      </h6>
    </template>
    <template #body>
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
        :text="$helpers.toBRL(client.total_owing)"
      />
    </template>
  </AppCard>
</template>
