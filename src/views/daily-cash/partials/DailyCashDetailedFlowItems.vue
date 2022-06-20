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
            <div>
              <div>
                <FontAwesomeIcon
                  :icon="icons.faTshirt"
                  fixed-width
                />
                Pedidos com peças:
              </div>
              <div class="ms-4 fw-bold">
                <div class="row gx-0">
                  <div class="col-2">
                    &lt; 5
                  </div>
                  <div class="col-3 text-success">
                    ({{ item.shirts_details.less_than_five.quantity }}):
                  </div>
                  <div class="col text-info">
                    {{ $helpers.toBRL(item.shirts_details.less_than_five.value) }}
                  </div>
                </div>
                <div class="row gx-0">
                  <div class="col-2">
                    5~10
                  </div>
                  <div class="col-3 text-success">
                    ({{ item.shirts_details.between_five_and_ten.quantity }}):
                  </div>
                  <div class="col text-info">
                    {{ $helpers.toBRL(item.shirts_details.between_five_and_ten.value) }}
                  </div>
                </div>

                <div class="row gx-0">
                  <div class="col-2">
                    &gt; 10
                  </div>
                  <div class="col-3 text-success">
                    ({{ item.shirts_details.more_than_ten.quantity }}):
                  </div>
                  <div class="col text-info">
                    {{ $helpers.toBRL(item.shirts_details.more_than_ten.value) }}
                  </div>
                </div>
              </div>
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
