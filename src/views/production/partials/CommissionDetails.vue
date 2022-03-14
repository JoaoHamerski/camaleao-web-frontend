<script>
import roles from '@/constants/roles'

import CommissionDetailsSeam from './CommissionDetailsSeam'
import CommissionDetailsPrint from './CommissionDetailsPrint'

export default {
  components: {
    CommissionDetailsSeam,
    CommissionDetailsPrint
  },
  props: {
    commission: {
      type: Object,
      default: null
    },
    role: {
      type: Object,
      default: null
    }
  },
  computed: {
    isPrintCommission () {
      if (this.role) {
        return +this.role.id === roles.ESTAMPA
      }

      return +this.commission.pivot.role.id === roles.ESTAMPA
    },
    roleName () {
      return this.role
        ? this.role.name
        : this.commission.pivot.role.name
    }
  }
}
</script>

<template>
  <div>
    <div class="bg-success text-white px-3 py-2">
      <h6 class="fw-bold mb-0">
        Detalhes da comissão
      </h6>
      <div class="text-uppercase">
        <small>{{ roleName }}</small>
      </div>
    </div>

    <div class="bg-light">
      <template v-if="isPrintCommission">
        <CommissionDetailsPrint :commission="commission" />
      </template>
      <template v-else>
        <CommissionDetailsSeam :commission="commission" />
      </template>
    </div>
  </div>
</template>
