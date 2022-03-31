<script>
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { isEmpty } from 'lodash-es'

import ClientModalEdit from './ClientModalEdit'
import ClientCardItems from './ClientCardItems'
import ClientCardFooter from './ClientCardFooter'
import ClientCardNotExist from './ClientCardNotExist'
import ClientModalDelete from './ClientModalDelete.vue'
import { clients } from '@/constants/route-names'

export default {
  components: {
    ClientModalEdit,
    ClientCardItems,
    ClientCardFooter,
    ClientCardNotExist,
    ClientModalDelete
  },
  props: {
    client: {
      type: Object,
      default: null
    },
    showOptions: {
      type: Boolean,
      default: true
    },
    clientKey: {
      type: [String, Number],
      default: null
    },
    isLoading: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      clientModalEdit: {
        value: false,
        client: null
      },
      clientModalDelete: {
        value: false,
        client: null
      },
      icons: {
        faUser
      }
    }
  },
  computed: {
    key () {
      return this.clientKey || this.$route.params.clientKey
    }
  },
  methods: {
    isEmpty,
    onEditClient () {
      this.clientModalEdit.client = this.client
      this.clientModalEdit.value = true
    },
    onDeleteClient () {
      this.clientModalDelete.client = this.client
      this.clientModalDelete.value = true
    },
    onEditSuccess () {
      this.clientModalEdit.client = null
      this.clientModalEdit.value = false
    },
    onDeleteSuccess () {
      this.clientModalDelete.value = false
      this.$nextTick(() => {
        this.$helpers.clearCacheFrom({id: this.client.id, __typename: 'Client'})

        this.$router.push({name: clients.index})
      })
    }
  }
}
</script>

<template>
  <AppCard
    color="success"
    :collapsible="$isMobile"
  >
    <template #header>
      <h6 class="mb-0 fw-bold">
        <FontAwesomeIcon
          class="fa-fw"
          :icon="icons.faUser"
        />
        <template v-if="client">
          {{ $isMobile ? client.name : 'Cliente' }}
        </template>
      </h6>
    </template>

    <template
      v-if="!isEmpty(client)"
      #body
    >
      <template v-if="clientModalEdit.value">
        <ClientModalEdit
          v-model="clientModalEdit.value"
          :client="clientModalEdit.client"
          @success="onEditSuccess"
        />
      </template>

      <ClientModalDelete
        v-model="clientModalDelete.value"
        :client="clientModalDelete.client"
        @success="onDeleteSuccess"
      />

      <ClientCardItems :client="client" />

      <hr>

      <ClientCardFooter
        @edit-client="onEditClient"
        @delete-client="onDeleteClient"
      />
    </template>
    <template
      v-else-if="isLoading"
      #body
    >
      <div class="py-5">
        <AppLoading />
      </div>
    </template>
    <template
      v-else-if="isEmpty(client)"
      #body
    >
      <ClientCardNotExist />
    </template>
  </AppCard>
</template>
