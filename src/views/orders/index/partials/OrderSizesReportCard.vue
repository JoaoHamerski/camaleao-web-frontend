<script>
import OrdersSizesReportCardForm from './OrdersSizesReportCardForm.vue';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';

export default {
  components: {
    OrdersSizesReportCardForm
  },
  data: () => ({
    icons: {
      faClipboardList
    }
  })
}
</script>

<template>
  <AppCard
    id="orderSizesReportCard"
    color="success"
    collapsible
    :collapsed="true"
  >
    <template #header>
      <h6 class="fw-bold mb-0">
        <FontAwesomeIcon
          fixed-width
          :icon="icons.faClipboardList"
        />
        Relatório de tamanhos
      </h6>
    </template>

    <template #body>
      <h6 class="fw-bold">
        Intervalo de datas
      </h6>

      <OrdersSizesReportCardForm />
    </template>
  </AppCard>
</template>
