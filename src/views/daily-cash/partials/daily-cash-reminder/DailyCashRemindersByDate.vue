<script>
import {
  GetDailyCashReminders,
  DeleteDailyCashReminder,
  GetDailyCashReminderDates
} from '@/graphql/DailyCashReminder.gql'
import {
  faArrowAltCircleLeft,
  faFunnelDollar,
  faHandHoldingUsd,
  faEdit,
  faTrashAlt,
  faCheck
} from '@fortawesome/free-solid-svg-icons'

import DailyCashReminderForm from './DailyCashReminderForm.vue'

export default {
  components: {
    DailyCashReminderForm
  },
  apollo: {
    dailyCashReminders: {
      query: GetDailyCashReminders,
      variables() {
        return {
          first: 1000,
          date: this.date
        }
      }
    }
  },
  props: {
    date: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      dailyCashReminders: [],
      icons: {
        faArrowAltCircleLeft,
        faFunnelDollar,
        faHandHoldingUsd,
        faEdit,
        faTrashAlt,
        faCheck
      },
      isEdit: {
        value: false,
        item: {}
      },
      isDelete: {
        value: true,
        item: {},
        loading: false,
      }
    }
  },
  computed: {
    isQueryLoading () {
      return !!this.$apollo.queries.dailyCashReminders.loading
    },
    headers () {
      return [
        { text: '', value: 'type', align: 'center' },
        { text: 'Descrição', value: 'description', wrap: true },
        { text: 'Valor', value: 'value', format: 'currencyBRL' },
        { text: 'Data', value: 'date', format: 'datetime' },
        { text: 'Ações', value: 'actions', align: 'center' }
      ]
    }
  },
  methods: {
    onBackClick () {
      if (this.isEdit.value) {
        this.onDismissEdit()
        return
      }

      this.$emit('close')
    },
    onEditClick(reminder) {
      this.isEdit.value = true
      this.isEdit.item = reminder
    },
    onEditSuccess () {
      this.onDismissEdit()
    },
    onDeleteClick (reminder) {
      this.isDelete.value = true
      this.isDelete.item = reminder
    },
    onCancelDelete () {
      this.isDelete.value = false
      this.isDelete.item = {}
    },
    async onDeleteReminder (reminder) {
      this.isDelete.loading = true

      try {
        await this.$apollo.mutate({
          mutation: DeleteDailyCashReminder,
          variables: {
            id: reminder.id
          },
          refetchQueries: [GetDailyCashReminderDates]
        })

        this.$helpers.clearCacheFrom({id: reminder.id, __typename: 'DailyCashReminder'})
        this.$toast.success('Deletado com sucesso!')
      } catch (error) {
        this.$toast.error('Ops! Algo deu errado.')
      }

      this.isDelete.loading = false
    },
    onDismissEdit () {
      this.isEdit.value = false
      this.isEdit.item = {}
    },
    rowClass(reminder) {
      if (reminder.type === 'expense') {
        return 'table-danger align-middle'
      }

      return 'table-success align-middle'
    },
    getItemColor (reminder) {
      if (reminder.type === 'expense') {
        return 'danger'
      }

      return 'success'
    },
    getItemIcon (reminder) {
      if (reminder.type === 'expense') {
        return faFunnelDollar
      }

      return faHandHoldingUsd
    }
  },
}
</script>
<template>
  <div class="position-relative">
    <AppLoading v-show="isQueryLoading" />
    <div class="mb-3">
      <AppButton
        :icon="icons.faArrowAltCircleLeft"
        outlined
        @click.prevent="onBackClick"
      >
        Voltar
      </AppButton>
    </div>
    <AppTransition
      speed="faster"
      enter="fadeIn"
      mode="out-in"
    >
      <AppTable
        v-if="!isEdit.value"
        :items="dailyCashReminders"
        :headers="headers"
        :row-class="rowClass"
      >
        <template #[`items.type`]="{ item }">
          <FontAwesomeIcon
            :icon="getItemIcon(item)"
            :class="`text-${getItemColor(item)}`"
          />
        </template>
        <template #[`items.actions`]="{ item }">
          <div v-if="isDelete.item !== item">
            <!-- <AppButton
              color="success"
              outlined
              tooltip="Registrar"
              :icon="icons.faCheck"
              btn-class="btn-sm"
            /> -->
            <AppButton
              outlined
              :icon="icons.faEdit"
              class="mx-2"
              btn-class="btn-sm"
              tooltip="Editar"
              @click.prevent="onEditClick(item)"
            />
            <AppButton
              color="danger"
              outlined
              :icon="icons.faTrashAlt"
              btn-class="btn-sm"
              tooltip="Excluir"
              @click.prevent="onDeleteClick(item)"
            />
          </div>
          <div v-else>
            <AppButton
              color="success"
              class="me-2"
              btn-class="btn-sm"
              :loading="isDelete.loading"
              @click="onDeleteReminder(item)"
            >
              Confirmar
            </AppButton>
            <AppButton
              :disabled="isDelete.loading"
              color="light"
              btn-class="btn-sm"
              @click.prevent="onCancelDelete"
            >
              Cancelar
            </AppButton>
          </div>
        </template>
      </AppTable>
      <DailyCashReminderForm
        v-else
        is-edit
        :reminder="isEdit.item"
        @success="onEditSuccess"
        @dismiss="onDismissEdit"
      />
    </AppTransition>
  </div>
</template>
