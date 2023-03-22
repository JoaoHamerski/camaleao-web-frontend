<script>
import TheBudgetGeneratorHeader from './TheBudgetGeneratorHeader.vue'
import TheBudgetGeneratorBody from './TheBudgetGeneratorBody.vue'

export default {
  metaInfo: {
    title: 'Gerador de Orçamento'
  },
  components: {
    TheBudgetGeneratorHeader,
    TheBudgetGeneratorBody
  }
}
</script>

<template>
  <div>
    <TheBudgetGeneratorHeader />
    <TheBudgetGeneratorBody />
  </div>
</template>
