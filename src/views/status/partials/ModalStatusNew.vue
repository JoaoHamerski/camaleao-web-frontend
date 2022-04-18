<script>
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default {
  components: {
    StatusForm: () => import('./StatusForm.vue')
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
    id="modalStatusNew"
    color="success"
    :value="value"
    v-bind="$attrs"
    centered
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faPlus"
        fixed-width
      />
      Novo status
    </template>

    <template #body>
      <KeepAlive>
        <StatusForm
          v-if="value"
          @success="onSuccess"
        />
      </KeepAlive>
    </template>
  </AppModal>
</template>
