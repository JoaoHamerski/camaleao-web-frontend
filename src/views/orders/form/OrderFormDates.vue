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
      Datas
    </template>

    <template #body>
      <div class="row">
        <div class="col-12 col-sm">
          <AppInput
            id="print_date"
            :value="form.print_date"
            type="date"
            name="print_date"
            placeholder="dd/mm/aaaa"
            :mask="maskDate"
            :error="form.errors.get('print_date')"
            @input="form.set({print_date: $event})"
          >
            Data de estampa
          </AppInput>
        </div>
        <div class="col-12 col-sm">
          <AppInput
            id="seam_date"
            :value="form.seam_date"
            type="date"
            name="seam_date"
            placeholder="dd/mm/aaaa"
            :mask="maskDate"
            :error="form.errors.get('seam_date')"
            @input="form.set({seam_date: $event})"
          >
            Data de costura
          </AppInput>
        </div>
        <div class="col-12 col-sm">
          <AppInput
            id="delivery_date"
            :value="form.delivery_date"
            name="delivery_date"
            type="date"
            placeholder="dd/mm/aaaa"
            :mask="maskDate"
            :error="form.errors.get('delivery_date')"
            @input="form.set({delivery_date: $event})"
          >
            Data de entrega
          </AppInput>
        </div>
      </div>
    </template>
  </AppContainer>
</template>
