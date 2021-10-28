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
        >
          Preço final
        </AppInput>
      </div>
      <div class="col">
        <AppInput
          v-model="form.discount"
          :mask="maskCurrencyBRL"
          name="discount"
          optional
        >
          Desconto
        </AppInput>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <AppInput
          v-model="form.down_payment"
          name="down_payment"
          :mask="maskCurrencyBRL"
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
          :disabled="!hasDownPayment"
        >
          Vias
        </AppSimpleSelect>
      </div>
    </div>
  </div>
</template>
