<script>
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { GetBankSettings, DeleteBankSetting } from '@/graphql/BankSetting.gql'

export default {
  apollo: {
    bankSettings: {
      query: GetBankSettings
    }
  },
  data () {
    return {
      isLoading: false,
      icons: {
        faTrashAlt
      },
      bankSettings: []
    }
  },
  computed: {
    headers () {
      return [
        { value: 'name', text: 'Nome' },
        { value: 'settings', text: 'Associação de campos' },
        { value: 'delete', text: ''}
      ]
    }
  },
  methods: {
    getSettings(item) {
      return JSON.parse(item.settings)
    },
    async onDeleteClick (item) {
      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: DeleteBankSetting,
          variables: {
            id: item.id
          },
          refetchQueries: [GetBankSettings],
          awaitRefetchQueries: true,
        })


        this.$toast.success('Configuração deletada!')
      } catch (error) {
        this.$toast.error('Ops! Algo deu errado.')
      }

      this.isLoading = false
    }
  }
}
</script>

<template>
  <div class="position-relative">
    <AppLoading v-show="isLoading" />

    <AppTable
      :headers="headers"
      :items="bankSettings"
    >
      <template #[`items.settings`]="{ item }">
        <ul class="list-group list-group-sm">
          <li
            v-for="(field, key) in getSettings(item).fields"
            :key="key"
            class="list-group-item"
          >
            <b>{{ key }}</b>: {{ field }}
            <template v-if="key === 'date'">
              ({{ getSettings(item).date_format }})
            </template>
          </li>
        </ul>
      </template>

      <template #[`items.delete`]="{ item }">
        <AppButton
          color="danger"
          btn-class="btn-sm"
          outlined
          :icon="icons.faTrashAlt"
          @click.prevent="onDeleteClick(item)"
        />
      </template>
    </AppTable>
  </div>
</template>
