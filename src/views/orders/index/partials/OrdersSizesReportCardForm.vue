<script>
import Form from '@/utils/Form';
import { GetOrderSizesReportUrl } from '@/graphql/Order.gql'
import { handleError } from '@/utils/forms';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const FIELDS = [
  {name: 'Modelo', value: 'MODEL'},
  {name: 'Material', value: 'MATERIAL'},
  {name: 'Tipo de gola', value: 'NECK_TYPE'},
  {name: 'Tipo de manga', value: 'SLEEVE_TYPE'},
]

export default {
  data: () => ({
    FIELDS,
    isLoading: false,
    icons: {
      faQuestionCircle
    },
    form: new Form({
      initial_date: '',
      final_date: '',
      groups: ['MODEL'],
      indicators: false
    }),
  }),
  methods: {
    async onSubmit () {
      const input = this.form.data()

      this.isLoading = true

      try {
        const {data: { ordersSizesReport }} = await this.$apollo.query({
          query: GetOrderSizesReportUrl,
          variables: { input }
        })

        this.$helpers.openInNewTab(ordersSizesReport)
      } catch (error) {
        handleError(this, error)
      }

      this.isLoading = false
    }
  }
}
</script>
<template>
  <AppForm
    :on-submit="onSubmit"
    :form="form"
  >
    <div class="row">
      <div class="col">
        <AppInput
          id="initial_date"
          v-model="form.initial_date"
          name="initial_date"
          placeholder="dd/mm/aaaa"
          type="date"
          :error="form.errors.get('initial_date')"
          hint="Informe apenas a data inicial para filtra por uma data específica."
        >
          Data inicial
        </AppInput>
      </div>
      <div class="col">
        <AppInput
          id="final_date"
          v-model="form.final_date"
          name="final_date"
          placeholder="dd/mm/aaaa"
          type="date"
          :error="form.errors.get('final_date')"
        >
          Data final
        </AppInput>
      </div>
    </div>
    <div class="col mb-3">
      <AppCheckbox
        id="indicator"
        v-model="form.indicators"
        :value="true"
      >
        Indicadores
        <FontAwesomeIcon
          v-tippy
          :icon="icons.faQuestionCircle"
          fixed-width
          class="text-secondary small"
          content="Exibe indicadores para ajudar a localizar um pedido quando ele se encontra em mais de uma tabela"
        />
      </AppCheckbox>
    </div>

    <div
      class="col mb-3"
      @focus.capture="form.errors.clear('groups')"
    >
      <div class="fw-bold form-label">
        Incluir grupos:
      </div>
      <template v-for="field in FIELDS">
        <div
          :key="field.value"
          class="col form-check"
        >
          <input
            :id="field.value"
            v-model="form.groups"
            type="checkbox"
            class="form-check-input me-2"
            :value="field.value"
          >
          <label
            class="form-check-label"
            :for="field.value"
          >{{ field.name }}</label>
        </div>
      </template>
      <div
        v-if="form.errors.has('groups')"
        class="small text-danger"
      >
        {{ form.errors.get('groups') }}
      </div>
    </div>

    <div>
      <AppButton
        type="submit"
        outlined
        :loading="isLoading"
      >
        Gerar relatório
      </AppButton>
    </div>
  </AppForm>
</template>
