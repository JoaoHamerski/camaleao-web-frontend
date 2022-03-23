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
      <template v-if="pendencies.length">
        <div class="list-group mb-3">
          <a
            v-for="pendency in pendencies"
            :key="pendency.created_at_payment"
            href="#"
            class="list-group-item list-group-item-action d-flex justify-content-between link-primary"
            :class="{'active text-white': isActiveListItem(pendency.created_at_payment, activeDate)}"
            @click.prevent="onPendencyClick(pendency.created_at_payment)"
          >
            <div class="fw-bold">
              {{ formatDatetime(pendency.created_at_payment) }}
            </div>
            <span
              class="badge bg-primary align-self-center py-2"
              :class="{'bg-light text-primary': isActiveListItem(pendency.created_at_payment, activeDate)}"
            >{{ pendency.total }}</span>
          </a>
        </div>
      </template>
      <div
        v-else
        class="text-center text-secondary my-5"
      >
        Sem pagamentos pendentes
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
