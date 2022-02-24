<script>
import { faUser, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { isEmpty } from 'lodash-es'
import { formatPhone } from '@/utils/formatters'

import ClientCardItem from './ClientCardItem'
import ClientModalEdit from './ClientModalEdit'

export default {
  components: {
    ClientCardItem,
    ClientModalEdit
  },
  props: {
    client: {
      type: Object,
      default: () => ({})
    },
    showOptions: {
      type: Boolean,
      default: true
    },
    clientKey: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    return {
      clientModalEdit: {
        value: false,
        client: null
      },
      icons: {
        faUser,
        faEdit,
        faTrashAlt
      }
    }
  },
  computed: {
    key () {
      return this.clientKey || this.$route.params.clientKey
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
    isEmpty,
    onEditClientClick () {
      this.clientModalEdit.client = this.client
      this.clientModalEdit.value = true
    },
    onEditSuccess () {
      this.clientModalEdit.client = null
      this.clientModalEdit.value = false
    }
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
        v-if="!isEmpty(client)"
        #body
      >
        <ClientModalEdit
          v-model="clientModalEdit.value"
          :client="clientModalEdit.client"
          @success="onEditSuccess"
        />

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

        <hr>

        <div class="text-subtitle">
          <div class="mb-1">
            <span
              class="link-primary clickable text-decoration-none"
              @click.prevent="onEditClientClick"
            >
              <FontAwesomeIcon
                :icon="icons.faEdit"
                fixed-width
              />
              Editar dados
            </span>
          </div>
          <div>
            <span class="link-danger clickable">
              <FontAwesomeIcon
                :icon="icons.faTrashAlt"
                fixed-width
              />
              Excluir cliente
            </span>
          </div>
        </div>
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
