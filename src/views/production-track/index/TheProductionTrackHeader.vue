<script>
import {
  faTasks,
  faSyncAlt,
  faTshirt
} from '@fortawesome/free-solid-svg-icons'
import roles from '@/constants/roles'

import ProductionPanelModal from '../partials/ProductionPanelModal.vue'

export default {
  components: {
    ProductionPanelModal
  },
  data () {
    return {
      ProductionPanelModal: false,
      roles,
      icons: {
        faTasks,
        faSyncAlt,
        faTshirt
      }
    }
  },
  methods: {
    ProductionPanelClick () {
      this.ProductionPanelModal = true
    },
    onRefreshClick () {
      this.$emit('refresh')
    }
  }
}
</script>

<template>
  <div class="card mb-2">
    <div class="card-header d-flex flex-column flex-md-row justify-content-between bg-primary text-white fw-bold">
      <div class="mb-2 mb-md-0">
        <FontAwesomeIcon
          :icon="icons.faTasks"
          fixed-width
        />
        Esteira de Produção
      </div>
      <div class="d-flex justify-content-between justify-content-md-start">
        <AppButton
          v-if="$helpers.canView(roles.GERENCIA)"
          :icon="icons.faTshirt"
          color="light"
          class="me-2"
          btn-class="text-primary btn-sm fw-bold"
          @click="ProductionPanelClick"
        >
          Painel de Produtividade
        </AppButton>
        <AppButton
          :icon="icons.faSyncAlt"
          color="light"
          btn-class="text-primary btn-sm"
          @click="onRefreshClick"
        />
      </div>
    </div>

    <template v-if="$helpers.canView(roles.GERENCIA)">
      <ProductionPanelModal v-model="ProductionPanelModal" />
    </template>
  </div>
</template>
