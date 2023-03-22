<script>
import Form from '@/utils/Form'
import { handleError } from '@/utils/forms'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {
  GetCashFlowEntries,
  GetCashFlowBalance
} from '@/graphql/CashFlow.gql'
import TheCashFlowFilter from './TheCashFlowFilter.vue'
import TheCashFlowBody from './TheCashFlowBody.vue'

const SEARCH_OPTIONS = {
  DESCRIPTION: 'DESCRIPTION',
  VALUE: 'VALUE'
}

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
          where: this.where,
          orderBy: this.orderBy
        }
      },
      result ({ loading }) {
        if (!loading) {
          const { start_date, final_date } = this.filterForm

          this.filterDates = { start_date, final_date }
        }
      },
      error (error) {
        if ('message' in {...error}) {
          handleError(this, error, { formProp: 'filterForm' })
          this.where = {}
        }
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
        showBalance: false
      }),
      filterDates: {},
      balance: {
        isLoading: false,
        value: null
      },
      page: 1,
      search: '',
      searchOption: SEARCH_OPTIONS.DESCRIPTION,
      where: {},
      orderBy: [{column: 'CREATED_AT', order: 'DESC'}],
      icons: {
        faSearch
      }
    }
  },
  computed: {
    isLoading () {
      return !!this.$apollo.queries.cashFlowEntries.loading
    },
    searchOptions () {
      return [
        {
        id: SEARCH_OPTIONS.DESCRIPTION,
        label: 'Descrição'
      },
      {
        id: SEARCH_OPTIONS.VALUE,
        label: 'Valor'
      }]
    }
  },
  methods: {
    async onSearch () {
      const search = this.search

      this.orderBy = [{column: 'DATE', order: 'DESC'}]

      if (this.searchOption === SEARCH_OPTIONS.VALUE) {
        this.where = {
          column: this.searchOption.replace(',', '.'),
          operator: 'EQ',
          value: this.search.replace(',', '.')
        }

        return
      }

      this.where = {
        column: this.searchOption,
        operator: 'LIKE',
        value: `%${search}%`
      }
    },
    onSearchClear () {
      this.search = ''
      this.where = {}
    },
    onFilterClear () {
      this.page = 1
      this.filterForm.reset()
      this.orderBy = [{column: 'CREATED_AT', order: 'DESC'}]
      this.filterDates = {}
      this.where = {}
      this.balance.value = null
    },
    async submitBalance ({ start_date, final_date }) {
      this.balance.isLoading = true

      try {
        const { data: { cashFlowBalance } } = await this.$apollo.query({
          query: GetCashFlowBalance,
          variables: {
            input: {
              start_date, final_date
            }
          }
        })

        this.balance.value = cashFlowBalance
      } catch (error) {
        this.$toast.error('Ops! Algo deu errado.')
      }

      this.balance.isLoading = false
    },
    async onSubmit () {
      const data = this.filterForm.data()
      const { showBalance } = data
      const { start_date, final_date } = data

      if (showBalance) {
        this.submitBalance(data)
      }

      if (start_date && final_date) {
        this.orderBy = [{column: 'DATE', order: 'DESC'}]

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
    },
    onBalanceShowToggle (value) {
      this.filterForm.set({showBalance: value})

      if (!value) {
        this.balance.value = null
      }
    }
  }
}
</script>

<template>
  <div class="py-5">
    <TheCashFlowFilter
      :is-loading="isLoading"
      :form.sync="filterForm"
      :on-submit="onSubmit"
      @clear-filter="onFilterClear"
      @balance-show-toggle="onBalanceShowToggle"
    />

    <div class="mt-2">
      <div class="col col-sm-4 ms-auto">
        <AppInput
          v-model="search"
          name="search"
          placeholder="Digite a busca..."
          :default-margin="false"
          @keypress.prevent.enter="onSearch"
        >
          <template #prepend>
            <AppSimpleSelect
              v-model="searchOption"
              remove-default-margin
              name="search-options"
              :options="searchOptions"
              label-prop="label"
              placeholder="Selecione..."
            />
          </template>
          <template #append>
            <AppButton
              outlined
              :icon="icons.faSearch"
              @click="onSearch"
            />
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
      :show-balance="filterForm.showBalance"
      :page.sync="page"
      :balance="balance"
      :filter-dates="filterDates"
      :data="cashFlowEntries.data"
      :pagination="cashFlowEntries.paginatorInfo"
    />
  </div>
</template>
