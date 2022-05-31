<script>
import PendenciesOnMonthBody from '../partials/PendenciesOnMonthBody.vue'
import { faBoxes } from '@fortawesome/free-solid-svg-icons'

export default {
  components: {
    PendenciesOnMonthBody
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    month: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      icons: {
        faBoxes
      }
    }
  }
}
</script>

<template>
  <AppModal
    id="pendenciesOnMonthOrdersModal"
    :value="value"
    modal-dialog-class="modal-fullscreen"
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faBoxes"
        fixed-width
      />
      Pedidos contabilizados nas pendências do mês {{ month === 'current' ? 'atual' : 'anterior' }}
    </template>

    <template #body>
      <PendenciesOnMonthBody
        v-if="value"
        :month="month"
      />
    </template>
    <template #footer>
      <div class="text-end">
        <AppButton
          class="fw-bold"
          data-bs-dismiss="modal"
        >
          Fechar
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>
