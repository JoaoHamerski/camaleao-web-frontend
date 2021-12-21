<script>
import Form from '@/utils/Form'
import { maskCurrencyBRL, maskDate } from '@/utils/masks'
import { handleError, handleSuccess } from '@/utils/forms'

const ENDPOINTS = {
  vias: {
    get: '/api/vias'
  },
  payments: {
    post (clientKey, orderKey) {
      return `/api/clients/${clientKey}/orders/${orderKey}/payments`
    },
    patch (clientKey, orderKey, paymentKey) {
      return `/api/clients/${clientKey}/orders/${orderKey}/payments/${paymentKey}/`
    }
  }
}

export default {
  chimera: {
    _vias () {
      return {
        url: ENDPOINTS.vias.get
      }
    },
    _newPayment () {
      return {
        method: 'POST',
        url: ENDPOINTS.payments.post(this.clientKey, this.orderKey),
        params: {
          ...this.form.data()
        },
        on: {
          error ({ error }) {
            handleError(this, error)
          },
          success () {
            handleSuccess(this, {
              message: 'Pagamento registrado com sucesso!',
              closeModal: true,
              resetForm: true
            })
          }
        }
      }
    },
    _updatePayment () {
      return {
        method: 'PATCH',
        url: ENDPOINTS.payments.patch(
          this.clientKey,
          this.orderKey,
          this.paymentKey
        ),
        params: {
          ...this.form.data()
        },
        on: {
          error ({ error }) {
            handleError(this, error)
          },
          success () {
            handleSuccess(this, {
              message: 'Pagamento atualizado com sucesso!'
            })
          }
        }
      }
    }
  },
  props: {
    payment: {
      type: Object,
      default: () => {}
    },
    totalOwing: {
      type: [Number, String],
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: new Form({
        value: 'R$ ',
        date: '',
        payment_via_id: '',
        note: ''
      }),
      maskCurrencyBRL: maskCurrencyBRL(),
      maskDate,
      isLoading: false
    }
  },
  computed: {
    vias () {
      return this.$chimera._vias?.data?.data || []
    },
    clientKey () {
      return this.$route.params.clientKey
    },
    orderKey () {
      return this.$route.params.orderKey
    },
    paymentKey () {
      return this.payment?.id
    }
  },
  watch: {
    payment (payment) {
      if (!payment) {
        this.form.payment_via_id = ''
        this.form.note = ''

        return
      }

      this.form.payment_via_id = payment.payment_via?.id
      this.form.note = payment.note
    }
  },
  methods: {
    payRest () {
      this.form.value = this.$helpers.toBRL(this.totalOwing)
    },
    async store () {
      try {
        await this.$chimera._newPayment.fetch()
      } catch (error) {}
    },
    async update () {
      try {
        await this.$chimera._updatePayment.fetch()
      } catch (error) {}
    },
    async onSubmit () {
      this.isLoading = true

      if (this.isEdit) {
        await this.update()
      } else {
        await this.store()
      }

      this.isLoading = false
    }
  }
}
</script>

<template>
  <AppForm
    :on-submit="onSubmit"
    :form="form"
  >
    <template v-if="!isEdit">
      <AppInput
        id="value"
        v-model="form.value"
        name="value"
        :error="form.errors.get('value')"
        :mask="maskCurrencyBRL"
      >
        Valor

        <template #append>
          <AppButton
            outlined
            :tooltip="$helpers.toBRL(totalOwing)"
            @click.prevent="payRest"
          >
            Restante
          </AppButton>
        </template>
      </AppInput>

      <AppInput
        id="date"
        v-model="form.date"
        placeholder="dd/mm/aaaa"
        name="date"
        type="date"
        today-button
        :mask="maskDate"
        :error="form.errors.get('date')"
      >
        Data de pagamento
      </AppInput>
    </template>

    <AppSimpleSelect
      id="payment_via_id"
      v-model="form.payment_via_id"
      name="payment_via_id"
      :options="vias"
      label-prop="name"
      :error="form.errors.get('payment_via_id')"
    >
      Via
    </AppSimpleSelect>

    <AppInput
      id="note"
      v-model="form.note"
      name="note"
      placeholder="Anotação extra do pagamento..."
      :error="form.errors.get('note')"
    >
      Observação
    </AppInput>

    <div class="d-flex justify-content-between mt-4">
      <AppButton
        type="submit"
        color="success"
        class="fw-bold"
        :loading="isLoading"
      >
        {{ isEdit ? 'ATUALIZAR' : 'REGISTRAR' }}
      </AppButton>

      <AppButton
        type="button"
        color="light"
        data-bs-dismiss="modal"
      >
        Cancelar
      </AppButton>
    </div>
  </AppForm>
</template>
