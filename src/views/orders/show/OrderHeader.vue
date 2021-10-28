<script>
import {
  faCog,
  faFileInvoice,
  faDollarSign,
  faEdit,
  faTrashAlt,
  faTimesCircle,
  faExchangeAlt
} from '@fortawesome/free-solid-svg-icons'

export default {
  data () {
    return {
      icons: {
        faCog,
        faFileInvoice,
        faDollarSign,
        faEdit,
        faTrashAlt,
        faTimesCircle,
        faExchangeAlt
      }
    }
  }
}
</script>

<template>
  <div class="mb-1 d-flex justify-content-between">
    <div>
      <AppButton
        color="success"
        outlined
        :icon="icons.faDollarSign"
      >
        Adicionar pagamento
      </AppButton>
    </div>
    <div>
      <AppButton
        class="me-1"
        :icon="icons.faFileInvoice"
      >
        Gerar relatório
      </AppButton>

      <AppButton
        id="dropdownOptions"
        data-bs-toggle="dropdown"
        :icon="icons.faCog"
      />

      <ul
        class="dropdown-menu"
        aria-labelledby="dropdownOptions"
      >
        <AppDropdownItem
          :icon="icons.faEdit"
          text="Editar"
          icon-color="primary"
        />

        <AppDropdownItem
          :icon="icons.faTrashAlt"
          text="Excluir"
          icon-color="danger"
        />

        <div class="dropdown-divider" />

        <AppDropdownItem
          :icon="icons.faExchangeAlt"
          text="Alterar status"
          icon-color="primary"
        />

        <AppDropdownItem
          :icon="icons.faTimesCircle"
          text="Fechar pedido"
          icon-color="primary"
        />
      </ul>
    </div>
  </div>
</template>
