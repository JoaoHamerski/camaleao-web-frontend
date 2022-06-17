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
            {{ item.shirts_total }}
          </h1>
          <div>
            Valor total: <b class="text-info">{{ $helpers.toBRL(item.total_price) }}</b>
          </div>
          <div class="small">
            <div class="text-nowrap">
              <FontAwesomeIcon
                :icon="icons.faBox"
                fixed-width
              />
              Média <b>por pedido</b>:
              <span class="text-info fw-bold">
                {{ $helpers.toBRL(item.entry.orders_price_avg) }}
              </span>
            </div>
            <div class="text-nowrap">
              <FontAwesomeIcon
                :icon="icons.faTshirt"
                fixed-width
              />
              Média <b>por camisa</b>:
              <span class="text-info fw-bold">
                {{ $helpers.toBRL(item.entry.unities_avg) }}
              </span>
            </div>
            <div class="text-nowrap">
              <FontAwesomeIcon
                :icon="icons.faTshirt"
                fixed-width
              />
              Pedidos com:
              <b>-5 <span class="text-info">({{ item.shirts_quantity.less_than_five }})</span></b>
              |
              <b>5-10 <span class="text-info"> ({{ item.shirts_quantity.between_five_and_ten }})</span></b>
              |
              <b>+10 <span class="text-info">({{ item.shirts_quantity.more_than_ten }})</span></b>
            </div>
          </div>
        </div>

        <div class="col mb-2 mb-sm-0">
          <div class="fw-bold">
            ENTRADAS
          </div>
          <h2 class="fw-bold text-success mb-0">
            {{ $helpers.toBRL(item.entry.total) }}
          </h2>
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
