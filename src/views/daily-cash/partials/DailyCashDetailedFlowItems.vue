<script>
import { formatDatetime } from '@/utils/formatters'
import { faTshirt, faBox } from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      icons: {
        faTshirt,
        faBox
      }
    }
  },
  methods: {
    formatDatetime,
    onPendencyOfMonthClick (date) {
      this.$emit('open-pendency-orders', date)
    }
  }
}
</script>

<template>
  <AppContainer
    collapsible
    :value="!$isMobile"
  >
    <template #title>
      <span class="text-uppercase small me-2">{{ formatDatetime(item.date, "LLLL 'de' y") }}</span>
    </template>

    <template #body>
      <div class="row row-cols-1 row-cols-sm-4">
        <div class="col mb-2 mb-sm-0">
          <div class="fw-bold">
            CAMISAS PRODUZIDAS
          </div>
          <h1 class="fw-bold">
            {{ item.shirts_quantity }}
          </h1>
        </div>

        <div class="col mb-2 mb-sm-0">
          <div class="fw-bold">
            ENTRADAS
          </div>
          <h2 class="fw-bold text-success mb-0">
            {{ $helpers.toBRL(item.entry.total) }}
          </h2>
          <div class="small">
            <div class="text-nowrap">
              <FontAwesomeIcon
                :icon="icons.faBox"
                fixed-width
              />
              Média <b>por pedido</b>:
              <span class="text-success fw-bold">
                {{ $helpers.toBRL(item.entry.orders_price_avg) }}
              </span>
            </div>
            <div class="text-nowrap">
              <FontAwesomeIcon
                :icon="icons.faTshirt"
                fixed-width
              />
              Média <b>por camisa</b>:
              <span class="text-success fw-bold">
                {{ $helpers.toBRL(item.entry.unities_avg) }}
              </span>
            </div>
          </div>
        </div>

        <div class="col mb-2 mb-sm-0">
          <div class="fw-bold">
            SAÍDAS
          </div>
          <h2 class="fw-bold text-danger mb-0">
            {{ $helpers.toBRL(item.out.total) }}
          </h2>

          <div>
            <div
              v-for="expenseType in item.out.expense_types"
              :key="expenseType.name"
              class="small"
            >
              {{ expenseType.name }}: <b class="text-danger">{{ $helpers.toBRL(expenseType.total) }}</b>
            </div>
          </div>
        </div>

        <div class="col">
          <div
            class="fw-bold link-primary clickable"
            @click.prevent="onPendencyOfMonthClick(item.date)"
          >
            PENDÊNCIA NO MÊS
          </div>
          <h2 class="fw-bold text-danger">
            {{ $helpers.toBRL(item.pendency) }}
          </h2>
        </div>
      </div>
    </template>
  </AppContainer>
</template>
