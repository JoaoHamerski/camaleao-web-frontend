<script>
import { faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons'

export default {
  data () {
    return {
      icons: {
        faArrowAltCircleDown
      }
    }
  }
}
</script>

<template>
  <!-- Não inserir "pointer-events-none" no mesmo elemento com eventos de ação do mouse -->
  <div v-on="$listeners">
    <div class="text-center border pointer-events-none p-2">
      <FontAwesomeIcon
        size="3x"
        class="text-primary"
        :icon="icons.faArrowAltCircleDown"
      />
      <div class="text-subtitle text-secondary fw-bold mt-2">
        SOLTE PARA ENVIAR
      </div>
    </div>
  </div>
</template>
