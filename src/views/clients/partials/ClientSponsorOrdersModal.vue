<script>
import { isEmpty } from 'lodash-es'
import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons'
import ClientSponsorOrders from './ClientSponsorOrders.vue'

export default {
  components: {
    ClientSponsorOrders
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    client: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      icons: {
        faHandHoldingUsd
      }
    }
  },
  methods: {
    isEmpty
  }
}
</script>
<template>
  <AppModal
    id="clientSponsorOrdersModal"
    :value="value"
    modal-dialog-class="modal-lg"
    v-on="$listeners"
  >
    <template
      v-if="client"
      #title
    >
      <FontAwesomeIcon
        :icon="icons.faHandHoldingUsd"
        fixed-width
      />
      Patrocínios feitos por {{ client.name }}
    </template>

    <template #body>
      <ClientSponsorOrders
        v-if="value"
        :client="client"
      />
    </template>

    <template #footer>
      <div class="text-end">
        <AppButton
          color="light"
          data-bs-dismiss="modal"
        >
          Fechar
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>
