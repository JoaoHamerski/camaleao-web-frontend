<script>
import { vias } from '@/graphql/Via.gql'

import Form from '@/utils/Form'
import { handleSuccess, handleError } from '@/utils/forms'
import { CreateBankSetting } from '@/graphql/BankSetting.gql'

const SYSTEM_FIELDS = [
  { key: 'bank_uid', text: 'Identificador único' },
  { key: 'value', text: 'Valor' },
  { key: 'date', text: 'Data' },
  { key: 'description', text: 'Descrição' },
]

export default {
  apollo: {
    vias: {
      query: vias
    }
  },
  props: {
    fields: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      SYSTEM_FIELDS,
      isLoading: false,
      form: new Form({
        name: '',
        date_format: 'dd/mm/yyyy',
        via_id: '',
        fields: {
          bank_uid: '',
          value: '',
          date: '',
          description: ''
        }
      })
    }
  },
  computed: {
    datesRadioOptions () {
      return [
        { label: 'dd/mm/aaaa', value: 'dd/mm/yyyy' },
        { label: 'mm/dd/aaaa', value: 'mm/dd/yyyy' },
        { label: 'aaaa/dd/mm', value: 'yyyy/dd/dd' },
        { label: 'aaaa/mm/dd', value: 'yyyy/mm/dd' },
      ]
    }
  },
  methods: {
     getHintMessage(key) {
      if (key === 'bank_uid') {
        return 'Identificador da entrada, deve ser único e nunca se repetir.'
      }

      if (key === 'value') {
        return 'Valor monetário da entrada.'
      }

      if (key === 'date') {
        return 'Data que foi dada a entrada (pode ter o horário ao lado).'
      }

      if (key === 'description') {
        return 'Campo usado como descrição da entrada.'
      }
    },
    async onSubmit () {
      const input = {
        ...this.form.data(),
        bank_fields: this.fields
      }

      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: CreateBankSetting,
          variables: { input }
        })

        handleSuccess(this, { message: 'Configuração registrada! Importe o arquivo novamente, por favor.'})
      } catch (error) {
        handleError(this, error)
      }

      this.isLoading = false
    }
  }
}
</script>

<template>
  <AppForm
    :form="form"
    :on-submit="onSubmit"
  >
    <template
      v-for="field in SYSTEM_FIELDS"
    >
      <AppSimpleSelect
        :id="field.key"
        :key="`select-${field.key}`"
        v-model="form.fields[field.key]"
        placeholder="Selecione uma opção do arquivo"
        :name="`fields.${field.key}`"
        :options="fields"
        :error="form.errors.get(`fields.${field.key}`)"
        :optional="field.key === 'description'"
      >
        {{ field.text }}

        <template #hint>
          {{ getHintMessage(field.key) }}
        </template>
      </AppSimpleSelect>
      <template v-if="field.key === 'date'">
        <AppRadio
          id="dateFormat"
          :key="field.key + '-radio'"
          v-model="form.date_format"
          class="small"
          name="dateFormat"
          :options="datesRadioOptions"
          :error="form.errors.get('date_format')"
        >
          Formato da data:
          <template #hint>
            <div>Desconsidere os separadores "/", mesmo que a data use "-".</div>
            <div>Ignore caso tenha a hora ao lado da data.</div>
          </template>
        </AppRadio>
      </template>
    </template>

    <AppSimpleSelect
      id="via_id"
      v-model="form.via_id"
      :options="vias"
      label-prop="name"
      value-prop="id"
      name="via_id"
      :error="form.errors.get('via_id')"
      placeholder="Selecione uma via"
      optional
    >
      Via padrão

      <template #hint>
        Via usada para autocompletar entradas com essa configuração.
      </template>
    </AppSimpleSelect>

    <AppInput
      id="name"
      v-model="form.name"
      name="name"
      placeholder="Digite um nome para a configuração..."
      :error="form.errors.get('name')"
    >
      Nome da configuração
    </AppInput>

    <div class="row mt-4">
      <div class="col">
        <AppButton
          block
          color="success"
          btn-class="fw-bold"
          :loading="isLoading"
        >
          Salvar
        </AppButton>
      </div>
      <div class="col">
        <AppButton
          type="button"
          block
          color="light"
          data-bs-dismiss="modal"
          :disabled="isLoading"
        >
          Fechar
        </AppButton>
      </div>
    </div>
  </AppForm>
</template>
