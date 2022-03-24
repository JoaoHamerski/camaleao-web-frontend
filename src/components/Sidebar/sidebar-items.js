import ROLES from '@/constants/roles'
import { canView } from '@/utils/helpers'
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
  faListAlt
} from '@fortawesome/free-solid-svg-icons'

export default [
  {
    title: 'Produção',
    icon: faBox,
    route: { name: 'production.index' },
    condition: () => canView(ROLES.COSTURA, ROLES.ESTAMPA)
  },
  {
    title: 'Cliente',
    icon: faUsers,
    route: { name: 'clients.index' },
    condition: () => canView(ROLES.GERENCIA, ROLES.ATENDIMENTO)
  },
  {
    title: 'Pedidos',
    icon: faBoxes,
    route: { name: 'orders.index' },
    condition: () => canView(ROLES.GERENCIA, ROLES.ATENDIMENTO)
  },
  {
    title: 'Caixa diário',
    icon: faCashRegister,
    route: { name: 'daily-cash.index' },
    condition: () => canView(ROLES.GERENCIA, ROLES.ATENDIMENTO)
  },
  {
    title: 'Produção semanal',
    icon: faCalendarAlt,
    route: { name: 'weekly-production.index' },
    condition: () => canView(ROLES.GERENCIA, ROLES.ATENDIMENTO)
  },
  {
    title: 'Financeiro',
    icon: faDollarSign,
    condition: () => canView(ROLES.GERENCIA, ROLES.ATENDIMENTO),
    items: [
      {
        title: 'Despesas',
        icon: faFunnelDollar,
        route: { name: 'expenses.index' },
        condition: () => canView(ROLES.GERENCIA, ROLES.ATENDIMENTO)
      },
      {
        title: 'Fluxo de caixa',
        icon: faCashRegister,
        route: { name: 'cash-flow.index' },
        condition: () => canView(ROLES.GERENCIA)
      }
    ]
  },
  {
    title: 'Gerenciamento',
    icon: faCog,
    condition: () => canView(ROLES.GERENCIA, ROLES.ATENDIMENTO),
    items: [
      {
        title: 'Usuários',
        icon: faUsers,
        route: { name: 'users.index' },
        condition: () => canView(ROLES.GERENCIA)
      },
      {
        title: 'Cidades',
        icon: faCity,
        route: { name: 'cities.index' },
        condition: () => canView(ROLES.GERENCIA, ROLES.ATENDIMENTO)
      },
      {
        title: 'Filiais',
        icon: faBuilding,
        route: { name: 'branches.index' },
        condition: () => canView(ROLES.GERENCIA, ROLES.ATENDIMENTO)
      },
      {
        title: 'Tipos de roupas',
        icon: faTshirt,
        route: { name: 'clothing-types.index' },
        condition: () => canView(ROLES.GERENCIA, ROLES.ATENDIMENTO)
      }
    ]
  },
  {
    title: 'Produção',
    icon: faBox,
    route: { name: 'production-users.index' },
    condition: () => canView(ROLES.GERENCIA, ROLES.ATENDIMENTO)
  },
  {
    title: 'Minha conta',
    icon: faUser,
    route: { name: 'my-account.index' }
  },
  {
    title: 'Atividades',
    icon: faListAlt,
    route: { name: 'activities.index' },
    condition: () => canView(ROLES.GERENCIA)
  }
]
