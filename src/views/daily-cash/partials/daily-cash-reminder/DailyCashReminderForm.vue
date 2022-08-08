<script>
import Form from '@/utils/Form'
import { formatDatetime } from '@/utils/formatters'
import { maskCurrencyBRL, maskDate } from '@/utils/masks'
import {
  CreateDailyCashReminder,
  UpdateDailyCashReminder,
  GetDailyCashReminderDates,
  GetDailyCashRemindersInfo
} from '@/graphql/DailyCashReminder.gql'
import { handleSuccess, handleError } from '@/utils/forms'

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    reminder: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      maskCurrencyBRL: maskCurrencyBRL(),
      maskDate,
      isLoading: false,
      form: new Form({
        description: '',
        value: 'R$ ',
        date: '',
        type: 'EXPENSE'
      })
    }
  },
  computed: {
    typesOptions () {
      return [
        {value: 'EXPENSE', label: 'Despesa'},
        {value: 'PAYMENT', label: 'Pagamento'}
      ]
    }
  },
  mounted () {
    if (this.isEdit) {
      this.populateForm()
    }
  },
  methods: {
    populateForm () {
      this.form.description = this.reminder.description
      this.form.value = this.$helpers.toBRL(this.reminder.value)
      this.form.date = formatDatetime(this.reminder.date)
      this.form.type = this.reminder.type.toUpperCase()
    },
    async onUpdate (input) {
      try {
        await this.$apollo.mutate({
          mutation: UpdateDailyCashReminder,
          variables: {
            id: this.reminder.id,
            input
          },
          refetchQueries: [
            GetDailyCashReminderDates,
            GetDailyCashRemindersInfo
          ]
        })

        handleSuccess(this, {message: 'Atualiado com sucesso!'})
      } catch (error) {
        handleError(this, error)
      }
    },
    async onCreate (input) {
      try {
        await this.$apollo.mutate({
          mutation: CreateDailyCashReminder,
          variables: { input },
          refetchQueries: [
            GetDailyCashReminderDates,
            GetDailyCashRemindersInfo
          ],
          awaitRefetchQueries: true
        })

        handleSuccess(this, { message: 'Lembrete registrado!' })
      } catch (error) {
        handleError(this, error)
      }
    },
    async onSubmit () {
      const input = this.form.data()

      this.isLoading = true

      if (this.isEdit) {
        await this.onUpdate (input)
      } else {
        await this.onCreate(input)
      }

      this.isLoading = false
    },
  }
}
</script>
<template>
  <AppForm
    :form="form"
    :on-submit="onSubmit"
  >
    <AppInput
      id="description"
      v-model="form.description"
      name="description"
      placeholder="Digite a descrição..."
      :error="form.errors.get('description')"
    >
      Descrição
    </AppInput>

    <AppInput
      id="value"
      v-model="form.value"
      name="value"
      placeholder="Digite o valor..."
      :mask="maskCurrencyBRL"
      :error="form.errors.get('value')"
    >
      Valor
    </AppInput>
    <AppInput
      id="date"
      v-model="form.date"
      name="date"
      :mask="maskDate"
      placeholder="dd/mm/aaaa"
      type="date"
      numeric
      :error="form.errors.get('date')"
      today-button
    >
      Data
    </AppInput>

    <AppRadio
      id="type"
      v-model="form.type"
      name="type"
      :options="typesOptions"
    >
      Tipo de lembrete
    </AppRadio>

    <div class="row mt-4">
      <div class="col">
        <AppButton
          type="submit"
          btn-class="fw-bold"
          color="success"
          block
          :loading="isLoading"
        >
          {{ isEdit ? 'Atualizar' : 'Confirmar' }}
        </AppButton>
      </div>
      <div class="col">
        <AppButton
          type="button"
          color="light"
          block
          :disabled="isLoading"
          @click.prevent="$emit('dismiss')"
        >
          Cancelar
        </AppButton>
      </div>
    </div>
  </AppForm>
</template>
