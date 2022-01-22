<script>
import roles from '@/constants/roles'
import { faPlus, faList } from '@fortawesome/free-solid-svg-icons'

import ModalExpensesRegister from './modals/ModalExpensesRegister'

export default {
  components: {
    ModalExpensesRegister,
    ModalExpensesTypes: () => import('./modals/ModalExpensesTypes')
  },
  props: {
    expenses: {
      type: Array,
      default: () => ([])
    },
    vias: {
      type: Array,
      default: () => ([])
    },
    expenseTypes: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      roles,
      icons: {
        faPlus,
        faList
      },
      search: '',
      modalExpensesRegister: false,
      modalExpensesTypes: false
    }
  },
  computed: {
    authUser () {
      return this.$store.getters['auth/authUser']
    }
  },
  methods: {
    onSearchClick () {
      this.$emit('search', this.search)
    },
    onSearchClear () {
      this.search = ''
      this.$emit('search', '')
    },
    onRegisterExpenseClick () {
      this.modalExpensesRegister = true
    },
    onExpensesTypesClick () {
      this.modalExpensesTypes = true
    },
    onExpenseRegisterSuccess () {
      this.modalExpensesRegister = false
      this.$toast.success('Despesa registrada com sucesso!')
      this.$emit('refresh-expenses')
    },
    onExpenseTypeRegisterSuccess ({ action }) {
      if (action === 'update') {
        this.$emit('refresh-all')
        return
      }

      this.$emit('refresh-expense-types')
    }
  }
}
</script>

<template>
  <div>
    <ModalExpensesRegister
      v-model="modalExpensesRegister"
      :expense-types="expenseTypes"
      :vias="vias"
      @success="onExpenseRegisterSuccess"
    />

    <ModalExpensesTypes
      v-if="authUser.role.id === roles.GERENCIA"
      v-model="modalExpensesTypes"
      :expense-types="expenseTypes"
      @success="onExpenseTypeRegisterSuccess"
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
        v-if="authUser.role.id === roles.GERENCIA"
        outlined
        :icon="icons.faList"
        @click="onExpensesTypesClick"
      >
        Tipos de despesas
      </AppButton>
    </div>

    <div class="col-4 ms-auto">
      <AppInput
        v-model="search"
        name="search"
        placeholder="Buscar por descrição"
        :default-margin="false"
        @keypress.enter="onSearchClick"
      >
        <template #append>
          <AppButton
            outlined
            @click="onSearchClick"
          >
            Buscar
          </AppButton>
        </template>
      </AppInput>
      <div class="text-end small py-1">
        <span
          v-if="search"
          class="clickable link-primary"
          @click="onSearchClear"
        >Limpar busca</span>&nbsp;
      </div>
    </div>
  </div>
</template>
