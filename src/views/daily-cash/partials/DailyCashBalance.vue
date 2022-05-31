<script>
import {
  faCalendarDay,
  faCalendarWeek,
  faCalendarAlt,
  faBalanceScale,
  faExclamationCircle,
  faBoxes
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
        faExclamationCircle,
        faBoxes
      }
    }
  },
  computed: {
    isQueryLoading () {
      return !!this.$apollo.queries.dailyCashBalance.loading
    }
  },
  methods: {
    isEmpty,
    onMonthPendencyClick (month) {
      this.$emit('open-pendency-orders', { month })
    }
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
            <span
              class="link-primary clickable me-1"
              @click.prevent="onMonthPendencyClick('current')"
            >PENDÊNCIA NO MÊS</span>
            <FontAwesomeIcon
              v-tippy
              :icon="icons.faExclamationCircle"
              class="text-primary"
              fixed-width
              content="Total que falta pagar no mês atual do pedidos, baseado na data de estampa cadastrada"
            />
          </div>
          <div class="d-flex align-items-baseline">
            <h4
              class="fw-bold text-danger"
              v-html="$helpers.toBRL(dailyCashBalance.pendency.total_owing_on_month)"
            />
            <span class="small fw-bold ms-1">
              ({{
                $helpers.plural(
                  dailyCashBalance.pendency.total_shirts_on_month,
                  'F',
                  'CAMISA',
                  null,
                  true
                )
              }})
            </span>
          </div>
          <div>
            <span>
              <div
                class="fw-bold link-primary clickable small"
                @click="onMonthPendencyClick('last')"
              >MÊS ANTERIOR</div>
              <b class="text-danger">
                {{ $helpers.toBRL(dailyCashBalance.pendency.total_owing_last_month) }}
              </b>
              <span class="small fw-bold">
                ({{
                  $helpers.plural(
                    dailyCashBalance.pendency.total_shirts_last_month,
                    'F',
                    'CAMISA',
                    null,
                    true
                  )
                }})
              </span>
            </span>
          </div>
        </div>
      </div>
    </template>
  </AppContainer>
</template>
