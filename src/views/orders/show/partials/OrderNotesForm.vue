<script>
import {
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import { noteCreate, noteUpdate } from '@/graphql/Note.gql'
import { handleSuccess, handleError } from '@/utils/forms'
import Form from '@/utils/Form'

export default {
  props: {
    note: {
      type: Object,
      default: () => ({})
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    orderId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isLoading: false,
      icons: {
        faCheck,
        faTimes
      },
      form: new Form({
        text: ''
      })
    }
  },
  mounted () {
    this.$refs.input.focusInput()

    if (this.isEdit) {
      this.form.text = this.note.text
    }
  },
  methods: {
    async onSubmit () {
      if (this.isEdit) {
        await this.onUpdate()
      } else {
        await this.onCreate()
      }
    },
    onCancel () {
      this.$emit('cancel')
    },
    async onCreate () {
      const { text } = this.form.data()

      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: noteCreate,
          variables: {
            order_id: this.orderId,
            text
          }
        })

        handleSuccess(this, { message: 'Anotação registrada!' })
      } catch (error) {
        handleError(this, error)
      }

      this.isLoading = false
    },
    async onUpdate () {
      const { id } = this.note
      const { text } = this.form.data()

      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: noteUpdate,
          variables: { id, text }
        })
        handleSuccess(this, { message: 'Anotação atualizada!' })
      } catch (error) {
        handleError(this, error)
      }

      this.isLoading = false
    }
  }
}
</script>

<template>
  <AppForm
    :form="form"
    :on-submit="onSubmit"
    class="w-100"
  >
    <div class="d-flex flex-column flex-sm-row">
      <div class="flex-grow-1">
        <AppInput
          ref="input"
          v-model="form.text"
          name="text"
          placeholder="Digite a anotação..."
          :default-margin="false"
          :error="form.errors.get('text')"
        />
      </div>
      <div class="ms-sm-2 ms-auto mt-2 mt-sm-0">
        <AppButton
          class="me-2"
          btn-class="px-4 px-sm-3"
          :loading="isLoading"
          :icon="icons.faCheck"
          color="success"
          @click.prevent="onSubmit"
        />
        <AppButton
          btn-class="px-4 px-sm-3"
          :disabled="isLoading"
          type="button"
          :icon="icons.faTimes"
          color="light"
          @click.prevent="onCancel"
        />
      </div>
    </div>
  </AppForm>
</template>
