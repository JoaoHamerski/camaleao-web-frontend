<script>
import { omit } from 'lodash-es'
import Form from '@/utils/Form'
import { handleError } from '@/utils/forms'

import TheCashFlowFilter from './TheCashFlowFilter'
import TheCashFlowBody from './TheCashFlowBody.vue'

export default {
  metaInfo () {
    return {
      title: 'Fluxo de caixa'
    }
  },
  chimera: {
    _entries () {
      return {
        method: 'GET',
        url: 'api/cash-flow',
        params: {
          page: this.page,
          order: true,
          client: true
        },
        on: {
          success ({ data }) {
            console.log(data)
            this.data = data.data
            this.pagination = omit(data.data.entries, 'data')
          },
          error ({ error }) {
            handleError(this, error, { formProp: 'filterForm' })
          }
        }
      }
    }
  },
  components: {
    TheCashFlowFilter,
    TheCashFlowBody
  },
  data () {
    return {
      page: 1,
      data: {},
      pagination: {},
      search: '',
      filterForm: new Form({
        start_date: '',
        end_date: ''
      })
    }
  },
  computed: {
    isLoading () {
      return this.$chimera._entries.loading
    }
  },
  methods: {
    async onSubmit () {
      const data = this.filterForm.data()

      try {
        this.$chimera._entries.fetch(true, {
          params: data
        })
      } catch (error) {}
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
    />

    <div class="mt-2">
      <div class="col-4 ms-auto">
        <AppInput
          v-model="search"
          name="search"
          placeholder="Buscar por descrição..."
        >
          <template #append>
            <AppButton outlined>
              Buscar
            </AppButton>
          </template>
        </AppInput>
      </div>
    </div>

    <TheCashFlowBody
      :is-loading="isLoading"
      :page.sync="page"
      :data="data"
      :pagination="pagination"
    />
  </div>
</template>
