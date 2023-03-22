<script>
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

import { TippyComponent } from 'vue-tippy'
export default {
  components: {
    Tippy: TippyComponent
  },
  data () {
    return {
      icons: {
        faExclamationCircle
      }
    }
  }
}
</script>
<template>
  <div>
    <Tippy
      theme="no-padding light-border"
      for="activities-legend-icon"
      placement="left"
    >
      <ul class="list-group list-group-sm text-start">
        <li class="list-group-item">
          <b class="text-success">Ícone verde: </b>Atividade de criação
        </li>
        <li class="list-group-item">
          <b class="text-primary">Ícone azul: </b>Atividade de alteração
        </li>
        <li class="list-group-item">
          <b class="text-danger">Ícone vermelho: </b>Atividade de exclusão
        </li>
      </ul>
    </Tippy>
    <FontAwesomeIcon
      name="activities-legend-icon"
      :icon="icons.faExclamationCircle"
    />
  </div>
</template>
