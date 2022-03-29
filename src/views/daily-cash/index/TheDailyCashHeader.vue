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

    <div class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center">
      <AppButton
        class="fw-bold mb-2 mb-sm-0"
        :block="$isMobile"
        color="success"
        btn-class="btn-lg"
        :icon="icons.faPlus"
        @click="$emit('on-new-entry-click')"
      >
        Nova entrada
      </AppButton>
      <div class="d-flex">
        <AppButton
          color="warning"
          class="flex-grow-1 fw-bold"
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
