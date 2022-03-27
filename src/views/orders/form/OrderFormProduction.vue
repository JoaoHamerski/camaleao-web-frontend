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
  <AppContainer class="mt-3">
    <template #title>
      Produção e entrega
    </template>

    <template #body>
      <div class="row">
        <div class="col-12 col-sm">
          <AppInput
            id="production_date"
            v-model="form.production_date"
            type="date"
            name="production_date"
            placeholder="dd/mm/aaaa"
            :mask="maskDate"
            :error="form.errors.get('production_date')"
          >
            Data de produção
          </AppInput>
        </div>
        <div class="col-12 col-sm">
          <AppInput
            id="delivery_date"
            v-model="form.delivery_date"
            name="delivery_date"
            type="date"
            placeholder="dd/mm/aaaa"
            :mask="maskDate"
            :error="form.errors.get('delivery_date')"
          >
            Data de entrega
          </AppInput>
        </div>
      </div>
    </template>
  </AppContainer>
</template>
