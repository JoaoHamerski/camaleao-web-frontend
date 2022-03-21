<script>
import { isEmpty } from 'lodash'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { commissionRoleByMonth } from '@/graphql/Production.gql'
import Form from '@/utils/Form'
import { handleError } from '@/utils/forms'
import { maskMonth } from '@/utils/masks'

export default {
  data () {
    return {
      isLoading: false,
      commissionByMonth: {},
      maskMonth,
      form: new Form({
        month: ''
      }),
      icons: {
        faCalendarAlt
      }
    }
  },
  methods: {
    isEmpty,
    onClearClick () {
      this.form.reset()
      this.commissionByMonth = {}
    },
    async onSubmit () {
      const input = this.form.data()

      this.isLoading = true

      try {
        const { data } = await this.$apollo.query({
          query: commissionRoleByMonth,
          variables: {
            ...input
          }
        })

        this.commissionByMonth = data.commissionRoleByMonth
      } catch (error) {
        handleError(this, error)
      }

      this.isLoading = false
    }
  }
}
</script>

<template>
  <AppCard
    id="productionCommissionCard"
    color="success"
    collapsible
  >
    <template #header>
      <h6 class="fw-bold mb-0">
        <FontAwesomeIcon
          :icon="icons.faCalendarAlt"
          fixed-width
        />
        Comissão mensal
      </h6>
    </template>
    <template #body>
      <div v-if="!isEmpty(commissionByMonth)">
        <div class="text-center">
          Comissão em <b>{{ commissionByMonth.month }}/{{ commissionByMonth.year }}</b>
        </div>

        <h5 class="text-success text-center fw-bold">
          {{ $helpers.toBRL(commissionByMonth.value) }}
        </h5>
      </div>

      <hr v-show="!isEmpty(commissionByMonth)">

      <h6 class="text-center fw-bold">
        Selecione um mês para calcular a comissão
      </h6>
      <div>
        <AppForm
          :form="form"
          :on-submit="onSubmit"
        >
          <AppInput
            id="month"
            v-model="form.month"
            type="month"
            name="month"
            placeholder="mm/aaaa"
            :mask="maskMonth"
            :error="form.errors.get('month')"
          >
            Mês para calcular
          </AppInput>
          <div class="d-flex">
            <AppButton
              color="success"
              btn-class="fw-bold"
              :loading="isLoading"
            >
              Calcular
            </AppButton>
            <AppButton
              type="button"
              color="light"
              class="ms-2"
              @click.prevent="onClearClick"
            >
              Limpar
            </AppButton>
          </div>
        </AppForm>
      </div>
    </template>
  </AppCard>
</template>
