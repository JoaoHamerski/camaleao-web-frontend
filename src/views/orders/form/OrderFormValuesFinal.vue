<script>
import { form } from './OrderForm.vue'

import { maskCurrencyBRL } from '@/utils/masks'
import { GetVias } from '@/graphql/Via.gql'

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    finalValue: {
      type: [String, Number],
      default: ''
    },
  },
  apollo: {
    vias: {
      query: GetVias
    }
  },
  data () {
    return {
      form,
      vias: [],
      hasDownPayment: false,
      maskCurrencyBRL: maskCurrencyBRL({ numeralPositiveOnly: true }),
    }
  },
}
</script>

<template>
  <div class="mt-3">
    <div
      v-if="!isEdit"
      class="row"
    >
      <div class="form-group">
        <AppCheckbox
          id="hasDownPaymentCheckbox"
          v-model="hasDownPayment"
          name="hasDownPaymentCheckbox"
        >
          Pagamento de entrada
        </AppCheckbox>
      </div>
      <template v-if="hasDownPayment">
        <div
          class="col-12 col-sm"
        >
          <AppInput
            id="down_payment"
            v-model="form.down_payment"
            name="down_payment"
            :mask="maskCurrencyBRL"
            :error="form.errors.get('down_payment')"
            optional
          >
            Entrada
          </AppInput>
        </div>
        <div class="col-12 col-sm">
          <AppSimpleSelect
            v-model="form.payment_via_id"
            name="payment_via_id"
            :options="vias"
            label-prop="name"
            :error="form.errors.get('payment_via_id')"
            :disabled="!hasDownPayment"
          >
            Via da entrada
          </AppSimpleSelect>
        </div>
      </template>
    </div>
    <div class="row">
      <div class="col-6 col-sm">
        <AppInput
          id="shipping_value"
          v-model="form.shipping_value"
          :mask="maskCurrencyBRL"
          name="shipping_value"
          numeric
          optional
        >
          Frete
        </AppInput>
      </div>
      <div class="col-6 col-sm">
        <AppInput
          id="discount"
          v-model="form.discount"
          :mask="maskCurrencyBRL"
          name="discount"
          :error="form.errors.get('discount')"
          optional
          numeric
        >
          Desconto
        </AppInput>
      </div>
    </div>
    <div class="col-12 col-sm">
      <AppInput
        :value="finalValue"
        disabled
        name="final_value"
        disabled-message="O preço final é calculado automaticamente."
      >
        Preço final
      </AppInput>
    </div>
  </div>
</template>
