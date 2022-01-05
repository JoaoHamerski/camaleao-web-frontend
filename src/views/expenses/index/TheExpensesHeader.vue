<script>
import { faPlus, faList } from '@fortawesome/free-solid-svg-icons'

import ModalExpensesRegister from './modals/ModalExpensesRegister'
import ModalExpensesTypes from './modals/ModalExpensesTypes'

export default {
  chimera: {
    _expenseTypes () {
      return {
        method: 'GET',
        url: 'api/expense-types/',
        on: {
          success ({ data }) {
            this.expenseTypes = data.data
          }
        }
      }
    }
  },
  components: {
    ModalExpensesRegister,
    ModalExpensesTypes
  },
  data () {
    return {
      icons: {
        faPlus,
        faList
      },
      expenseTypes: [],
      modalExpensesRegister: false,
      modalExpensesTypes: false
    }
  },
  methods: {
    onRegisterExpenseClick () {
      this.modalExpensesRegister = true
    },
    onExpensesTypesClick () {
      this.modalExpensesTypes = true
    },
    refresh () {
      this.$chimera._expenseTypes.reload()
    }
  }
}
</script>

<template>
  <div>
    <ModalExpensesRegister
      v-model="modalExpensesRegister"
      :expense-types="expenseTypes"
    />

    <ModalExpensesTypes
      v-model="modalExpensesTypes"
      :expense-types="expenseTypes"
      @refresh="refresh"
    />

    <div class="d-flex justify-content-between mb-2">
      <AppButton
        :icon="icons.faPlus"
        btn-class="fw-bold"
        @click="onRegisterExpenseClick"
      >
        Cadastrar despesa
      </AppButton>

      <AppButton
        outlined
        :icon="icons.faList"
        @click="onExpensesTypesClick"
      >
        Tipos de despesas
      </AppButton>
    </div>

    <div class="col-4 ms-auto">
      <AppInput
        name="search"
        placeholder="Buscar por descrição"
      >
        <template #append>
          <AppButton outlined>
            Buscar
          </AppButton>
        </template>
      </AppInput>
    </div>
  </div>
</template>
