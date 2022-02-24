<script>
import Form from '@/utils/Form'
import { maskCurrencyBRL } from '@/utils/masks'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import {
  clothingTypes,
  clothingTypeCreate,
  clothingTypeUpdate
} from '@/graphql/ClothingType.gql'
import { handleSuccess, handleError } from '@/utils/forms'

export default {
  props: {
    clothingType: {
      type: Object,
      default: null
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isLoading: false,
      form: new Form({
        name: '',
        commission: 'R$ ',
        is_hidden: false
      }),
      icons: {
        faExclamationCircle
      },
      maskCurrencyBRL: maskCurrencyBRL()
    }
  },
  computed: {
    isHiddenLabel () {
      return this.isEdit
        ? 'Ocultar dos formulários'
        : 'Manter oculto inicialmente'
    },
    isHiddenHelperMessage () {
      return this.isEdit
        ? 'Oculta dos formulários de cadastrado.'
        : 'Manter oculto dos formulários inicialmente, pode alterar isso no futuro.'
    }
  },
  mounted () {
    if (this.isEdit) {
      this.populateForm()
    }
  },
  methods: {
    populateForm () {
      this.form.name = this.clothingType.name
      this.form.commission = this.$helpers.toBRL(this.clothingType.commission)
      this.form.is_hidden = this.clothingType.is_hidden
    },
    async create (input) {
      try {
        await this.$apollo.mutate({
          mutation: clothingTypeCreate,
          variables: { input },
          refetchQueries: [{ query: clothingTypes }]
        })

        handleSuccess(this, { message: 'Tipo de roupa cadastrada!', resetForm: true })
      } catch (error) {
        handleError(this, error)
      }
    },
    async update (input) {
      try {
        await this.$apollo.mutate({
          mutation: clothingTypeUpdate,
          variables: {
            id: this.clothingType.id,
            input
          },
          refetchQueries: [{ query: clothingTypes }]
        })

        handleSuccess(this, { message: 'Tipo de roupa atualizado!', resetForm: true })
      } catch (error) {
        handleError(this, error)
      }
    },
    async onSubmit () {
      const data = this.form.data()

      this.isLoading = true

      if (this.isEdit) {
        await this.update(data)
      } else {
        await this.create(data)
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
  >
    <AppInput
      id="name"
      v-model="form.name"
      name="name"
      placeholder="Digite um nome para o tipo..."
      :error="form.errors.get('name') || form.errors.get('key')"
    >
      Nome do tipo:
    </AppInput>

    <AppInput
      id="commission"
      v-model="form.commission"
      name="commission"
      :mask="maskCurrencyBRL"
      :error="form.errors.get('commission')"
    >
      Comissão:
    </AppInput>

    <AppCheckboxSwitch
      id="is_hidden"
      v-model="form.is_hidden"
    >
      {{ isHiddenLabel }}

      <FontAwesomeIcon
        v-tippy
        class="text-primary"
        fixed-width
        :icon="icons.faExclamationCircle"
        :content="isHiddenHelperMessage"
      />
    </AppCheckboxSwitch>

    <div class="row mt-4">
      <div class="col">
        <AppButton
          block
          color="success"
          btn-class="fw-bold"
          :loading="isLoading"
        >
          {{ isEdit ? 'Atualizar' : 'Cadastrar' }}
        </AppButton>
      </div>

      <div class="col">
        <AppButton
          type="button"
          data-bs-dismiss="modal"
          block
          color="light"
        >
          Cancelar
        </AppButton>
      </div>
    </div>
  </AppForm>
</template>
