<script>
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons'

import OrderFormValuesFinal from './OrderFormValuesFinal.vue'

export default {
  components: {
    OrderFormValuesFinal
  },
  props: {
    form: {
      type: Object,
      required: true
    },
    finalValue: {
      type: String,
      default: 'R$ 1.234,00'
    }
  },
  data: () => ({
    icons: {
      faFileInvoiceDollar
    }
  })
}
</script>

<template>
  <AppContainer>
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faFileInvoiceDollar"
        fixed-width
      />
      Valores finais
    </template>

    <template #body>
      <OrderFormValuesFinal
        :form="form"
        :final-value="finalValue"
      />
    </template>
  </AppContainer>
</template>
