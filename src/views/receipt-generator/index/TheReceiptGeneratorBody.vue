<script>
import { faThList, faEye } from '@fortawesome/free-solid-svg-icons'
import { GetReceipts, GetReceiptURL } from '@/graphql/Receipt.gql'

export default {
  apollo: {
    receipts: {
      query: GetReceipts,
      variables () {
        return {
          first: 10,
          page: this.page
        }
      }
    }
  },
  data () {
    return {
      loadingFile: {
        id: '',
      },
      receipts: {
        paginatorInfo: {},
        data: []
      },
      page: 1,
      icons: {
        faThList,
        faEye
      }
    }
  },
  computed: {
    isQueryLoading () {
      return !!this.$apollo.queries.receipts.loading
    },
    headers () {
      return [
        {value: 'client', text: 'Cliente'},
        {value: 'product', text: 'Produto'},
        {value: 'value', text: 'Valor', format: 'currencyBRL'},
        {value: 'date', text: 'Data', format: 'datetime'},
        {value: 'view', text: ''}
      ]
    }
  },
  methods: {
    async onViewReceiptClick ({id}) {
      this.loadingFile.id = id

      try {
        const { data: { receiptUrl } } = await this.$apollo.mutate({
          mutation: GetReceiptURL,
          variables: { id }
        })

        this.$helpers.openInNewTab(receiptUrl);
      } catch (error) {
        this.$toast.error('Ops! Algo deu errado.')
      }

      this.loadingFile.id = ''
    }
  }
}
</script>

<template>
  <div>
    <AppCard>
      <template #header>
        <h6 class="mb-0 fw-bold">
          <FontAwesomeIcon
            :icon="icons.faThList"
            fixed-width
          />
          Recibos gerados
        </h6>
      </template>
      <template #body>
        <AppLoading v-show="isQueryLoading" />
        <div>
          <AppTable
            :headers="headers"
            :items="receipts.data"
          >
            <template #[`items.view`]="{ item }">
              <AppButton
                outlined
                class="btn-sm"
                :icon="icons.faEye"
                :loading="item.id === loadingFile.id"
                @click.prevent="onViewReceiptClick(item)"
              />
            </template>
          </AppTable>
        </div>
      </template>
    </AppCard>
    <div class="mt-2">
      <AppPaginator
        v-model="page"
        :loading="isQueryLoading"
        :pagination="receipts.paginatorInfo"
      />
    </div>
  </div>
</template>
