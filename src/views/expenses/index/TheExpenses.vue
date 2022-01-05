<script>
import FilterCard from './FiltersCard'
import TheExpensesBody from './TheExpensesBody'
import TheExpensesHeader from './TheExpensesHeader'

export default {
  metaInfo () {
    return {
      title: 'Despesas'
    }
  },
  components: {
    FilterCard,
    TheExpensesBody,
    TheExpensesHeader
  }
}
</script>

<template>
  <div class="mt-5">
    <FilterCard class="mb-2" />
    <TheExpensesHeader />
    <TheExpensesBody />
  </div>
</template>
