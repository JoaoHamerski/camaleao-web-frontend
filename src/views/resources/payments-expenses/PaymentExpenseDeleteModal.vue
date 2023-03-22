<script>
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { formatDatetime } from '@/utils/formatters'
import Form from '@/utils/Form'
import { handleSuccess, handleError } from '@/utils/forms'
import { DeletePayment } from '@/graphql/Payment.gql'
import {
  DeleteExpense,
  GetExpenses,
  GetProductTypeExpensesByMonth,
  GetEmployeeExpensesByMonth
} from '@/graphql/Expense.gql'
import { GetOrder } from '@/graphql/Order.gql'

export default {
  props: {
    entry: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: Boolean,
      default: false
    },
    isExpense: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isLoading: false,
      form: new Form({
        password: ''
      }),
      icons: {
        faTrashAlt
      }
    }
  },
  methods: {
    formatDatetime,
    async deleteExpense ({id, password}) {
      await this.$apollo.mutate({
        mutation: DeleteExpense,
        variables: {
          id, password
        },
        refetchQueries: [
          GetExpenses,
          GetProductTypeExpensesByMonth,
          GetEmployeeExpensesByMonth
        ],
        awaitRefetchQueries: true
      })
    },
    async deletePayment({id, password}) {
      await this.$apollo.mutate({
        mutation: DeletePayment,
        variables: {
          id, password
        },
        refetchQueries: [GetOrder],
        awaitRefetchQueries: true
      })
    },
    async onSubmit () {
      const { id } = this.entry
      const { password } = this.form.data()
      this.isLoading = true

      try {
        if (this.isExpense) {
          await this.deleteExpense({id, password})
          handleSuccess(this, { message: 'Despesa deletada!', resetForm: true })
        } else {
          await this.deletePayment({id, password})
          handleSuccess(this, { message: 'Pagamento deletado!', resetForm: true })
        }

      } catch (error) {
        handleError(this, error)
      }

      this.isLoading = false
    },
    getConfirmationText (confirmation) {
      if (confirmation === true) {
        return 'confirmado'
      }

      if (confirm === false) {
        return 'rejeitado'
      }

      return 'pendente'
    }
  }
}
</script>
<template>
  <AppModal
    id="paymentExpenseDeleteModal"
    :value="value"
    color="danger"
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faTrashAlt"
        fixed-width
      />
      Deletar {{ isExpense ? 'despesa' : 'pagamento' }}
    </template>
    <template #body>
      <div class="text-center my-3">
        <FontAwesomeIcon
          :icon="icons.faTrashAlt"
          size="4x"
          class="text-danger"
        />
      </div>
      <div class="fw-bold text-center">
        INFORMAÇÕES {{ isExpense ? 'DA DESPESA' : 'DO PAGAMENTO' }}
      </div>

      <ul class="list-group list-group-sm list-group-flush">
        <li class="list-group-item">
          <b>Valor:</b> {{ $helpers.toBRL(entry.value) }}
        </li>
        <li
          v-if="entry.sponsorship_client"
          class="list-group-item"
        >
          <b>Patrocinado por: </b>
          <a
            target="_blank"
            class="text-decoration-none"
            :href="$helpers.getUrl('clients.show', {client: entry.sponsorship_client.id})"
          >{{ entry.sponsorship_client.name }}</a>
        </li>
        <li
          v-if="entry.note"
          class="list-group-item"
        >
          <b>Nota:</b> {{ entry.note }}
        </li>
        <li class="list-group-item">
          <b>Data:</b> {{ formatDatetime(entry.date) }}
        </li>
        <li class="list-group-item">
          <b>Cadastro em:</b> {{ formatDatetime(entry.created_at, 'dd/MM/y HH:mm') }}
        </li>
        <li class="list-group-item">
          <b>Confirmação: </b>
          <span
            class="text-uppercase"
            :class="{
              'text-success': entry.is_confirmed === true,
              'text-warning': entry.is_confirmed === null,
              'text-danger': entry.is_confirmed === false
            }"
          >{{ getConfirmationText(entry.is_confirmed) }}</span>
        </li>
      </ul>
      <div
        v-if="entry.is_shipping"
        class="mt-3 small"
      >
        <b>ATENÇÃO: </b> Este pagamento foi registrado como adicional de frete, ao ser deletado o valor também será reduzido do preço do pedido.
      </div>

      <div class="mt-3">
        <AppForm
          :on-submit="onSubmit"
          :form="form"
        >
          <AppInput
            id="password"
            v-model="form.password"
            name="password"
            type="password"
            autocomplete="new-password"
            :error="form.errors.get('password')"
          >
            Confirme sua senha:
          </AppInput>
        </AppForm>
      </div>

      <div class="row mt-3">
        <div class="col">
          <AppButton
            color="success"
            block
            btn-class="fw-bold"
            :loading="isLoading"
            @click.prevent="onSubmit"
          >
            Confirmar
          </AppButton>
        </div>
        <div class="col">
          <AppButton
            color="light"
            block
            data-bs-dismiss="modal"
            :disabled="isLoading"
          >
            Cancelar
          </AppButton>
        </div>
      </div>
    </template>
  </AppModal>
</template>
