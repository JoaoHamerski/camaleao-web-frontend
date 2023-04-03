<script>
import {
  faEye,
  faEyeSlash,
  faSyncAlt,
  faTrashAlt,
  faUpload
} from '@fortawesome/free-solid-svg-icons'
import { formatCurrencyBRL } from '@/utils/formatters'
import { GetDuplicatedEntries } from '@/graphql/OrderControl.gql'


export default {
  props: {
    entry: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isLoading: false,
      uploadEntryModal: {
        value: false,
        entry: {}
      },
      icons: {
        faEye,
        faEyeSlash,
        faSyncAlt,
        faTrashAlt,
        faUpload
      }
    }
  },
  computed: {
    hasDuplicates () {
      return this.entry.data.some(item => item.isDuplicated)
    },
    headers () {
      return [
        { value: 'action', text: '' },
        { value: 'value', text: 'Valor', format: 'currencyBRL'},
        { value: 'date', text: 'Data' },
        { value: 'description', text: 'Descrição', wrap: true}
      ]
    },
    fields () {
      return this.entry.settings.fields
    }
  },
  methods: {
    formatCurrencyBRL,
    onRemoveDuplicatesClick () {
      this.$emit('remove-duplicates')
    },
    async onCheckDuplicatesClick () {
      const bank_uids = this.entry.data.map(item => item.bank_uid)
      this.isLoading = true

      try {
        const {
          data: {
            bankCheckDuplicatedEntries: duplicates
          }
        } = await this.$apollo.mutate({
          mutation: GetDuplicatedEntries,
          variables: {
            bank_uids
          }
        })

        const duplicatesCount = duplicates.length

        if (duplicatesCount) {
          this.$toast.info(`Foi encontrado ${duplicatesCount} ${duplicatesCount > 1 ? 'itens duplicados' : 'item duplicado'}`)
        } else {
          this.$toast.info('Nenhum item duplicado encontrado')
        }

        this.$emit('duplicated-entries', duplicates)
      } catch (error) {
        this.$toast.error('Ops! Algo deu errado.')
      }

      this.isLoading = false
    },
    tableRowClass(item) {
      return 'table-' + this.getItemColor(item)
    },
    getItemColor(item) {
      if (item.isDuplicated || !item.isVisible) {
        return 'secondary'
      }

      return item.value > 0 ? 'success' : 'danger'
    },
    toggleVisibility(item) {
      item.isVisible = !item.isVisible
    }
  }
}
</script>

<template>
  <div>
    <div class="my-2">
      <AppButton
        color="success"
        btn-class="fw-bold"
        :icon="icons.faSyncAlt"
        :loading="isLoading"
        @click.prevent="onCheckDuplicatesClick"
      >
        Verificar duplicatas
      </AppButton>
      <AppButton
        v-show="hasDuplicates"
        class="ms-2"
        color="danger"
        btn-class="fw-bold"
        outlined
        :icon="icons.faTrashAlt"
        @click.prevent="onRemoveDuplicatesClick"
      >
        Remover duplicatas
      </AppButton>
    </div>
    <div class="small text-secondary">
      Ao esconder uma entrada, ela não será exibida quando o arquivo for carregado na página de entradas.
    </div>
    <AppTable
      :headers="headers"
      :items="entry.data"
      :row-class="(item) => tableRowClass(item)"
    >
      <template #[`items.action`]="{ item }">
        <AppButton
          v-tippy
          btn-class="btn-sm"
          outlined
          :content="item.isVisible ? 'Esconder entrada' : 'Exibir entrada'"
          :icon="item.isVisible ? icons.faEye : icons.faEyeSlash"
          @click.prevent="toggleVisibility(item)"
        />
      </template>
      <template #[`items.value`]="{ item }">
        <span
          class="fw-bold"
          :class="`text-${getItemColor(item)}`"
        >
          {{ formatCurrencyBRL(item.value) }}
        </span>
      </template>
    </AppTable>
  </div>
</template>
