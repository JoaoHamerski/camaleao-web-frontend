<script>
import { faFilter } from '@fortawesome/free-solid-svg-icons'

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
      icons: {
        faFilter
      }
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
              v-model="form.start_date"
              name="start_date"
              type="date"
              placeholder="dd/mm/aaaa"
              :error="form.errors.get('start_date')"
            />
          </div>

          <div
            v-if="hasDateInterval"
            class="col"
          >
            <AppInput
              v-model="form.end_date"
              name="end_date"
              type="date"
              placeholder="dd/mm/aaaa"
              :error="form.errors.get('end_date')"
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

        <div class="d-flex mb-4">
          <AppButton
            type="button"
            outlined
            btn-class="btn-sm"
          >
            Hoje
          </AppButton>

          <AppButton
            type="button"
            class="mx-2"
            outlined
            btn-class="btn-sm"
          >
            Semana atual
          </AppButton>

          <AppButton
            type="button"
            outlined
            btn-class="btn-sm"
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
          >
            Limpar filtros
          </AppButton>
        </div>
      </AppForm>
    </template>
  </AppCard>
</template>
