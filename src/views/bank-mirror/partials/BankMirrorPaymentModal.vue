<script>
import { handleError } from '@/utils/forms'
import { faLink } from '@fortawesome/free-solid-svg-icons'

import { TieBankMirrorPayment } from '@/graphql/Entry.gql'

import DailyPaymentForm from '@/views/daily-cash/partials/daily-cash-payment/DailyPaymentForm.vue'

export default {
  components: {
    DailyPaymentForm
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    payment: {
      type: Object,
      required: true,
    }
  },
  data () {
    return {
      icons: {
        faLink
      },
      isLoading: false,
    }
  },
  methods: {
    async onSubmit (form, getFormattedForm) {
      const input = getFormattedForm(form.data())

      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: TieBankMirrorPayment,
          variables: { input }
        })

        this.$helpers.clearCacheFrom([
          {fieldName: 'dailyCash'},
          {fieldName: 'cashFlowEntries'},
        ])

        this.$toast.success('Vinculado com sucesso!')
        this.$emit('success')
      } catch(error) {
        handleError(this.$refs.dailyPaymentForm, error)
      }

      this.isLoading = false
    }
  }
}
</script>

<template>
  <AppModal
    id="bankMirrorPaymentModal"
    :value="value"
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faLink"
        fixed-width
      />
      Vincular pagamento
    </template>

    <template #body>
      <DailyPaymentForm
        v-if="value"
        ref="dailyPaymentForm"
        :payment="payment"
      >
        <template
          #footer="{form, getFormattedForm}"
        >
          <div class="row">
            <div class="col">
              <AppButton
                color="success"
                class="fw-bold"
                block
                :loading="isLoading"
                :icon="icons.faLink"
                @click.prevent="onSubmit(form, getFormattedForm)"
              >
                Vincular
              </AppButton>
            </div>

            <div class="col">
              <AppButton
                color="light"
                data-bs-dismiss="modal"
                type="button"
                block
                :disabled="isLoading"
              >
                Cancelar
              </AppButton>
            </div>
          </div>
        </template>
      </DailyPaymentForm>
    </template>
  </AppModal>
</template>
