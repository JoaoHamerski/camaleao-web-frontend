<script>
import { formatDatetime } from '@/utils/formatters'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    pendencies: {
      type: Array,
      default: () => ([])
    },
    activeDate: {
      type: String,
      required: true
    }
  },
  methods: {
    formatDatetime,
    isActiveListItem (pendencyDate, activeDate) {
      return formatDatetime(pendencyDate) === activeDate
    },
    onPendencyClick (date) {
      this.$emit('load-pendencies-from-date', date)
    }
  }
}
</script>

<template>
  <AppModal
    id="pendenciesModal"
    :value="value"
    centered
    color="warning"
    v-on="$listeners"
  >
    <template #title>
      Pagamentos pendentes
    </template>
    <template #body>
      <div class="list-group mb-3">
        <a
          v-for="pendency in pendencies"
          :key="pendency.payment_date"
          href="#"
          class="list-group-item list-group-item-action d-flex justify-content-between link-primary"
          :class="{'active text-white': isActiveListItem(pendency.payment_date, activeDate)}"
          @click.prevent="onPendencyClick(pendency.payment_date)"
        >
          <div class="fw-bold">
            {{ formatDatetime(pendency.payment_date) }}
          </div>
          <span
            class="badge bg-primary align-self-center py-2"
            :class="{'bg-light text-primary': isActiveListItem(pendency.payment_date, activeDate)}"
          >{{ pendency.total }}</span>
        </a>
      </div>

      <div class="d-flex justify-content-end">
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
