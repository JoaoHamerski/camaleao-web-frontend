<script>
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import ClientForm from '../partials/ClientForm.vue'

export default {
  components: {
    ClientForm
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
        faUserPlus
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
  <div>
    <AppModal
      id="clientModalNew"
      :value="value"
      color="success"
      centered
      v-on="$listeners"
    >
      <template #title>
        <FontAwesomeIcon
          :icon="icons.faUserPlus"
          class="me-1"
          fixed-width
        />Novo cliente
      </template>
      <template #body>
        <ClientForm
          v-if="value"
          @success="onSuccess"
        />
      </template>
    </AppModal>
  </div>
</template>
