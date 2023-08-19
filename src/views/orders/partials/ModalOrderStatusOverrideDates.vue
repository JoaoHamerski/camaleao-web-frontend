<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    status: {
      type: Array,
      required: true
    }
  },
  computed: {
    statusWithConfirmedDates () {
      return this.status.filter(s => s.pivot.confirmed_at)
    },
    radioOptions () {
      return [
        {label: 'Mantê-los com a data que está', value: 'KEEP'},
        {label: 'Atualizá-los para agora', value: 'UPDATE'},
      ]
    },
    tableHeaders () {
      return [
        {text: 'Status', value: 'text'},
        {text: 'Confirmado em', value: 'pivot.confirmed_at', format: 'datetime', formatting: 'dd/MM/y HH:mm:ss'},
      ]
    },
  },
  methods: {
    onInputChange (option) {
      this.$emit('input', option)
    }
  }
}
</script>

<template>
  <div>
    <div class="fw-bold small">
      Os seguintes status já possuem uma data de confirmação:
    </div>
    <AppTable
      :row-class="() => 'small'"
      table-class="table-sm"
      :items="statusWithConfirmedDates"
      :headers="tableHeaders"
    />
    <div class="small text-secondary mb-3">
      É possível que eles tenham sido auto-cancelados devido a alterações gerais nos status do sistema.
    </div>
    <div class="fw-bold small">
      O que você gostaria de fazer:
      <div>
        <AppRadio
          :value="value"
          name="override-option"
          :options="radioOptions"
          @input="onInputChange"
        />
      </div>
    </div>
  </div>
</template>
