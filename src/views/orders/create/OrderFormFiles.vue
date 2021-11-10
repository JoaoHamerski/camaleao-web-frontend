<script>
import { formatBytes } from '@/utils/formatters'
import { truncate } from 'lodash-es'
import filesMixin from '@/mixins/filesMixin'
import OrderFormFilesModal from './OrderFormFilesModal'

const VALID_TYPES = {
  art_paths: 'image',
  size_paths: 'image',
  payment_voucher_paths: ['image', 'pdf']
}

export default {
  components: {
    OrderFormFilesModal
  },
  mixins: [filesMixin],
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      VALID_TYPES,
      maxFileSize: 1048576,
      modal: false,
      transferedItems: []
    }
  },
  watch: {
    transferedItems (items) {
      if (items.length === 0) {
        this.modal = false
      }
    }
  },
  async mounted () {
    document.addEventListener('paste', async (event) => {
      try {
        const items = event.clipboardData.items
        const files = await this.getBase64Files(items)

        this.transferedItems = files
        this.modal = true
      } catch (error) {
        this.$toast.error('Não foi possível detectar um arquivo na área de transferência.')
      }
    })
  },
  methods: {
    formatBytes,
    truncate,
    async onFilesSelected (fileList, field) {
      const base64Files = await this.getBase64Files(fileList)
      const files = this.getOnlyValidFiles(base64Files, VALID_TYPES[field])

      this.$emit('attach-files', {
        files, field
      })
    },
    onTransferToField (field) {
      const files = this.getOnlyValidFiles(
        this.transferedItems,
        VALID_TYPES[field]
      )

      this.$emit('attach-files', {
        files, field
      })

      this.modal = false
      this.transferedItems = []
    },
    onFileDelete (fileKey, field) {
      this.$emit('delete-file', {
        fileKey, field
      })
    },
    onCancel () {
      this.transferedItems = []
    },
    onModalDeleteFile (fileKey) {
      const index = this.transferedItems.findIndex(
        item => item.key === fileKey
      )

      this.transferedItems.splice(index, 1)
    }
  }
}
</script>

<template>
  <div class="mt-3">
    <OrderFormFilesModal
      v-model="modal"
      :max-file-size="maxFileSize"
      :items="transferedItems"
      @cancel="onCancel"
      @transfer-to-field="onTransferToField"
      @delete-file="onModalDeleteFile"
    />

    <h5 class="text-secondary fw-bold">
      Anexos
    </h5>
    <div class="fw-bold small text-secondary mb-3">
      Tamanho máximo para cada arquivo: {{ formatBytes(maxFileSize) }}
    </div>

    <div>
      <AppInputFile
        id="art_paths"
        centered
        multiple
        optional
        accept="image/*"
        @input="onFilesSelected($event, 'art_paths')"
      >
        Imagens da arte
      </AppInputFile>
      <AppViewerItems
        :files="form.art_paths"
        :max-file-size="maxFileSize"
        @delete-file="onFileDelete($event, 'art_paths')"
      >
        <template #file-info="{ file }">
          <div class="small text-secondary text-center">
            ({{ truncate(file.name, { length: 15 }) }} - <b>{{ formatBytes(file.size) }}</b>)
          </div>
        </template>
      </AppViewerItems>
    </div>

    <div>
      <AppInputFile
        id="size_paths"
        centered
        multiple
        optional
        accept="image/*"
        @input="onFilesSelected($event, 'size_paths')"
      >
        Imagens do tamanho
      </AppInputFile>
      <AppViewerItems
        :files="form.size_paths"
        :max-file-size="maxFileSize"
        @delete-file="onFileDelete($event, 'size_paths')"
      >
        <template #file-info="{ file }">
          <div class="small text-secondary text-center">
            ({{ truncate(file.name, { length: 15 }) }} - <b>{{ formatBytes(file.size) }}</b>)
          </div>
        </template>
      </AppViewerItems>
    </div>

    <AppInputFile
      id="payment_voucher_paths"
      centered
      multiple
      optional
      accept="image/*,application/pdf"
      @input="onFilesSelected(
        $event,
        'payment_voucher_paths',
        VALID_TYPES.payment_voucher_paths
      )"
    >
      Comprovantes de pagamento
    </AppInputFile>

    <AppViewerItems
      list-type="card"
      :files="form.payment_voucher_paths"
      :max-file-size="maxFileSize"
      @delete-file="onFileDelete($event, 'payment_voucher_paths')"
    >
      <template #file-info="{ file }">
        <div class="small text-secondary text-center">
          (<span
            v-tippy="{placement: 'bottom'}"
            :content="file.name"
          >{{ truncate(file.name, { length: 15 }) }}
          </span> - <b>{{ formatBytes(file.size) }}</b>)
        </div>
      </template>
    </AppViewerItems>
  </div>
</template>
