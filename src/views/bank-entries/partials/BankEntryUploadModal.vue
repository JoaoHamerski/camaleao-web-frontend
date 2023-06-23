<script>
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { UploadBankEntry } from '@/graphql/BankEntry.gql'

export default {
  props: {
    entry: {
      type: Object,
      required: true
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isLoading: false,
      replace: false,
      fileAlreadyExists: false,
      icons: {
        faUpload
      }
    }
  },
  methods: {
    resetModal() {
      this.fileAlreadyExists = false
      this.replace = false
    },
    checkIfFileAlreadyExists(error) {
      const errors = error?.graphQLErrors[0]?.extensions?.validation?.filename
      if (!errors) {
        return
      }

      if (errors.includes('unique')) {
        this.fileAlreadyExists = true
      }
    },
    async onConfirmClick() {
      const input = {
        replace: this.replace,
        filename: this.entry.file.name,
        json_file: JSON.stringify(this.entry.data)
      }

      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: UploadBankEntry,
          variables: {
            input
          }
        })

        this.$helpers.clearCacheFrom([
          {fieldName: 'bankEntries'},
          {fieldName: 'entriesBankMirror'},
        ])

        this.$toast.success('Arquivo enviado!')
        this.$emit('success')
      } catch (error) {
        if (error.graphQLErrors) {
          this.checkIfFileAlreadyExists({...error})
        }

        this.$toast.error('Ops! Algo deu errado.')
      }

      this.isLoading = false
    }
  }
}
</script>

<template>
  <AppModal
    id="bankEntryUploadModal"
    :value="value"
    v-on="$listeners"
    @hidden="resetModal"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faUpload"
        fixed-width
      />
      Enviando arquivo de entradas
    </template>

    <template
      v-if="value"
      #body
    >
      <div class="text-center">
        <FontAwesomeIcon
          :icon="icons.faUpload"
          size="3x"
          class="text-primary"
        />
      </div>
      <div class="text-center my-5">
        <h6 class="text-secondary fw-bold mb-3">
          Você está enviando o seguinte arquivo
        </h6>
        <h5 class="text-primary fw-bold">
          {{ entry.file.name }}
        </h5>
      </div>

      <div v-show="fileAlreadyExists">
        <div class="text-danger fw-bold">
          O arquivo enviado já consta no banco de dados
        </div>
        <AppCheckbox
          id="fileAlreadyExistsCheckbox"
          v-model="replace"
        >
          Substituir arquivo pelo atual
        </AppCheckbox>
      </div>

      <div class="row mt-2">
        <div class="col">
          <AppButton
            color="success"
            btn-class="fw-bold"
            block
            :loading="isLoading"
            @click.prevent="onConfirmClick"
          >
            Confirmar
          </AppButton>
        </div>
        <div class="col">
          <AppButton
            block
            data-bs-dismiss="modal"
            color="light"
            :disabled="isLoading"
          >
            Cancelar
          </AppButton>
        </div>
      </div>
    </template>
  </AppModal>
</template>
