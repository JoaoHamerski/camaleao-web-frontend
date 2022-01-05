<script>
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { maskDate } from '@/utils/masks'

export default {
  data () {
    return {
      icons: {
        faFilter
      },
      dates: {
        first: '',
        second: ''
      },
      isBetweenDates: false,
      maskDate
    }
  }
}
</script>

<template>
  <AppCard
    collapsible
    color="success"
  >
    <template #header>
      <h6 class="fw-bold mb-0">
        <FontAwesomeIcon
          :icon="icons.faFilter"
          fixed-width
        />
        Filtros
      </h6>
    </template>

    <template #body>
      <div class="row">
        <div class="form-label fw-bold">
          {{ isBetweenDates ? 'Datas' : 'Data' }}
        </div>
        <div class="col">
          <AppInput
            v-model="dates.first"
            name="date-first"
            placeholder="dd/mm/aaaa"
            type="date"
            :mask="maskDate"
          />
        </div>
        <div
          v-if="isBetweenDates"
          class="col"
        >
          <AppInput
            v-model="dates.second"
            name="date-first"
            placeholder="dd/mm/aaaa"
            type="date"
            :mask="maskDate"
          />
        </div>
      </div>

      <AppCheckbox
        id="betweenDates"
        v-model="isBetweenDates"
      >
        Por intervalo de datas
      </AppCheckbox>

      <AppButton outlined>
        Gerar relatório
      </AppButton>
    </template>
  </AppCard>
</template>
