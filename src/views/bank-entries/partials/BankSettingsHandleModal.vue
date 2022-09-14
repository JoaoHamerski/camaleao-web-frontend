<script>
import { faCog } from '@fortawesome/free-solid-svg-icons'
import Form from '@/utils/Form'

const SYSTEM_FIELDS = [
  { key: 'value', text: 'Valor' },
  { key: 'date', text: 'Data' },
  { key: 'description', text: 'Descrição' },
]

export default {
  props: {
    sampleRow: {
      type: Object,
      default: () => ({})
    },
    fields: {
      type: Array,
      default: () => []
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      SYSTEM_FIELDS,
      form: new Form({
        name: '',
        fields: {
          value: '',
          date: '',
          description: ''
        }
      }),
      icons: {
        faCog
      }
    }
  },
  methods: {
    getHintMessage(key) {
      if (key === 'value') {
        return 'Valor monetário da entrada.'
      }

      if (key === 'date') {
        return 'Data que foi dada a entrada.'
      }

      if (key === 'description') {
        return 'Campo usado como descrição da entrada.'
      }
    },
    onSubmit () {
      //
    }
  }
}
</script>

<template>
  <AppModal
    id="bankSettingsHandleModal"
    :value="value"
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faCog"
        fixed-width
      />
      Adicionar configuração de banco
    </template>

    <template #body>
      <AppAlert
        dismissible
        small
        color="warning"
      >
        Não foi possível encontrar uma configuração de banco para o arquivo carregado, adicione uma abaixo.
      </AppAlert>

      <div>
        <div class="text-center text-secondary">
          Por favor, associe os campos encontrados no <b>arquivo carregado</b> com os <b>campos do sistema</b>.
        </div>
      </div>

      <AppContainer
        class="mt-2"
        collapsible
        :value="true"
      >
        <template #title>
          Exemplo de dados no arquivo
        </template>
        <template #body>
          <div
            v-for="(field, key) in sampleRow"
            :key="field"
            class="small"
          >
            <span class="fw-bold text-primary">{{ key }}</span>: {{ field }}
          </div>
        </template>
      </AppContainer>

      <div class="mt-2">
        <AppForm
          v-if="value"
          :form="form"
          :on-submit="onSubmit"
        >
          <template
            v-for="field in SYSTEM_FIELDS"
          >
            <AppSimpleSelect
              :key="field.key"
              v-model="form.fields[field.key]"
              placeholder="Selecione uma opção do arquivo"
              :name="field.key"
              :options="fields"
            >
              {{ field.text }}

              <template #hint>
                {{ getHintMessage(field.key) }}
              </template>
            </AppSimpleSelect>
          </template>

          <AppInput
            id="name"
            v-model="form.name"
            name="name"
            placeholder="Digite um nome para a configuração..."
          >
            Nome da configuração
          </AppInput>

          <div class="row mt-4">
            <div class="col">
              <AppButton
                block
                color="success"
                btn-class="fw-bold"
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
              >
                Fechar
              </AppButton>
            </div>
          </div>
        </AppForm>
      </div>
    </template>
  </AppModal>
</template>
