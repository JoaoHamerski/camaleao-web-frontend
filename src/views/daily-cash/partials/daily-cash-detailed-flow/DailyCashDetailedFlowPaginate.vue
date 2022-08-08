<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      required: true
    },
    page: {
      type: [Number, String],
      required: true
    },
    datePaginationInterval: undefined
  },
  methods: {
    paginate(to) {
      this.$emit('paginate', to)
    }
  }
}
</script>
<template>
  <div class="d-flex flex-column flex-sm-row justify-content-between">
    <div class="mb-3 text-center text-sm-start">
      <div class="btn-group mb-2">
        <button
          class="btn btn-outline-primary"
          :class="date !== '' && 'disabled'"
          @click="paginate('previous')"
        >
          Anterior
        </button>
        <button
          class="btn btn-outline-primary"
          :class="(page === 1 || date !== '') && 'disabled'"
          @click="paginate('next')"
        >
          Próximo
        </button>
      </div>
      <div class="fw-bold small">
        {{ datePaginationInterval }}
      </div>
    </div>

    <div>
      <AppInput
        id="month"
        :value="value"
        name="month"
        type="month"
        placeholder="mm/aaaa"
        @input="$emit('input', $event)"
      >
        Mês específico:
      </AppInput>
    </div>
  </div>
</template>
