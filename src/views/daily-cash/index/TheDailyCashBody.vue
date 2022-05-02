<script>
import Vue from 'vue'
import VueViewer from 'v-viewer'
import { config as viewerConfig } from '@/components/AppViewer/AppViewer'
import roles from '@/constants/roles'

import PaymentConfirmErrorModal from '@/views/resources/payments/PaymentConfirmErrorModal.vue'
import TheDailyCashBodyTable from './TheDailyCashBodyTable.vue'
import TheDailyCashBodyDate from './TheDailyCashBodyDate.vue'
import DailyCashPaymentVouchersModal from '../partials/DailyCashPaymentVouchersModal.vue'
import DailyCashEditModal from '../partials/DailyCashEditModal.vue'
import ViewerFileModal from '@/components/AppViewer/ViewerFileModal.vue'

Vue.use(VueViewer)

export default {
  components: {
    TheDailyCashBodyTable,
    TheDailyCashBodyDate,
    PaymentConfirmErrorModal,
    DailyCashPaymentVouchersModal,
    DailyCashEditModal,
    ViewerFileModal,
    DailyCashBalance: () => import('../partials/DailyCashBalance.vue'),
  },
  props: {
    entries: {
      type: Array,
      default: () => ([])
    },
    date: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      roles,
      modalError: {
        value: false,
        payment: {}
      },
      modalEdit:  {
        value: false,
        item: null
      },
      modalPaymentVouchers: {
        value: false,
        payment: null
      },
      modalFileViewer: {
        value: false,
        src: ''
      }
    }
  },
  methods: {
    onEntryEdit (item) {
      this.modalEdit.item = item
      this.modalEdit.value = true
    },
    onEntryEditSuccess () {
      this.modalEdit.value = false
      this.modalEdit.item = null
    },
    onEntryModalClose () {
      this.modalEdit.item = null
    },
    onDailyPaymentError (payment) {
      this.modalError.payment = payment
      this.modalError.value = true
    },
    onShowVouchers (item) {
      if (item.is_expense) {
        if (this.$helpers.strContainsAny(item.receipt_path, '.pdf')) {
          this.modalFileViewer.src = item.receipt_path
          this.modalFileViewer.value = true
          return
        }

        this.$viewerApi({
          images: [item.receipt_path],
          options: viewerConfig
        })

        return
      }

      this.modalPaymentVouchers.value = true
      this.modalPaymentVouchers.payment = item
    },
    onViewerFileModalHidden () {
      this.modalFileViewer.src = ''
    }
  }
}
</script>

<template>
  <div>
    <PaymentConfirmErrorModal
      v-model="modalError.value"
      :payment="modalError.payment"
    />

    <DailyCashEditModal
      v-model="modalEdit.value"
      :entry="modalEdit.item"
      @success="onEntryEditSuccess"
      @hidden="onEntryModalClose"
    />

    <DailyCashPaymentVouchersModal
      v-model="modalPaymentVouchers.value"
      :payment="modalPaymentVouchers.payment"
    />

    <ViewerFileModal
      v-model="modalFileViewer.value"
      :src="modalFileViewer.src"
      modal-dialog-class="modal-fullscreen"
      @hidden="onViewerFileModalHidden"
    />

    <DailyCashBalance
      v-if="$helpers.canView(roles.GERENCIA)"
      class="mt-3"
    />

    <TheDailyCashBodyDate :date="date" />

    <hr class="bg-secondary">

    <TheDailyCashBodyTable
      :items="entries"
      @payment-error="onDailyPaymentError"
      @edit="onEntryEdit"
      @show-voucher="onShowVouchers"
    />
  </div>
</template>
