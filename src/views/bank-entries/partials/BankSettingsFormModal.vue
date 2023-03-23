<script>
import { random } from 'lodash-es'
import { faCog, faSyncAlt} from '@fortawesome/free-solid-svg-icons'
import BankSettingsForm from './BankSettingsForm.vue'

export default {
  components: {
    BankSettingsForm
  },
  props: {
    samples: {
      type: Array,
      default: () => []
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
        faCog,
        faSyncAlt
      },
      sampleItemIndex: 0,
    }
  },
  computed: {
    sample() {
      return this.samples[this.sampleItemIndex]
    }
  },
  methods: {
    regenerateSampleItemIndex () {
      const sampleItemIndex = random(0, this.samples.length - 1)

      if (sampleItemIndex === this.sampleItemIndex) {
        this.regenerateSampleItemIndex()
        return
      }

      this.sampleItemIndex = sampleItemIndex
    },
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
        v-if="value"
        class="my-2"
        collapsible
        :value="true"
      >
        <template #title>
          Exemplo de dados no arquivo
        </template>
        <template #body>
          <div class="mb-2">
            <span
              class="clickable link-primary small"
              @click.prevent="regenerateSampleItemIndex"
            >
              <FontAwesomeIcon
                :icon="icons.faSyncAlt"
                fixed-width
              />
              Carregar outro exemplo
            </span>
          </div>

          <div
            v-for="(_value, key) in sample"
            :key="key"
            class="small"
          >
            <span class="fw-bold text-primary">{{ key }}</span>: {{ _value }}
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
