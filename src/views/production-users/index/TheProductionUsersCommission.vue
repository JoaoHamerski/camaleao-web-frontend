<script>
import roles from '@/constants/roles'
import { isEmpty } from 'lodash-es'
import { commissionRoleByMonth } from '@/graphql/Production.gql'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { maskMonth } from '@/utils/masks'
import { handleError } from '@/utils/forms'
import Form from '@/utils/Form'

export default {
  data () {
    return {
      roles,
      maskMonth,
      isLoading: false,
      commissionByMonth: {},
      form: new Form({
        role_id: '',
        month: ''
      }),
      icons: {
        faCalendarAlt
      }
    }
  },
  computed: {
    radioProductionOptions () {
      return [
        { id: roles.COSTURA, text: 'Costura' },
        { id: roles.ESTAMPA, text: 'Estampa' }
      ]
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
    collapsible
    color="success"
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
      <div
        v-if="!isEmpty(commissionByMonth)"
      >
        <div class="text-center">
          Comissão do mês
          <span class="fw-bold">
            {{ commissionByMonth.month }}/{{ commissionByMonth.year }}
          </span>
          para
          <span class="fw-bold">{{ commissionByMonth.role.name }}</span>
        </div>
        <h5 class="text-success text-center fw-bold">
          {{ $helpers.toBRL(commissionByMonth.value) }}
        </h5>
      </div>

      <hr v-show="!isEmpty(commissionByMonth)">

      <h6 class="text-center fw-bold">
        Selecione o mês para calcular a comissão
      </h6>

      <AppForm
        :form="form"
        :on-submit="onSubmit"
      >
        <AppRadio
          v-model="form.role_id"
          name="role_id"
          :options="radioProductionOptions"
          label-prop="text"
          value-prop="id"
          :error="form.errors.get('role_id')"
        >
          Tipo de usuário:
        </AppRadio>

        <AppInput
          id="month"
          v-model="form.month"
          type="month"
          name="month"
          :mask="maskMonth"
          placeholder="mm/aaaa"
          :error="form.errors.get('month')"
        >
          Mês para calcular:
          <template #hint>
            O calculo é feito baseado na data em que as comissões foram confirmadas.
          </template>
        </AppInput>

        <div class="d-flex">
          <AppButton
            btn-class="fw-bold"
            :loading="isLoading"
          >
            Calcular
          </AppButton>
          <AppButton
            type="button"
            class="ms-2"
            color="light"
            @click.prevent="onClearClick"
          >
            Limpar
          </AppButton>
        </div>
      </AppForm>
    </template>
  </AppCard>
</template>
