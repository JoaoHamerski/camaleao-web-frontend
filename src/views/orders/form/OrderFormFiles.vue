<script>
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { formatBytes } from '@/utils/formatters'
import { truncate } from 'lodash-es'
import filesMixin from '@/mixins/filesMixin'
import pasteFilesMixin from '@/mixins/pasteFilesMixin'
import OrderFormFilesModal from './OrderFormFilesModal.vue'

const VALID_TYPES = {
  art_paths: 'image',
  size_paths: 'image',
  payment_voucher_paths: ['image', 'pdf']
}

export default {
  components: {
    OrderFormFilesModal
  },
  mixins: [filesMixin, pasteFilesMixin],
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
      transferredItems: [],
      pasteEnabled: false,
      icons: {
        faFileAlt
      }
    }
  },
  watch: {
    transferredItems (items) {
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
    afterPaste (pastedFiles) {
      this.transferredItems = pastedFiles
      this.modal = true
    },
    async onFileSelected (fileList, field) {
      const base64Files = await this.getBase64Files(fileList)
      const files = this.getOnlyValidFiles(base64Files, VALID_TYPES[field])

      this.$emit('selected-files', {
        files, field
      })
    },
    onTransferToField (field) {
      const files = this.getOnlyValidFiles(
        this.transferredItems,
        VALID_TYPES[field]
      )

      this.$emit('selected-files', {
        files, field
      })

      this.modal = false
      this.transferredItems = []
    },
    onFileDelete (fileKey, field) {
      this.$emit('delete-file', {
        fileKey, field
      })
    },
    onCancel () {
      this.transferredItems = []
    },
    onModalDeleteFile (key) {
      const index = this.transferredItems.findIndex(
        item => item.key === key
      )

      this.transferredItems.splice(index, 1)
    }
  }
}
</script>

<template>
  <AppContainer>
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faFileAlt"
        fixed-width
      />
      Anexos
    </template>

    <template #body>
      <OrderFormFilesModal
        v-model="modal"
        :max-file-size="maxFileSize"
        :items="transferredItems"
        @cancel="onCancel"
        @transfer-to-field="onTransferToField"
        @delete-file="onModalDeleteFile"
      />

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
          :files="form.art_paths"
          :max-file-size="maxFileSize"
          @delete-file="onFileDelete($event, 'art_paths')"
        >
          <template
            v-if="!isEdit"
            #file-info="{ file }"
          >
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
          @input="onFileSelected($event, 'size_paths')"
        >
          Imagens do tamanho
        </AppInputFile>
        <AppViewerItems
          show-delete-button
          :files="form.size_paths"
          :max-file-size="maxFileSize"
          @delete-file="onFileDelete($event, 'size_paths')"
        >
          <template
            v-if="!isEdit"
            #file-info="{ file }"
          >
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
        :files="form.payment_voucher_paths"
        :max-file-size="maxFileSize"
        @delete-file="onFileDelete($event, 'payment_voucher_paths')"
      >
        <template
          v-if="!isEdit"
          #file-info="{ file }"
        >
          <div class="small text-secondary text-center">
            (<span
              v-tippy="{placement: 'bottom'}"
              :content="file.name"
            >{{ truncate(file.name, { length: 15 }) }}
            </span> - <b>{{ formatBytes(file.size) }}</b>)
          </div>
        </template>
      </AppViewerItems>
    </template>
  </AppContainer>
</template>
