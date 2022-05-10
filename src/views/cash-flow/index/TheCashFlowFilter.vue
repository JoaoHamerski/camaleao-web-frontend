<script>
import { DateTime } from 'luxon'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { maskDate } from '@/utils/masks'

export default {
  props: {
    form: {
      type: Object,
      required: true
    },
    onSubmit: {
      type: Function,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      hasDateInterval: false,
      maskDate,
      icons: {
        faFilter
      }
    }
  },
  methods: {
    onTodayClick () {
      this.hasDateInterval = false

      this.form.set({
        start_date: DateTime.now().toFormat('dd/MM/yyyy'),
        final_date: ''
      })
    },
    onCurrentWeekClick () {
      this.hasDateInterval = true

      const weekStartDate = DateTime.now().startOf('week').toFormat('dd/MM/yyyy')
      const weekEndDate = DateTime.now().endOf('week').toFormat('dd/MM/yyyy')

      this.form.set({
        start_date: weekStartDate,
        final_date: weekEndDate
      })
    },
    onCurrentMonthClick () {
      this.hasDateInterval = true

      const monthStartDate = DateTime.now().startOf('month').toFormat('dd/MM/yyyy')
      const monthEndDate = DateTime.now().endOf('month').toFormat('dd/MM/yyyy')

      this.form.set({
        start_date: monthStartDate,
        final_date: monthEndDate
      })
    },
    onClearFilterClick () {
      this.hasDateInterval = false
      this.$emit('clear-filter')
    },
    balanceToggle(value) {
      this.$emit('balance-show-toggle', value)
    }
  }
}
</script>

<template>
  <AppCard
    color="success"
    collapsible
  >
    <template #header>
      <h6 class="mb-0 fw-bold">
        <FontAwesomeIcon
          :icon="icons.faFilter"
          fixed-width
        />
        Filtros
      </h6>
    </template>

    <template #body>
      <AppForm
        :on-submit="onSubmit"
        :form="form"
      >
        <div class="mb-3">
          Filtrar <b>pagamentos recebidos</b> e <b>despesas</b> pela data
        </div>

        <label class="form-label fw-bold">
          {{ hasDateInterval ? 'Datas' : 'Data' }}
        </label>

        <div class="row">
          <div class="col">
            <AppInput
              :value="form.start_date"
              name="start_date"
              type="date"
              numeric
              placeholder="dd/mm/aaaa"
              :mask="maskDate"
              :error="form.errors.get('start_date')"
              @input="form.set({start_date: $event})"
            />
          </div>

          <div
            v-if="hasDateInterval"
            class="col"
          >
            <AppInput
              :value="form.final_date"
              name="final_date"
              type="date"
              numeric
              placeholder="dd/mm/aaaa"
              :mask="maskDate"
              :error="form.errors.get('final_date')"
              @input="form.set({final_date: $event})"
            />
          </div>
        </div>

        <AppCheckbox
          id="date_interval"
          v-model="hasDateInterval"
          name="date_interval"
        >
          Por intervalo de datas
        </AppCheckbox>

        <AppCheckbox
          id="show_balance"
          :value="form.showBalance"
          name="show_balance"
          @input="balanceToggle"
        >
          Exibir balanço final
        </AppCheckbox>

        <div class="d-flex mb-4">
          <AppButton
            type="button"
            outlined
            btn-class="btn-sm"
            @click.prevent="onTodayClick"
          >
            Hoje
          </AppButton>

          <AppButton
            type="button"
            class="mx-2"
            outlined
            btn-class="btn-sm"
            @click.prevent="onCurrentWeekClick"
          >
            Semana atual
          </AppButton>

          <AppButton
            type="button"
            outlined
            btn-class="btn-sm"
            @click.prevent="onCurrentMonthClick"
          >
            Mês atual
          </AppButton>
        </div>

        <div class="d-flex mt-2">
          <AppButton
            class="me-2"
            color="success"
            btn-class="fw-bold"
            :loading="isLoading"
            @click.prevent="onSubmit"
          >
            Filtrar
          </AppButton>

          <AppButton
            type="button"
            color="success"
            outlined
            @click.prevent="onClearFilterClick"
          >
            Limpar filtros
          </AppButton>
        </div>
      </AppForm>
    </template>
  </AppCard>
</template>
