<script>
import { faFunnelDollar } from '@fortawesome/free-solid-svg-icons'
import { formatDatetime } from '@/utils/formatters'
import EntryDetailsHeader from './EntryDetailsHeader'

export default {
  components: {
    EntryDetailsHeader
  },
  props: {
    expense: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      icons: {
        faFunnelDollar
      }
    }
  },
  methods: {
    formatDatetime
  }
}
</script>

<template>
  <div>
    <EntryDetailsHeader
      :value="-expense.value"
      color="danger"
      :icon="icons.faFunnelDollar"
      :date="expense.date"
      date-tooltip="Data da despesa"
    />

    <hr>

    <small class="d-block text-center text-secondary">
      {{ expense.description }}
    </small>

    <div class="mb-2">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <b>Tipo: </b> {{ expense.type.name }}
        </li>
        <li class="list-group-item">
          <b>Via: </b> {{ expense.via.name }}
        </li>
        <li class="list-group-item">
          <b>Cadastrada por: </b> {{ expense.user.name }}
        </li>
        <li class="list-group-item">
          <b>Registado em: </b> {{ formatDatetime(expense.created_at, "dd/mm/yyyy HH'h 'mm'm'") }}
        </li>
        <li class="list-group-item">
          <b
            class="mb-2"
            :class="expense.receipt_path && 'd-block'"
          >Comprovante: </b>
          <AppViewerItems
            v-if="expense.receipt_path"
            col="12"
            :files="[expense.receipt_path]"
          />
          <span v-else>N/A</span>
        </li>
      </ul>
    </div>
    <div class="text-end">
      <AppButton
        color="light"
        data-bs-dismiss="modal"
      >
        Fechar
      </AppButton>
    </div>
  </div>
</template>
