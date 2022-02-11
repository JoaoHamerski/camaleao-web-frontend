<script>
import roles from '@/constants/roles'

import { mapGetters, mapActions } from 'vuex'
import {
  faList,
  faSignOutAlt,
  faBoxes,
  faCashRegister,
  faDollarSign,
  faFunnelDollar,
  faCog,
  faUsers,
  faCity
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
  props: {
    authUser: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      roles,
      icons: {
        faList,
        faSignOutAlt,
        faBoxes,
        faCashRegister,
        faDollarSign,
        faFunnelDollar,
        faCog,
        faUsers,
        faCity
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
    v-if="authUser"
    id="sidebar"
    :class="isSidebarActive && 'active'"
  >
    <SidebarHeader :auth-user="authUser" />

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
            v-if="+authUser.role.id === roles.GERENCIA"
            :icon="icons.faCashRegister"
            :to="{name: 'cash-flow.index'}"
          >
            Fluxo de caixa
          </SidebarItem>
        </template>
      </SidebarItemCollapsible>

      <SidebarItemCollapsible
        id="settings"
        :icon="icons.faCog"
      >
        <template #collapsible-title>
          Gerenciamento
        </template>

        <template #collapsible-items>
          <SidebarItem
            :to="{name: 'users.index'}"
            :icon="icons.faUsers"
          >
            Usuários
          </SidebarItem>
          <SidebarItem
            :to="{name: 'cities.index'}"
            :icon="icons.faCity"
          >
            Cidades
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
