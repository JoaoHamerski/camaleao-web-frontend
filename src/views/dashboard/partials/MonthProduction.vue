<script>
import { GetDashboardProduction } from '@/graphql/Dashboard.gql'
import { isEmpty } from 'lodash-es';
import {
  faTshirt,
  faCut,
  faTruck,
  faTruckLoading,
  faBoxes,
  faDolly
} from '@fortawesome/free-solid-svg-icons';
import { DateTime } from 'luxon'
import { reverse } from 'lodash-es'

import MonthProductionModal from './MonthProductionModal.vue';
import MonthProductionDataInfo from './MonthProductionDataInfo.vue'
import MonthProductionItemPeriods from './MonthProductionItemPeriods.vue';
import MonthProductionItemData from './MonthProductionItemData.vue'

export default {
  components: {
    MonthProductionDataInfo,
    MonthProductionItemPeriods,
    MonthProductionItemData,
    MonthProductionModal
  },
  apollo: {
    dashboardProduction: {
      query: GetDashboardProduction,
      variables () {
        return {
          production_date: this.production_date
        }
      }
    }
  },
  data: () => ({
    dashboardProduction: {},
    production_date: DateTime.now().toFormat('yyyy-MM'),
    modal: {
      type: '',
      value: false,
      productionDate: '',
      data: {}
    },
    icons: {
      faTshirt,
      faCut,
      faTruck,
      faTruckLoading,
      faBoxes,
      faDolly
    }
  }),
  computed: {
    selectDates () {
      const dates = []
      const startDate = DateTime.now().minus({ months: 12})
      const endDate = DateTime.now()

      for (let date = startDate; date <= endDate; date = date.plus({months: 1})) {
        dates.push({
          value: date.toFormat('yyyy-MM'),
          text: date.toFormat('MM/yy')
        })
      }

      return reverse(dates)
    },
    isLoading () {
      return !!this.$apollo.queries.dashboardProduction.loading
    }
  },
  methods: {
    isEmpty,
    onItemLabelClick (type) {
      if (type === 'MONTH_PRODUCTION') {
        this.modal.productionDate = this.production_date
      }

      this.modal.type = type
      this.modal.value = true
      this.modal.data = this.dashboardProduction[type.toLowerCase()]
    },
    onModalHidden () {
      this.modal.type = ''
      this.modal.data = {}
      this.modal.productionDate = ''
    }
  }
}
</script>

<template>
  <AppContainer>
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faDolly"
        fixed-width
      />
      Produção
    </template>

    <template #body>
      <MonthProductionModal
        v-model="modal.value"
        :type="modal.type"
        :production-date="modal.productionDate"
        :data="modal.data"
        @hidden="onModalHidden"
      />

      <div
        v-show="isLoading"
        class="py-5"
      >
        <AppLoading />
      </div>

      <div
        v-if="!isEmpty(dashboardProduction)"
        class="production-items"
      >
        <div>
          <MonthProductionItemPeriods :item="dashboardProduction.estampados">
            <template #label>
              <span
                class="link-primary clickable ms-1"
                @click.prevent="onItemLabelClick('ESTAMPADOS')"
              >
                <FontAwesomeIcon
                  :icon="icons.faTshirt"
                  fixed-width
                />
                Estampados no dia
              </span>
            </template>
          </MonthProductionItemPeriods>
        </div>

        <div>
          <MonthProductionItemPeriods :item="dashboardProduction.costurados">
            <template #label>
              <span
                class="link-primary clickable ms-1"
                @click.prevent="onItemLabelClick('COSTURADOS')"
              >
                <FontAwesomeIcon
                  :icon="icons.faCut"
                  fixed-width
                />
                Costurados no dia
              </span>
            </template>
          </MonthProductionItemPeriods>
        </div>

        <div>
          <MonthProductionItemData
            :item="dashboardProduction.month_production"
          >
            <template #label>
              <span
                class="link-primary clickable ms-1"
                @click.prevent="onItemLabelClick('MONTH_PRODUCTION')"
              >
                <FontAwesomeIcon
                  :icon="icons.faBoxes"
                  fixed-width
                />
                Produção no mês
              </span>
            </template>
            <template #append>
              <div>
                <AppSimpleSelect
                  v-model="production_date"
                  select-class="form-select-sm"
                  name="production_select"
                  label-prop="text"
                  value-prop="value"
                  :options="selectDates"
                />
              </div>
            </template>
          </MonthProductionItemData>
        </div>

        <div>
          <MonthProductionItemData
            color="danger"
            :item="dashboardProduction.late_orders"
          >
            <template #label>
              <span
                class="link-primary clickable ms-1"
                @click.prevent="onItemLabelClick('LATE_ORDERS')"
              >
                <FontAwesomeIcon
                  :icon="icons.faTruck"
                  fixed-width
                />
                Pedidos atrasados
              </span>
            </template>
          </MonthProductionItemData>
        </div>

        <div>
          <MonthProductionItemData
            :item="dashboardProduction.waiting_for_withdrawal_orders"
          >
            <template #label>
              <span
                class="link-primary clickable ms-1"
                @click.prevent="onItemLabelClick('WAITING_FOR_WITHDRAWAL_ORDERS')"
              >
                <FontAwesomeIcon
                  :icon="icons.faDolly"
                  fixed-width
                />
                Aguardando retirada
              </span>
            </template>
          </MonthProductionItemData>
        </div>
      </div>

      <div class="mt-3">
        <MonthProductionDataInfo />
      </div>
    </template>
  </AppContainer>
</template>

<style scoped lang="scss">
@import "@/sass/_bootstrap-utilities.scss";

.production-items {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}

@include media-breakpoint-down (sm) {
  .production-items {
    grid-template-columns: repeat(1, 1fr);

    div {
      margin-bottom: .5rem;
    }
  }
}
</style>
