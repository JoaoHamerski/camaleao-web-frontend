<script>
import {
  faPlus,
  faSyncAlt
} from '@fortawesome/free-solid-svg-icons'
import { isEmpty } from 'lodash-es'

import PendenciesModal from './partials/PendenciesModal'

export default {
  components: {
    PendenciesModal
  },
  props: {
    pendencies: {
      type: Array,
      default: () => ([])
    },
    activeDate: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      pendenciesModal: false,
      icons: {
        faPlus,
        faSyncAlt
      }
    }
  },
  computed: {
    totalPendencies () {
      if (isEmpty(this.pendencies)) {
        return 0
      }

      return this.pendencies.reduce((total, current) => {
        return total + current.total
      }, 0)
    }
  },
  methods: {
    onPendenciesClick () {
      this.pendenciesModal = true
    },
    onLoadPendenciesFromDate (date) {
      this.pendenciesModal = false
      this.$emit('load-pendencies-from-date', date)
    },
    onResetPaymentsClick () {
      this.$emit('reset-payments')
    }
  }
}
</script>

<template>
  <div>
    <PendenciesModal
      v-model="pendenciesModal"
      :pendencies="pendencies"
      :active-date="activeDate"
      @load-pendencies-from-date="onLoadPendenciesFromDate"
    />

    <div class="d-flex justify-content-between align-items-center">
      <div>
        <AppButton
          color="success"
          btn-class="btn-lg"
          class="fw-bold"
          :icon="icons.faPlus"
          @click="$emit('on-new-entry-click')"
        >
          Nova entrada
        </AppButton>
      </div>
      <div>
        <AppButton
          color="warning"
          class="fw-bold"
          @click="onPendenciesClick"
        >
          Pendências <span class="badge rounded-pill bg-light text-dark">{{ totalPendencies }}</span>
        </AppButton>
        <AppButton
          :icon="icons.faSyncAlt"
          outlined
          class="ms-1"
          @click="onResetPaymentsClick"
        />
      </div>
    </div>
  </div>
</template>
