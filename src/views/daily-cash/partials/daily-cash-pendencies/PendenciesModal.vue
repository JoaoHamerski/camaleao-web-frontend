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
    scrollable
    v-on="$listeners"
  >
    <template #title>
      <span class="text-dark">Entradas e saídas pendentes</span>
    </template>
    <template #body>
      <template v-if="pendencies.length">
        <div class="list-group mb-3">
          <a
            v-for="pendency in pendencies"
            :key="pendency.created_at_entry"
            href="#"
            class="list-group-item list-group-item-action d-flex justify-content-between link-primary"
            :class="{'active text-white': isActiveListItem(pendency.created_at_entry, activeDate)}"
            @click.prevent="onPendencyClick(pendency.created_at_entry)"
          >
            <div class="fw-bold">
              {{ formatDatetime(pendency.created_at_entry) }}
            </div>
            <span
              class="badge bg-primary align-self-center py-2"
              :class="{'bg-light text-primary': isActiveListItem(pendency.created_at_entry, activeDate)}"
            >{{ pendency.total }}</span>
          </a>
        </div>
      </template>
      <div
        v-else
        class="text-center text-secondary my-5"
      >
        Sem pendencias
      </div>
    </template>
    <template #footer>
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
