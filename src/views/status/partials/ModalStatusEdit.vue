<script>
import { faEdit } from '@fortawesome/free-solid-svg-icons'

export default {
  components: {
    StatusForm: () => import('./StatusForm.vue')
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    status: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      icons: {
        faEdit
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
    id="modalStatusEdit"
    centered
    :value="value"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faEdit"
        fixed-width
      />
      Editar status
    </template>
    <template #body>
      <StatusForm
        v-if="value"
        :is-edit="true"
        :status="status"
        @success="onSuccess"
      />
    </template>
  </AppModal>
</template>
