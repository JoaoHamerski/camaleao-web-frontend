<script>
import { faThList, faExternalLinkAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import { GetReceipts, GetReceiptURL } from '@/graphql/Receipt.gql'

import ReceiptEditModal from '../partials/ReceiptEditModal.vue'

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
  components: {
    ReceiptEditModal
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
      receiptEditModal: {
        receipt: {},
        value: false
      },
      page: 1,
      icons: {
        faThList,
        faExternalLinkAlt,
        faEdit
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
        {value: 'actions', text: '', align: 'rigt'}
      ]
    }
  },
  methods: {
    onEditReceiptClick (receipt) {
      this.receiptEditModal.receipt = receipt
      this.receiptEditModal.value = true
    },
    onEditReceiptSuccess () {
      this.receiptEditModal.value = false
      this.receiptEditModal.receipt = {}
    },
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
        <ReceiptEditModal
          v-model="receiptEditModal.value"
          :receipt="receiptEditModal.receipt"
          @success="onEditReceiptSuccess"
        />

        <div>
          <AppTable
            :headers="headers"
            :items="receipts.data"
          >
            <template #[`items.actions`]="{ item }">
              <div class="text-end">
                <AppButton
                  v-tippy
                  outlined
                  class="me-2"
                  btn-class="btn-sm"
                  :icon="icons.faExternalLinkAlt"
                  :loading="item.id === loadingFile.id"
                  content="Ver recibo"
                  @click.prevent="onViewReceiptClick(item)"
                />
                <AppButton
                  v-tippy
                  outlined
                  :icon="icons.faEdit"
                  btn-class="btn-sm"
                  content="Editar"
                  @click.prevent="onEditReceiptClick(item)"
                />
              </div>
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
