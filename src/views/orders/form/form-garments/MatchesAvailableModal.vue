<script>
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import { sortBy } from 'lodash-es';

export default {
  props: {
    matches: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    icons: {
      faListUl
    }
  }),
  computed: {
    computedMatches () {
      const matches = this.matches

      return matches.sort((a, b) => {
        if (a.model.name < b.model.name) {
          return -1
        }

        if (a.model.name > b.model.name) {
          return 1
        }

        return 0
      })
    },
    headers () {
      return [
        {value: 'model.name', text: 'Modelo'},
        {value: 'material.name', text: 'Material'},
        {value: 'neck_type.name', text: 'Tipo de gola'},
        {value: 'sleeve_type.name', text: 'Tipo de manga'},
      ]
    }
  }
}
</script>

<template>
  <AppModal
    id="matchesAvailableModal"
    v-bind="$attrs"
    modal-dialog-class="modal-lg"
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faListUl"
        fixed-width
      />
      Combinações disponíveis
    </template>
    <template #body>
      <AppTable
        :items="computedMatches"
        :headers="headers"
      />

      <div class="d-flex justify-content-between align-items-center">
        <div class="small text-secondary fw-bold">
          Se a combinação que você precisa não consta na lista, contate o administrador.
        </div>
        <AppButton
          type="button"
          data-bs-dismiss="modal"
          color="light"
        >
          Fechar
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>
