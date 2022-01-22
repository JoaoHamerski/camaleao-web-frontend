<script>
import { isEmpty } from 'lodash-es'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { formatCurrencyBRL, formatDatetime } from '@/utils/formatters'

import ViewerItemsCardFile from '@/components/AppViewer/ViewerItemsCardFile'

export default {
  chimera: {
    _deleteExpense () {
      return {
        method: 'DELETE',
        url: `api/expenses/${this.expense.id}`,
        on: {
          success () {
            this.$emit('success')
          },
          error  ({ error }) {
            console.log(error)
          }
        }
      }
    }
  },
  components: {
    ViewerItemsCardFile
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    expense: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      icons: {
        faTrashAlt
      },
      isLoading: false
    }
  },
  methods: {
    formatCurrencyBRL,
    formatDatetime,
    isEmpty,
    async destroy () {
      this.isLoading = true

      try {
        await this.$chimera._deleteExpense.fetch()
      } catch (error) {}

      this.isLoading = false
    },
    showReceipt (expense) {
      this.$emit('show-receipt', expense)
    }
  }
}
</script>

<template>
  <AppModal
    id="expenseDeleteModal"
    color="danger"
    :value="value"
    data-bs-focus="false"
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faTrashAlt"
        fixed-width
      />
      Deletar despesa
    </template>

    <template
      v-if="!isEmpty(expense)"
      #body
    >
      <div class="text-center">
        <FontAwesomeIcon
          :icon="icons.faTrashAlt"
          class="text-danger"
          size="4x"
        />

        <h6 class="my-4 fw-bold text-secondary">
          Você está prestes a deletar a seguinte despesa:
        </h6>
      </div>

      <ul class="list-group list-group-flush mb-3">
        <li class="list-group-item">
          <b>Descrição: </b>{{ expense.description }}
        </li>
        <li class="list-group-item">
          <b>Tipo: </b>{{ expense.type.name }}
        </li>
        <li class="list-group-item">
          <b>Via: </b>{{ expense.via.name }}
        </li>
        <li class="list-group-item">
          <b>Valor: </b>{{ formatCurrencyBRL(expense.value) }}
        </li>
        <li class="list-group-item">
          <b>Data: </b>{{ formatDatetime(expense.date) }}
        </li>
        <li class="list-group-item">
          <b :class="expense.receipt_path && 'd-block mb-3'">Comprovante: </b>

          <ViewerItemsCardFile
            v-if="expense.receipt_path"
            clickable
            :file="expense.receipt_path"
            @show-file="showReceipt(expense)"
          />
          <span v-else>N/A</span>
        </li>
      </ul>

      <div class="d-flex gap-2">
        <AppButton
          color="success"
          block
          btn-class="fw-bold"
          :loading="isLoading"
          @click="destroy"
        >
          Confirmar
        </AppButton>
        <AppButton
          data-bs-dismiss="modal"
          block
          color="light"
        >
          Cancelar
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>
