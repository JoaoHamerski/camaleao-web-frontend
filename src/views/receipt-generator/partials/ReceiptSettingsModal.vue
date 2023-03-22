<script>
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { GetReceiptURL } from '@/graphql/Receipt.gql'

import ReceiptSettingsForm from './ReceiptSettingsForm.vue'

export default {
  components: {
    ReceiptSettingsForm
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isPreviewLoading: false,
      icons: {
        faCog
      }
    }
  },
  methods: {
    async onPreviewClick () {
      this.isPreviewLoading = true

      try {
        const { data: { receiptUrl } } = await this.$apollo.query({
          query: GetReceiptURL,
          variables: {
            preview: true
          }
        })

        this.$helpers.openInNewTab(receiptUrl);
      } catch (error) {
        this.$toast.error('Ops! Algo deu errado.')
      }

      this.isPreviewLoading = false
    }
  }
}
</script>
<template>
  <AppModal
    id="receiptSettingsModal"
    :value="value"
    modal-dialog-class="modal-lg"
    focus="false"
    keyboard="false"
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faCog"
        fixed-width
      />
      Configurações do recibo
    </template>
    <template #body>
      <div class="text-end mb-2">
        <AppButton
          v-tippy
          outlined
          class="fw-bold"
          content="Salve antes de pre-visualizar"
          :loading="isPreviewLoading"
          @click.prevent="onPreviewClick"
        >
          Pré-visualizar
        </AppButton>
      </div>
      <KeepAlive>
        <ReceiptSettingsForm v-if="value" />
      </KeepAlive>
    </template>
  </AppModal>
</template>
