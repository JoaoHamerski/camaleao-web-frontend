<script>
import { faExclamationCircle, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
export default {
  data: () => ({
    icons: {
      faExclamationCircle,
      faSyncAlt
    }
  })
}
</script>

<template>
  <div class="small text-secondary">
    <FontAwesomeIcon
      :icon="icons.faExclamationCircle"
      fixed-width
    />
    Ao selecionar uma opção, todas opções são atualizadas para refletir as combinações possíveis, clique em <FontAwesomeIcon
      :icon="icons.faSyncAlt"
      fixed-width
    />  para reseta-las
  </div>
</template>
