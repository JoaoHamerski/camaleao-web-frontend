<script>
import roles from '@/constants/roles'
import { mapGetters, mapActions } from 'vuex'
import {
  faSignOutAlt,
  faBoxes,
  faCashRegister,
  faDollarSign,
  faFunnelDollar,
  faCog,
  faUsers,
  faCity,
  faBuilding,
  faTshirt,
  faBox,
  faUser,
  faCalendarAlt,
  faListAlt
} from '@fortawesome/free-solid-svg-icons'

import SidebarItem from './SidebarItem'
import SidebarHeader from './SidebarHeader'
import SidebarItemCollapsible from './SidebarItemCollapsible'

const LOW_LEVEL = [roles.ESTAMPA, roles.COSTURA, roles.DESIGN]
const HIGH_LEVEL = [roles.GERENCIA, roles.ATENDIMENTO]
const PRODUCAO = [roles.ESTAMPA, roles.COSTURA]
const GERENCIA = [roles.GERENCIA]

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
      roles: {
        LOW_LEVEL,
        HIGH_LEVEL,
        PRODUCAO,
        GERENCIA
      },
      icons: {
        faUsers,
        faSignOutAlt,
        faBoxes,
        faCashRegister,
        faDollarSign,
        faFunnelDollar,
        faCog,
        faCity,
        faBuilding,
        faTshirt,
        faBox,
        faUser,
        faCalendarAlt,
        faListAlt
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
    class="sidebar-scrollbar"
    :class="isSidebarActive && 'active'"
  >
    <SidebarHeader :auth-user="authUser" />

    <hr class="bg-light">
    <ul class="list-group list-group-flush">
      <SidebarItem
        v-if="$helpers.canView(roles.PRODUCAO)"
        :icon="icons.faBox"
        :to="{name: 'production.index'}"
      >
        Produção
      </SidebarItem>
      <SidebarItem
        v-if="$helpers.canView(roles.HIGH_LEVEL)"
        :icon="icons.faUsers"
        :to="{name: 'clients.index'}"
      >
        Clientes
      </SidebarItem>
      <SidebarItem
        v-if="$helpers.canView(roles.HIGH_LEVEL)"
        :icon="icons.faBoxes"
        :to="{name: 'orders.index'}"
      >
        Pedidos
      </SidebarItem>
      <SidebarItem
        v-if="$helpers.canView(roles.HIGH_LEVEL)"
        :icon="icons.faCashRegister"
        :to="{name: 'daily-cash.index'}"
      >
        Caixa diário
      </SidebarItem>
      <SidebarItem
        v-if="$helpers.canView(roles.HIGH_LEVEL)"
        :to="{name: 'weekly-production.index'}"
        :icon="icons.faCalendarAlt"
      >
        Produção semanal
      </SidebarItem>
      <SidebarItemCollapsible
        v-if="$helpers.canView(roles.HIGH_LEVEL)"
        id="financial"
        :icon="icons.faDollarSign"
      >
        <template
          #collapsible-title
        >
          Financeiro
        </template>
        <template
          #collapsible-items
        >
          <SidebarItem
            v-if="$helpers.canView(roles.HIGH_LEVEL)"
            :icon="icons.faFunnelDollar"
            :to="{name: 'expenses.index'}"
          >
            Despesas
          </SidebarItem>
          <SidebarItem
            v-if="$helpers.canView(roles.GERENCIA)"
            :icon="icons.faCashRegister"
            :to="{name: 'cash-flow.index'}"
          >
            Fluxo de caixa
          </SidebarItem>
        </template>
      </SidebarItemCollapsible>
      <SidebarItemCollapsible
        v-if="$helpers.canView(roles.HIGH_LEVEL)"
        id="settings"
        :icon="icons.faCog"
      >
        <template #collapsible-title>
          Gerenciamento
        </template>
        <template #collapsible-items>
          <SidebarItem
            v-if="$helpers.canView(roles.GERENCIA)"
            :to="{name: 'users.index'}"
            :icon="icons.faUsers"
          >
            Usuários
          </SidebarItem>
          <SidebarItem
            v-if="$helpers.canView(roles.HIGH_LEVEL)"
            :to="{name: 'cities.index'}"
            :icon="icons.faCity"
          >
            Cidades
          </SidebarItem>
          <SidebarItem
            v-if="$helpers.canView(roles.HIGH_LEVEL)"
            :to="{name: 'branches.index'}"
            :icon="icons.faBuilding"
          >
            Filiais
          </SidebarItem>
          <SidebarItem
            v-if="$helpers.canView(roles.HIGH_LEVEL)"
            :to="{name: 'clothing-types.index'}"
            :icon="icons.faTshirt"
          >
            Tipos de roupas
          </SidebarItem>
        </template>
      </SidebarItemCollapsible>
      <SidebarItem
        v-if="$helpers.canView(roles.HIGH_LEVEL)"
        :icon="icons.faBox"
        :to="{name: 'production-users.index'}"
      >
        Produção
      </SidebarItem>
      <SidebarItem
        :to="{name: 'my-account.index'}"
        :icon="icons.faUser"
      >
        Minha conta
      </SidebarItem>
      <SidebarItem
        v-if="$helpers.canView(roles.GERENCIA)"
        :to="{name: 'activities.index'}"
        :icon="icons.faListAlt"
      >
        Atividades
      </SidebarItem>
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
