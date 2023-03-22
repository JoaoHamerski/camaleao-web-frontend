<script>
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import DailyCashReminderForm from './DailyCashReminderForm.vue'

export default {

  components: {
    DailyCashReminderForm
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
        faPlus
      }
    }
  },
  methods: {
    onSuccess () {
      this.$emit('success')
    }
  }
}
</script>

<template>
  <AppModal
    id="dailyCashReminderFormModal"
    :value="value"
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faPlus"
        fixed-width
      />
      Agendar nova entrada ou saída
    </template>
    <template #body>
      <DailyCashReminderForm
        v-if="value"
        @success="onSuccess"
        @dismiss="$emit('dismiss')"
      />
    </template>
  </AppModal>
</template>
