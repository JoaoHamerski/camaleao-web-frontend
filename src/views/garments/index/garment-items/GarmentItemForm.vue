<script>
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import Form from '@/utils/Form'
import { handleError } from '@/utils/forms'
import { isEmpty } from 'lodash-es'

const INPUT_SIZE_MASK = {
  blocks: [3],
  uppercase: true
}

export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    itemQueryName: {
      type: String,
      required: true
    },
    submit: {
      type: Function,
      default: () => {}
    }
  },
  data: () => ({
    isLoading: false,
    form: new Form({
      name: ''
    }),
    icons: {
      faCheck,
      faTimes
    }
  }),
  computed: {
    isEdit () {
      return !isEmpty(this.item)
    },
    mask () {
      if (this.itemQueryName === 'garmentSizes') {
        return INPUT_SIZE_MASK
      }

      return undefined
    }
  },
  mounted () {
    this.$refs.input.focusInput()

    if (this.isEdit) {
      this.populateForm()
    }
  },
  methods: {
    populateForm () {
      this.form.name = this.item.name
    },
    async onSubmit () {
      const input = this.form.data()

      this.isLoading = true

      try {
        await this.submit(this.item.id, input)
      } catch (error) {
        handleError(this, error)
      }

      this.isLoading = false
    },
    onCancelClick () {
      this.$emit('cancel')
    }
  }
}
</script>

<template>
  <AppForm
    :on-submit="onSubmit"
    :form="form"
    class="d-flex justify-content-between align-items-baseline w-100"
  >
    <AppInput
      id="name"
      ref="input"
      v-model="form.name"
      name="name"
      placeholder="Digite um nome..."
      :default-margin="false"
      class="w-100 me-2"
      :error="form.errors.get('name')"
      :mask="mask"
      input-class="form-control-sm"
    />

    <div class="d-flex ">
      <AppButton
        color="success"
        :icon="icons.faCheck"
        outlined
        btn-class="btn-sm"
        class="me-2"
        :loading="isLoading"
      />
      <AppButton
        color="danger"
        :icon="icons.faTimes"
        outlined
        btn-class="btn-sm"
        type="button"
        :disabled="isLoading"
        @click.prevent="onCancelClick"
      />
    </div>
  </AppForm>
</template>
