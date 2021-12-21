<script>
import accounting from 'accounting-js'
import { maskCurrencyBRL } from '@/utils/masks'

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
  data () {
    return {
      maskCurrencyBRL: maskCurrencyBRL({ numeralPositiveOnly: true })
    }
  },
  chimera: {
    _vias () {
      return {
        url: '/api/vias'
      }
    }
  },
  computed: {
    vias () {
      return this.$chimera._vias?.data?.data || []
    },
    hasDownPayment () {
      return accounting.unformat(this.form.down_payment, ',') > 0
    }
  }
}
</script>

<template>
  <div class="mt-3">
    <div class="row">
      <div class="col">
        <AppInput
          :value="finalValue"
          disabled
          name="final_value"
          disabled-message="O preço final é calculado automaticamente."
        >
          Preço final
        </AppInput>
      </div>
      <div
        class="col"
      >
        <AppInput
          id="discount"
          v-model="form.discount"
          :mask="maskCurrencyBRL"
          name="discount"
          :error="form.errors.get('discount')"
          optional
        >
          Desconto
        </AppInput>
      </div>
    </div>

    <div
      v-if="!isEdit"
      class="row"
    >
      <div class="col">
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
      <div class="col">
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
    </div>
  </div>
</template>
