<script>
import { mapGetters, mapActions } from 'vuex'
import {
  faList,
  faSignOutAlt,
  faBoxes,
  faCashRegister,
  faDollarSign,
  faFunnelDollar
} from '@fortawesome/free-solid-svg-icons'

import SidebarItem from './SidebarItem'
import SidebarHeader from './SidebarHeader'
import SidebarItemCollapsible from './SidebarItemCollapsible'

export default {
  components: {
    SidebarHeader,
    SidebarItem,
    SidebarItemCollapsible
  },
  data () {
    return {
      icons: {
        faList,
        faSignOutAlt,
        faBoxes,
        faCashRegister,
        faDollarSign,
        faFunnelDollar
      }
    }
  },
  computed: {
    ...mapGetters('sidebar', ['isSidebarActive'])
  },
  methods: {
    ...mapActions('auth', ['logout'])
  }
}
</script>

<template>
  <nav
    id="sidebar"
    :class="isSidebarActive && 'active'"
  >
    <SidebarHeader />
    <hr class="bg-light">

    <ul class="list-group list-group-flush">
      <SidebarItem
        :icon="icons.faList"
        :to="{name: 'clients.index'}"
      >
        Clientes
      </SidebarItem>

      <SidebarItem
        :icon="icons.faBoxes"
        :to="{name: 'orders.index'}"
      >
        Pedidos
      </SidebarItem>

      <SidebarItem
        :icon="icons.faCashRegister"
        :to="{name: 'daily-cash.index'}"
      >
        Caixa diário
      </SidebarItem>

      <SidebarItemCollapsible
        id="financial"
        :icon="icons.faDollarSign"
      >
        <template #collapsible-title>
          Financeiro
        </template>
        <template #collapsible-items>
          <SidebarItem
            :icon="icons.faFunnelDollar"
            :to="{name: 'expenses.index'}"
          >
            Despesas
          </SidebarItem>
          <SidebarItem
            :icon="icons.faCashRegister"
            :to="{name: 'cash-flow.index'}"
          >
            Fluxo de caixa
          </SidebarItem>
        </template>
      </SidebarItemCollapsible>

      <SidebarItem
        to="/sair"
        :icon="icons.faSignOutAlt"
        disabled-redirect
        @click.native="logout"
      >
        Sair
      </SidebarItem>
    </ul>
  </nav>
</template>
