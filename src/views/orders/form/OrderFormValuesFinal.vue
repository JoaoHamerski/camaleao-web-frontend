<script>
import { maskCurrencyBRL } from '@/utils/masks'
import { vias } from '@/graphql/Via.gql'

export default {
  props: {
    finalValue: {
      type: [String, Number],
      required: true
    },
    form: {
      type: Object,
      required: true
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  apollo: {
    vias: {
      query: vias
    }
  },
  data () {
    return {
      vias: [],
      hasDownPayment: false,
      maskCurrencyBRL: maskCurrencyBRL({ numeralPositiveOnly: true })
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
            :value="form.down_payment"
            name="down_payment"
            :mask="maskCurrencyBRL"
            :error="form.errors.get('down_payment')"
            optional
            @input="form.set({
              down_payment: $event
            })"
          >
            Entrada
          </AppInput>
        </div>
        <div class="col-12 col-sm">
          <AppSimpleSelect
            :value="form.payment_via_id"
            name="payment_via_id"
            :options="vias"
            label-prop="name"
            :error="form.errors.get('payment_via_id')"
            :disabled="!hasDownPayment"
            @input="form.set({
              payment_via_id: $event
            })"
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
          :value="form.shipping_value"
          :mask="maskCurrencyBRL"
          name="shipping_value"
          numeric
          optional
          @input="form.set({
            shipping_value: $event
          })"
        >
          Frete
        </AppInput>
      </div>
      <div class="col-6 col-sm">
        <AppInput
          id="discount"
          :value="form.discount"
          :mask="maskCurrencyBRL"
          name="discount"
          :error="form.errors.get('discount')"
          optional
          numeric
          @input="form.set({
            discount: $event
          })"
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
