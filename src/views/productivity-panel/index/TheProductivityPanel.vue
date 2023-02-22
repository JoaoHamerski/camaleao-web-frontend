<script>
import { faColumns } from '@fortawesome/free-solid-svg-icons'
import PiecesBySectorBody from '@/views/production-track/partials/PiecesBySectorBody.vue'

export default {
  metaInfo: {
    title: 'Painel de Produtividade'
  },
  components: {
    PiecesBySectorBody
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
      <PiecesBySectorBody />
    </template>
  </AppCard>
</template>
