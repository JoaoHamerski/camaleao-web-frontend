<script>
import { some } from 'lodash-es'
import { faBox, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

import TheProductionCardTable from './TheProductionCardTable'

export default {
  components: {
    TheProductionCardTable
  },
  props: {
    commissionsUser: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      icons: {
        faBox,
        faExclamationTriangle
      }
    }
  },
  computed: {
    hasAnyOrderQuantityChanged () {
      return some(this.commissionsUser, { pivot: { was_quantity_changed: true } })
    }
  }
}
</script>

<template>
  <AppCard id="productionCard">
    <template #header>
      <h6 class="fw-bold mb-0">
        <FontAwesomeIcon
          :icon="icons.faBox"
          fixed-width
        />
        Pedidos em produção
      </h6>
    </template>

    <template #body>
      <AppLoading v-show="isLoading" />
      <template v-if="hasAnyOrderQuantityChanged">
        <div class="text-center">
          <FontAwesomeIcon
            :icon="icons.faExclamationTriangle"
            class="text-warning"
            size="3x"
          />
        </div>
        <div class="mb-3">
          <h6 class="text-center fw-bold mt-3 mb-0">
            Alguns pedidos tiveram a sua quantidade alterada, por favor, verifique-os novamente.
          </h6>
          <div class="text-secondary text-center text-subtitle">
            (pedidos em amarelo)
          </div>
        </div>
      </template>
      <TheProductionCardTable :items="commissionsUser" />
    </template>
  </AppCard>
</template>
