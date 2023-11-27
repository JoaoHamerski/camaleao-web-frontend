<script>
import ClientBonusesModalTable from './ClientBonusesModalTable.vue';
import { GetBonusesFromClient } from '@/graphql/Bonus.gql'

export default {
  apollo: {
    bonusesFromClient: {
      query: GetBonusesFromClient,
      variables () {
        return {
          first: 10,
          page: this.page,
          id: this.client.id
        }
      },
      skip () {
        return !this.value
      }
    }
  },
  components: {
    ClientBonusesModalTable
  },
  props: {
    client: {
      type: Object,
      required: true
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    page: 1,
    bonusesFromClient: {
      paginatorInfo: {},
      data: []
    }
  })
}
</script>

<template>
  <AppModal
    v-bind="$attrs"
    id="clientBonusesModal"
    :value="value"
    modal-dialog-class="modal-dialog-centered"
    v-on="$listeners"
  >
    <template #title>
      Histórico de bônus
    </template>
    <template
      v-if="value"
      #body
    >
      <ClientBonusesModalTable :items="bonusesFromClient.data" />
      <AppPaginator
        v-model="page"
        :pagination="bonusesFromClient.paginatorInfo"
      />
      <div class="text-end">
        <AppButton
          color="light"
          data-bs-dismiss="modal"
        >
          Fechar
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>
