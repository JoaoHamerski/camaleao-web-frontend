<script>
import { isEmpty } from 'lodash-es'
import CommissionDetails from '@/views/production/partials/CommissionDetails'

export default {
  components: {
    CommissionDetails
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    commission: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    isEmpty
  }
}
</script>
<template>
  <AppModal
    id="commissionModal"
    :value="value"
    modal-dialog-class="modal-fullscreen"
    modal-body-class="px-0 h-100 d-flex align-items-center"
    v-on="$listeners"
  >
    <template #title>
      Comissão
    </template>
    <template #body>
      <CommissionDetails
        v-if="!isEmpty(commission)"
        class="img-thumbnail"
        :commission="commission.commission"
        :role="commission.role"
      />
    </template>
    <template #footer>
      <AppButton
        data-bs-dismiss="modal"
        block
        btn-class="fw-bold"
      >
        Fechar
      </AppButton>
    </template>
  </AppModal>
</template>
