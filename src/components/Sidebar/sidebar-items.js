import ROLES from '@/constants/roles'
import { canView } from '@/utils/helpers'
import store from '@/store'
import {
  faBoxes,
  faUsers,
  faBox,
  faCashRegister,
  faCalendarAlt,
  faDollarSign,
  faFunnelDollar,
  faCog,
  faCity,
  faBuilding,
  faTshirt,
  faUser,
  faListAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'

const ITEMS = {
  PRODUCAO: {
    title: 'Produção',
    icon: faBox,
    route: { name: 'production.index' },
    condition: () => canView(ROLES.COSTURA, ROLES.ESTAMPA)
  },
  CLIENTE: {
    title: 'Cliente',
    icon: faUsers,
    route: { name: 'clients.index' },
    condition: () => canView(ROLES.GERENCIA, ROLES.ATENDIMENTO)
  },
  PEDIDOS: {
    title: 'Pedidos',
    icon: faBoxes,
    route: { name: 'orders.index' },
    condition: () => canView(ROLES.GERENCIA, ROLES.ATENDIMENTO)
  },
  CAIXA_DIARIO: {
    title: 'Caixa diário',
    icon: faCashRegister,
    route: { name: 'daily-cash.index' },
    condition: () => canView(ROLES.GERENCIA, ROLES.ATENDIMENTO)
  },
  PRODUCAO_SEMANAL: {
    title: 'Produção semanal',
    icon: faCalendarAlt,
    route: { name: 'weekly-production.index' },
    condition: () => canView(ROLES.GERENCIA, ROLES.ATENDIMENTO)
  },
  FINANCEIRO: {
    title: 'Financeiro',
    icon: faDollarSign,
    condition: () => canView(ROLES.GERENCIA, ROLES.ATENDIMENTO),
    get items () {
      return [
        this.DESPESAS,
        this.FLUXO_DE_CAIXA
      ]
    },
    DESPESAS: {
      title: 'Despesas',
      icon: faFunnelDollar,
      route: { name: 'expenses.index' },
      condition: () => canView(ROLES.GERENCIA, ROLES.ATENDIMENTO)
    },
    FLUXO_DE_CAIXA: {
      title: 'Fluxo de caixa',
      icon: faCashRegister,
      route: { name: 'cash-flow.index' },
      condition: () => canView(ROLES.GERENCIA)
    }
  },
  GERENCIAMENTO: {
    title: 'Gerenciamento',
    icon: faCog,
    condition: () => canView(ROLES.GERENCIA, ROLES.ATENDIMENTO),
    get items () {
      return [
        this.USUARIOS,
        this.CIDADES,
        this.FILIAIS,
        this.TIPOS_DE_ROUPAS
      ]
    },
    USUARIOS: {
      title: 'Usuários',
      icon: faUsers,
      route: { name: 'users.index' },
      condition: () => canView(ROLES.GERENCIA)
    },
    CIDADES: {
      title: 'Cidades',
      icon: faCity,
      route: { name: 'cities.index' },
      condition: () => canView(ROLES.GERENCIA, ROLES.ATENDIMENTO)
    },
    FILIAIS: {
      title: 'Filiais',
      icon: faBuilding,
      route: { name: 'branches.index' },
      condition: () => canView(ROLES.GERENCIA, ROLES.ATENDIMENTO)
    },
    TIPOS_DE_ROUPAS: {
      title: 'Tipos de roupas',
      icon: faTshirt,
      route: { name: 'clothing-types.index' },
      condition: () => canView(ROLES.GERENCIA, ROLES.ATENDIMENTO)
    }
  },
  PRODUCAO_USUARIOS: {
    title: 'Produção',
    icon: faBox,
    route: { name: 'production-users.index' },
    condition: () => canView(ROLES.GERENCIA, ROLES.ATENDIMENTO)
  },
  MINHA_CONTA: {
    title: 'Minha conta',
    icon: faUser,
    route: { name: 'my-account.index' }
  },
  ATIVIDADES: {
    title: 'Atividades',
    icon: faListAlt,
    route: { name: 'activities.index' },
    condition: () => canView(ROLES.GERENCIA)
  },
  SAIR: {
    title: 'Sair',
    icon: faSignOutAlt,
    click: () => store.dispatch('auth/logout')
  }
}

export default [
  ITEMS.PRODUCAO,
  ITEMS.CLIENTE,
  ITEMS.PEDIDOS,
  ITEMS.CAIXA_DIARIO,
  ITEMS.PRODUCAO_SEMANAL,
  ITEMS.FINANCEIRO,
  ITEMS.GERENCIAMENTO,
  ITEMS.PRODUCAO_USUARIOS,
  ITEMS.MINHA_CONTA,
  ITEMS.ATIVIDADES,
  ITEMS.SAIR
]