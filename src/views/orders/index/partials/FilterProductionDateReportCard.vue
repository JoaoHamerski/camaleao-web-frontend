<script>
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { maskDate } from '@/utils/masks'

export default {
  data () {
    return {
      maskDate,
      filter: {
        production_date: '',
        order: 'is_open'
      },
      icons: {
        faClipboardList
      }
    }
  },
  computed: {
    orderOptions () {
      return [
        { id: 'is_open_2', label: 'Em aberto', value: 'is_open' },
        { id: 'all_2', label: 'Todos', value: 'all' }
      ]
    }
  }
}
</script>

<template>
  <AppCard
    id="productionDateReportCard"
    color="success"
    :collapsible="true"
    :collapsed="true"
  >
    <template #header>
      <h6 class="fw-bold mb-0">
        <FontAwesomeIcon
          :icon="icons.faClipboardList"
          fixed-width
        /> Relatório por data de produção
      </h6>
    </template>
    <template #body>
      <h6 class="fw-bold">
        Filtros
      </h6>

      <AppInput
        id="production_date"
        v-model="filter.production_date"
        name="production_date"
        placeholder="dd/mm/aaaa"
        :mask="maskDate"
        type="date"
      >
        Data de produção
      </AppInput>

      <div class="d-flex mb-3">
        <div class="fw-bold me-2">
          Pedidos:
        </div>
        <AppRadio
          v-model="filter.order"
          :options="orderOptions"
        />
      </div>

      <AppButton outlined>
        Gerar relatório
      </AppButton>
    </template>
  </AppCard>
</template>
