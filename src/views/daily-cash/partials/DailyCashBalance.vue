<script>
import {
  faCalendarDay,
  faCalendarWeek,
  faCalendarAlt,
  faBalanceScale,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons'

import { isEmpty } from 'lodash-es'
import { GetDailyCashBalance } from '@/graphql/DailyCash.gql'
import DailyCashBalanceItem from './DailyCashBalanceItem.vue'

export default {
  components: {
    DailyCashBalanceItem
  },
  apollo: {
    dailyCashBalance: {
      query: GetDailyCashBalance
    }
  },
  data () {
    return {
      dailyCashBalance: {},
      icons: {
        faBalanceScale,
        faCalendarDay,
        faCalendarWeek,
        faCalendarAlt,
        faExclamationCircle
      }
    }
  },
  computed: {
    isQueryLoading () {
      return !!this.$apollo.queries.dailyCashBalance.loading
    }
  },
  methods: {
    isEmpty
  }
}
</script>
<template>
  <!-- eslint-disable vue/no-v-html -->
  <AppContainer
    collapsible
    :value="!$isMobile"
  >
    <template #title>
      <FontAwesomeIcon :icon="icons.faBalanceScale" />
      Balanço
    </template>
    <template #body>
      <AppLoading v-show="isQueryLoading" />
      <div
        v-if="!isEmpty(dailyCashBalance)"
        class="d-flex justify-content-center justify-content-sm-around flex-column flex-sm-row"
      >
        <DailyCashBalanceItem :balance="dailyCashBalance.balance_of_day">
          <FontAwesomeIcon
            class="text-primary me-1"
            fixed-width
            :icon="icons.faCalendarDay"
          />
          <span class="text-black-50">DIA</span>
        </DailyCashBalanceItem>

        <DailyCashBalanceItem
          :balance="dailyCashBalance.balance_of_week"
          class="my-3 my-sm-0"
        >
          <FontAwesomeIcon
            class="text-primary me-1"
            fixed-width
            :icon="icons.faCalendarWeek"
          />
          <span class="text-black-50">SEMANA</span>
        </DailyCashBalanceItem>

        <DailyCashBalanceItem :balance="dailyCashBalance.balance_of_month">
          <FontAwesomeIcon
            class="text-primary me-1"
            fixed-width
            :icon="icons.faCalendarAlt"
          />
          <span class="text-black-50">MÊS</span>
        </DailyCashBalanceItem>

        <div class="mt-2 mt-sm-0">
          <div class="fw-bold text-black-50">
            PENDÊNCIA NO MÊS
            <FontAwesomeIcon
              v-tippy
              :icon="icons.faExclamationCircle"
              class="text-primary"
              fixed-width
              content="Total que falta pagar no mês atual do pedidos, baseado na data de estampa cadastrada"
            />
          </div>
          <h4
            class="fw-bold text-success"
            v-html="$helpers.toBRL(dailyCashBalance.pendency.total_owing_on_month)"
          />
          <div class="small">
            <div>
              <span>
                MÊS ATUAL <b>
                  {{
                    $helpers.plural(
                      dailyCashBalance.pendency.total_shirts_on_month,
                      'F',
                      'CAMISA',
                      null,
                      true
                    )
                  }}
                </b>
                <FontAwesomeIcon
                  v-tippy
                  :icon="icons.faExclamationCircle"
                  content="Total de camisas cadastradas"
                  class="text-primary"
                  fixed-width
                />
              </span>
            </div>
            <div>
              <span>MÊS ANTERIOR <b>
                {{
                  $helpers.plural(
                    dailyCashBalance.pendency.total_shirts_last_month,
                    'F',
                    'CAMISA',
                    null,
                    true
                  )
                }}
              </b>
                <b class="text-success">
                  ({{ $helpers.toBRL(dailyCashBalance.pendency.total_owing_last_month) }})
                </b>
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </AppContainer>
</template>
