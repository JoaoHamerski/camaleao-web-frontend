<script>
import { maskCurrencyBRL, maskPercent } from '@/utils/masks'
import { GetVias } from '@/graphql/Via.gql'
export default {
  props: {
    client: {
      type: Object,
      default: () => ({})
    },
    form: {
      type: Object,
      required: true
    },
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
      vias: [],
      hasDownPayment: false,
      maskCurrencyBRL: maskCurrencyBRL({ numeralPositiveOnly: true }),
      maskPercent: maskPercent()
    }
  },
}
</script>

<template>
  <div class="mt-3">
    <div class="row">
      <div class="col col-sm">
        <AppInput
          id="shipping_value"
          :value="form.shipping_value"
          :mask="maskCurrencyBRL"
          name="shipping_value"
          numeric
          optional
          @input="form.set({shipping_value: $event})"
        >
          Frete
        </AppInput>
      </div>
      <div class="col col-sm">
        <AppInput
          id="discount"
          :value="form.discount"
          :mask="maskCurrencyBRL"
          name="discount"
          :error="form.errors.get('discount')"
          optional
          numeric
          @input="form.set({discount: $event})"
        >
          Desconto
        </AppInput>
      </div>
      <div
        v-if="client.client_recommended"
        class="col col-sm"
      >
        <AppInput
          id="recommendation_bonus_percent"
          :value="form.recommendation_bonus_percent"
          name="recommendation_bonus_percent"
          numeric
          :mask="maskPercent"
          hint="Valor somado ao bônus do cliente que indicou."
          @input="form.set({ recommendation_bonus_percent: $event})"
        >
          Bônus de indicação
          <template #append>
            <AppButton
              disabled
              color="light"
            >
              <b>%</b>
            </AppButton>
          </template>
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
