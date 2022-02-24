<script>
import { faTshirt } from '@fortawesome/free-solid-svg-icons'
import { handleSuccess, handleError } from '@/utils/forms'
import { commissionValueUpsert } from '@/graphql/Production.gql'
import Form from '@/utils/Form'

const CONFIG_NAME = 'orders'
const CONFIG_KEY = 'print_commission'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isLoading: false,
      form: new Form({
        value: 'R$ '
      }),
      icons: {
        faTshirt
      }
    }
  },
  methods: {
    async onModalShow () {
      const commission = await this.$helpers.getConfig(CONFIG_NAME, CONFIG_KEY)

      this.form.value = this.$helpers.toBRL(commission)
    },
    async onSubmit () {
      const data = this.form.data()

      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: commissionValueUpsert,
          variables: {
            value: data.value
          }
        })

        handleSuccess(this, { message: 'Comissão de estampa alterada!' })
      } catch (error) {
        handleError(this, error)
      }

      this.isLoading = false
    }
  }
}
</script>

<template>
  <AppModal
    id="modalPrintCommission"
    centered
    :value="value"
    v-on="$listeners"
    @show="onModalShow"
  >
    <template #title>
      Comissão de estampa
    </template>
    <template #body>
      <div>
        <div class="text-center">
          <FontAwesomeIcon
            :icon="icons.faTshirt"
            size="4x"
            class="text-primary mb-3"
          />
          <h6 class="fw-bold my-4">
            Altere o valor da comissão de estampa
          </h6>
        </div>

        <AppForm
          :form="form"
          :on-submit="onSubmit"
        >
          <AppInput
            id="value"
            v-model="form.value"
            name="value"
            :error="form.errors.get('value')"
          >
            Valor:
          </AppInput>

          <div class="row mt-4">
            <div class="col">
              <AppButton
                color="success"
                btn-class="fw-bold"
                block
                :loading="isLoading"
              >
                Confirmar
              </AppButton>
            </div>

            <div class="col">
              <AppButton
                type="button"
                data-bs-dismiss="modal"
                color="light"
                block
              >
                Cancelar
              </AppButton>
            </div>
          </div>
        </AppForm>
      </div>
    </template>
  </AppModal>
</template>
