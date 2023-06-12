<script>
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import GarmentMatchForm from './GarmentMatchForm.vue';

export default {
  components: {
    GarmentMatchForm
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
    id="garmentMatchModalNew"
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
      <GarmentMatchForm v-if="$attrs.value" />
    </template>
  </AppModal>
</template>
