<script>
import Form from '@/utils/Form'
import { handleError } from '@/utils/forms'
import { GetCashFlowEntries, GetCashFlowStatistics } from '@/graphql/CashFlow.gql'

import TheCashFlowFilter from './TheCashFlowFilter'
import TheCashFlowBody from './TheCashFlowBody.vue'

export default {
  metaInfo () {
    return {
      title: 'Fluxo de caixa'
    }
  },
  components: {
    TheCashFlowFilter,
    TheCashFlowBody
  },
  apollo: {
    cashFlowEntries: {
      query: GetCashFlowEntries,
      variables () {
        return {
          page: this.page,
          first: 10,
          where: this.where
        }
      },
      result ({ loading }) {
        if (!loading) {
          const { start_date, final_date } = this.filterForm

          this.filterDates = { start_date, final_date }
        }
      },
      error (error) {
        handleError(this, error, { formProp: 'filterForm' })
        this.where = {}
      }
    }
  },
  data () {
    return {
      cashFlowEntries: {
        data: [],
        paginatorInfo: {}
      },
      filterForm: new Form({
        start_date: '',
        final_date: '',
        showStatistics: false,
        showBalance: false
      }),
      filterDates: {},
      statistics: {},
      page: 1,
      search: '',
      where: {}
    }
  },
  computed: {
    isLoading () {
      return !!this.$apollo.queries.cashFlowEntries.loading
    }
  },
  methods: {
    async onSearch () {
      const search = this.search

      this.where = {
        column: 'DESCRIPTION',
        operator: 'LIKE',
        value: `%${search}%`
      }
    },
    onSearchClear () {
      this.search = ''
      this.where = {}
    },
    onFilterClear () {
      this.filterForm.reset()
      this.filterDates = {}
      this.where = {}
    },
    async submitStatistics ({ start_date, final_date }) {
      try {
        const { data } = await this.$apollo.query({
          query: GetCashFlowStatistics,
          variables: {
            input: {
              start_date, final_date
            }
          }
        })

        this.statistics = data.cashFlowStatistics
      } catch (error) {}
    },
    async onSubmit () {
      const data = this.filterForm.data()
      const { showStatistics, showBalance } = data
      const { start_date, final_date } = data

      if (showStatistics || showBalance) {
        this.submitStatistics(data)
      }

      if (start_date && final_date) {
        this.where = {
          column: 'DATE',
          operator: 'BETWEEN',
          value: [start_date, final_date]
        }

        return
      }

      this.where = {
        column: 'DATE',
        operator: 'EQ',
        value: start_date
      }
    }
  }
}
</script>

<template>
  <div class="mt-5">
    <TheCashFlowFilter
      :is-loading="isLoading"
      :form="filterForm"
      :on-submit="onSubmit"
      @clear-filter="onFilterClear"
    />

    <div class="mt-2">
      <div class="col-4 ms-auto">
        <AppInput
          v-model="search"
          name="search"
          placeholder="Buscar por descrição..."
          :default-margin="false"
          @keypress.prevent.enter="onSearch"
        >
          <template #append>
            <AppButton
              outlined
              @click="onSearch"
            >
              Buscar
            </AppButton>
          </template>
        </AppInput>
        <div
          v-if="search !== ''"
          class="small link-primary clickable text-end"
          @click="onSearchClear"
        >
          Limpar busca
        </div>
      </div>
    </div>

    <TheCashFlowBody
      :is-loading="isLoading"
      :show-statistics="filterForm.showStatistics"
      :show-balance="filterForm.showBalance"
      :page.sync="page"
      :statistics="statistics"
      :filter-dates="filterDates"
      :data="cashFlowEntries.data"
      :pagination="cashFlowEntries.paginatorInfo"
    />
  </div>
</template>
