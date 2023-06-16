<script>
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import GarmentMatchForm from './GarmentMatchForm.vue';

import { form } from './GarmentMatchForm.vue'

export default {
  components: {
    GarmentMatchForm
  },
  props: {
    match: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    icons: {
      faEdit
    }
  }),
  methods: {
    onSuccess () {
      this.$emit('hide')
    },
    onHide () {
      form.reset()
    }
  }
}
</script>

<template>
  <AppModal
    id="garmentMatchModalEdit"
    v-bind="$attrs"
    color="primary"
    modal-dialog-class="modal-lg"
    v-on="$listeners"
    @hide="onHide"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faEdit"
        fixed-width
      />
      Editar combinação
    </template>
    <template #body>
      <GarmentMatchForm
        v-if="$attrs.value"
        :match="match"
        @success="onSuccess"
      />
    </template>
  </AppModal>
</template>
