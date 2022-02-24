<script>
import { faBox } from '@fortawesome/free-solid-svg-icons'
import TheProductionUsersCardTable from './TheProductionUsersCardTable'
import ProductionUsersNavTab from '../partials/ProductionUsersNavTabs'

export default {
  components: {
    TheProductionUsersCardTable,
    ProductionUsersNavTab
  },
  props: {
    commissions: {
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
        faBox
      }
    }
  },
  methods: {
    onTabChange (value) {
      this.$emit('tab-changed', value)
    }
  }
}
</script>

<template>
  <AppCard>
    <template #header>
      <h6 class="fw-bold mb-0">
        <FontAwesomeIcon
          :icon="icons.faBox"
          fixed-width
        />
        Pedidos da produção
      </h6>
    </template>
    <template #body>
      <AppLoading v-show="isLoading" />
      <ProductionUsersNavTab
        class="mt-2 mb-4"
        @change="onTabChange"
      />
      <TheProductionUsersCardTable :items="commissions" />
    </template>
  </AppCard>
</template>
