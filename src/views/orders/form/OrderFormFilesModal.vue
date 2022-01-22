<script>
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { truncate } from 'lodash-es'
import { formatBytes } from '@/utils/formatters'

export default {
  props: {
    items: {
      type: Array,
      default: () => ([])
    },
    maxFileSize: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      icons: {
        faUpload
      }
    }
  },
  methods: {
    formatBytes,
    truncate,
    onCancelClick () {
      this.$emit('cancel')
    },
    emitFieldToTransfer (field) {
      this.$emit('transfer-to-field', field)
    },
    onDeleteFile (fileKey) {
      this.$emit('delete-file', fileKey)
    }
  }
}
</script>

<template>
  <AppModal
    id="orderFormFilesModal"
    centered
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template #title>
      Escolha onde deseja anexar o(s) arquivo(s)
    </template>

    <template #body>
      <div class="mb-3">
        <AppViewerItems
          :max-file-size="maxFileSize"
          col="6"
          show-delete-button
          :files="items"
          @delete-file="onDeleteFile"
        >
          <template #file-info="{ file }">
            <div class="small text-secondary text-center">
              ({{ truncate(file.name, { length: 15 }) }} - <b>{{ formatBytes(file.size) }}</b>)
            </div>
          </template>
        </AppViewerItems>
      </div>

      <div class="d-flex flex-column justify-content-center">
        <AppButton
          type="button"
          class="fw-bold d-block mb-3"
          :icon="icons.faUpload"
          @click="emitFieldToTransfer('art_paths')"
        >
          <br>Imagens da arte
        </AppButton>
        <AppButton
          type="button"
          class="fw-bold d-block mb-3"
          :icon="icons.faUpload"
          @click="emitFieldToTransfer('size_paths')"
        >
          <br>Imagens do tamanho
        </AppButton>
        <AppButton
          type="button"
          class="fw-bold d-block mb-3"
          :icon="icons.faUpload"
          @click="emitFieldToTransfer('payment_voucher_paths')"
        >
          <br>Comprovantes de pagamento
        </AppButton>
      </div>

      <div class="text-end">
        <AppButton
          type="button"
          data-bs-dismiss="modal"
          color="light"
          @click="onCancelClick"
        >
          Cancelar
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>
