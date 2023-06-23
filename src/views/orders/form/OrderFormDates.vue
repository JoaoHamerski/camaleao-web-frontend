<script>
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
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
      maskDate,
      icons: {
        faCalendarAlt
      }
    }
  }
}
</script>

<template>
  <AppContainer class="mt-3">
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faCalendarAlt"
        fixed-width
      />
      Datas
    </template>

    <template #body>
      <div class="row">
        <div class="col-12 col-sm">
          <AppInput
            id="delivery_date"
            :value="form.delivery_date"
            name="delivery_date"
            type="date"
            placeholder="dd/mm/aaaa"
            :mask="maskDate"
            numeric
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
