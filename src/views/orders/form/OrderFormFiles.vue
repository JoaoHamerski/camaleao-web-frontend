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
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      VALID_TYPES,
      maxFileSize: 1048576,
      modal: false,
      transferedItems: [],
      pasteEnabled: false
    }
  },
  watch: {
    transferedItems (items) {
      if (items.length === 0) {
        this.modal = false
      }
    }
  },
  mounted () {
    document.addEventListener('paste', this.onPasteEvent)
  },
  beforeDestroy () {
    document.removeEventListener('paste', this.onPasteEvent)
  },
  methods: {
    formatBytes,
    truncate,
    async onPasteEvent (event) {
      try {
        const items = event.clipboardData.items
        const files = await this.getBase64Files(items)

        this.transferedItems = files
        this.modal = true
      } catch (error) {
        this.$toast.error('Não foi possível detectar um arquivo na área de transferência.')
      }
    },
    async onFileSelected (fileList, field) {
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
    onModalDeleteFile (key) {
      const index = this.transferedItems.findIndex(
        item => item.key === key
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
        @input="onFileSelected($event, 'art_paths')"
      >
        Imagens da arte
      </AppInputFile>
      <AppViewerItems
        show-delete-button
        :attachments="form.art_paths"
        :max-file-size="maxFileSize"
        @delete-attach="onFileDelete($event, 'art_paths')"
      >
        <template
          v-if="!isEdit"
          #attach-info="{ attach }"
        >
          <div class="small text-secondary text-center">
            ({{ truncate(attach.name, { length: 15 }) }} - <b>{{ formatBytes(attach.size) }}</b>)
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
        @input="onFileSelected($event, 'size_paths')"
      >
        Imagens do tamanho
      </AppInputFile>
      <AppViewerItems
        show-delete-button
        :attachments="form.size_paths"
        :max-file-size="maxFileSize"
        @delete-attach="onFileDelete($event, 'size_paths')"
      >
        <template
          v-if="!isEdit"
          #attach-info="{ attach }"
        >
          <div class="small text-secondary text-center">
            ({{ truncate(attach.name, { length: 15 }) }} - <b>{{ formatBytes(attach.size) }}</b>)
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
      @input="onFileSelected(
        $event,
        'payment_voucher_paths',
        VALID_TYPES.payment_voucher_paths
      )"
    >
      Comprovantes de pagamento
    </AppInputFile>

    <AppViewerItems
      show-delete-button
      list-type="card"
      :attachments="form.payment_voucher_paths"
      :max-file-size="maxFileSize"
      @delete-attach="onFileDelete($event, 'payment_voucher_paths')"
    >
      <template
        v-if="!isEdit"
        #attach-info="{ attach }"
      >
        <div class="small text-secondary text-center">
          (<span
            v-tippy="{placement: 'bottom'}"
            :content="attach.name"
          >{{ truncate(attach.name, { length: 15 }) }}
          </span> - <b>{{ formatBytes(attach.size) }}</b>)
        </div>
      </template>
    </AppViewerItems>
  </div>
</template>
