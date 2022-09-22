<script>
import { faCog } from '@fortawesome/free-solid-svg-icons'
import BankSettingsModalBody from './BankSettingsModalBody.vue'

export default {
  components: {
    BankSettingsModalBody
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      icons: {
        faCog
      }
    }
  }
}
</script>
<template>
  <AppModal
    id="bankSettingsModal"
    :value="value"
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faCog"
        fixed-width
      />
      Configurações armazenadas
    </template>
    <template
      #body
    >
      <BankSettingsModalBody v-if="value" />
      <div class="mt-3 text-end">
        <AppButton
          data-bs-dismiss="modal"
          color="light"
        >
          Fechar
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>
