<script>
import PendenciesOfMonthBody from './PendenciesOfMonthBody.vue'
import { faBoxes } from '@fortawesome/free-solid-svg-icons'
import { DateTime } from 'luxon'

export default {
  components: {
    PendenciesOfMonthBody
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    date: {
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
  },
  computed: {
    getDateName () {
      return DateTime
        .fromISO(this.date)
        .setLocale('pt-br')
        .toFormat("LLLL 'de' y")
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
      Pedidos contabilizados nas pendências de <span class="text-uppercase">{{ getDateName }}</span>
    </template>

    <template #body>
      <PendenciesOfMonthBody
        v-if="value"
        :date="date"
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
