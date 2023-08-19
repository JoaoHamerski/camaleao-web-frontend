<script>
import { faColumns } from '@fortawesome/free-solid-svg-icons'
import ProductionPanelBody from '@/views/production-track/partials/ProductionPanelBody.vue'

export default {
  metaInfo: {
    title: 'Painel de Produtividade'
  },
  components: {
    ProductionPanelBody
  },
  data () {
    return {
      icons: {
        faColumns
      }
    }
  }
}
</script>

<template>
  <AppCard class="mt-2">
    <template #header>
      <h6 class="mb-0 fw-bold">
        <FontAwesomeIcon
          :icon="icons.faColumns"
          fixed-width
        />
        Painel de Produtividade
      </h6>
    </template>
    <template #body>
      <ProductionPanelBody />
    </template>
  </AppCard>
</template>
