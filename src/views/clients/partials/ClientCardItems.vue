<script>
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { formatPhone } from '@/utils/formatters'
import ClientCardItem from './ClientCardItem.vue'
import { getUrl } from '@/utils/helpers'

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
  data () {
    return {
      icons: {
        faEye
      }
    }
  },
  computed: {
    clientHasBalance () {
      return this.client.has_balance && this.client.balance > 0
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
    formatPhone,
    getUrl,
    onShowBalancesClick () {
      this.$emit('show-balances')
    }
  }
}
</script>
<template>
  <!-- eslint-disable vue/no-v-html -->
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
    <template v-if="client.client_recommended">
      <hr>
      <ClientCardItem
        label="Indicação de"
      >
        <template #text>
          <a
            target="_blank"
            :href="getUrl('clients.show', {client: client.client_recommended.id})"
            class="text-decoration-none"
          >{{ $helpers.fallback(client.client_recommended, 'name') }}</a>
        </template>
      </ClientCardItem>
    </template>
    <hr>

    <ClientCardItem
      :color="client.total_owing > 0 ? 'danger' : 'success'"
      label="Total devendo"
    >
      <template #text>
        <span v-html="$helpers.toBRL(client.total_owing, true)" />
      </template>
    </ClientCardItem>

    <template v-if="client.is_sponsor">
      <hr>
      <ClientCardItem
        :color="client.total_owing_as_sponsorship > 0 ? 'danger' : 'success'"
        label="Total devendo como patrocínio"
      >
        <template #text>
          <span v-html="$helpers.toBRL(client.total_owing_as_sponsorship, true)" />
        </template>
      </ClientCardItem>
    </template>

    <template v-if="clientHasBalance">
      <hr>
      <ClientCardItem
        label="Saldo"
        :color="client.balance > 0 ? 'success' : 'danger'"
      >
        <template #text>
          <span v-html="$helpers.toBRL(client.balance, true)" />
          <span class="ms-2">
            <FontAwesomeIcon
              v-tippy
              content="Ver mais"
              class="clickable link-primary"
              :icon="icons.faEye"
              fixed-width
              @click.prevent="onShowBalancesClick"
            />
          </span>
        </template>
      </ClientCardItem>
    </template>
  </div>
</template>
