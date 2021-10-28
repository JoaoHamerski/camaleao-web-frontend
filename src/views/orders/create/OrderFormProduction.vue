<script>
import { maskDate } from '@/utils/masks'

export default {
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      maskDate
    }
  }
}
</script>

<template>
  <div class="mt-3">
    <h5 class="text-secondary fw-bold">
      Produção e entrega
    </h5>

    <div class="row">
      <div class="col">
        <AppInput
          id="production_date"
          v-model="form.production_date"
          name="production_date"
          :mask="maskDate"
          optional
          placeholder="dd/mm/aaaa"
        >
          Data de produção
        </AppInput>
      </div>

      <div class="col">
        <AppInput
          id="delivery_date"
          v-model="form.delivery_date"
          name="delivery_date"
          :mask="maskDate"
          optional
          placeholder="dd/mm/aaaa"
        >
          Data de entrega
        </AppInput>
      </div>
    </div>
  </div>
</template>
