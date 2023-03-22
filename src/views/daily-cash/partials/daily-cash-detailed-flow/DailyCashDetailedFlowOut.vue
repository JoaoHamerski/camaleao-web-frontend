<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div class="col mb-2 mb-sm-0">
    <div class="fw-bold">
      SAÍDAS
    </div>
    <h2 class="fw-bold text-danger mb-0 text-nowrap">
      {{ $helpers.toBRL(item.out.total) }}
    </h2>
    <div>
      <div
        v-for="expenseType in item.out.expense_types"
        :key="expenseType.name"
        class="small"
      >
        {{ expenseType.name }}: <b class="text-danger">{{ $helpers.toBRL(expenseType.total) }}</b>
      </div>
    </div>
  </div>
</template>
