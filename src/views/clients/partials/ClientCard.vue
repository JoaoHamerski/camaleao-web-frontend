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
        url: `/api/clients/${this.id}`,
        on: {
          success ({ data }) {
            this.$emit('client', data.data)
          }
        }
      }
    }
  },
  props: {
    clientId: {
      type: [String, Number],
      default: null
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
    id () {
      return this.clientId || this.$route.params.client
    },
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
  <keep-alive>
    <AppCard
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
      <template
        v-if="client"
        #body
      >
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
      </template>
      <template
        v-else
        #body
      >
        <div class="py-5">
          <AppLoading />
        </div>
      </template>
    </AppCard>
  </keep-alive>
</template>
