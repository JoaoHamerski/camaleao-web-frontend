<script>
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
