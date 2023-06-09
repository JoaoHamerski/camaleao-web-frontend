<script>
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ClothMatchForm from './ClothMatchForm.vue';

export default {
  components: {
    ClothMatchForm
  },
  data: () => ({
    icons: {
      faPlus
    }
  })
}
</script>

<template>
  <AppModal
    id="clothMatchModalNew"
    v-bind="$attrs"
    color="success"
    modal-dialog-class="modal-lg"
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faPlus"
        fixed-width
      />
      Nova combinação
    </template>
    <template #body>
      <ClothMatchForm v-if="$attrs.value" />
    </template>
  </AppModal>
</template>
