<script>
import { faCog } from '@fortawesome/free-solid-svg-icons'
import BankSettingsForm from './BankSettingsForm.vue'

export default {
  components: {
    BankSettingsForm
  },
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
      icons: {
        faCog
      }
    }
  },
  methods: {
    onSuccess () {
      this.$emit('success')
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
        class="my-2"
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

      <BankSettingsForm
        v-if="value"
        :fields="fields"
        @success="onSuccess"
      />
    </template>
  </AppModal>
</template>
