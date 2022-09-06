<script>
import { faTasks } from '@fortawesome/free-solid-svg-icons'

export default {
  data () {
    return {
      icons: {
        faTasks
      }
    }
  }
}
</script>

<template>
  <div class="card mb-2">
    <div class="card-header bg-primary text-white fw-bold">
      <FontAwesomeIcon
        :icon="icons.faTasks"
        fixed-width
      />
      Controle de Pedidos
    </div>
  </div>
</template>
