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
  faUser,
  faListAlt,
  faSignOutAlt,
  faCheckCircle,
  faTasks,
  faUserTag,
  faHandHoldingUsd,
  faListUl,
  faFileSignature,
  faThLarge,
  faColumns,
  faDolly,
  faFileInvoiceDollar,
  faFileAlt
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
  LINHA_DE_PRODUCAO: {
    title: 'Linha de produção',
    icon: faDolly,
    route: { name: 'production-track.index' },
    condition: () => canView(
      ROLES.GERENCIA,
      ROLES.ATENDIMENTO,
      ROLES.DESIGN,
      ROLES.COSTURA,
      ROLES.ESTAMPA
    ),
    get items() {
      return [
        this.CALENDARIO_DE_ENTREGA,
        this.ESTEIRA_DE_PRODUCAO,
        this.PAINEL_DE_PRODUTIVIDADE
      ]
    },
    CALENDARIO_DE_ENTREGA: {
      title: 'Calendário de entrega',
      icon: faCalendarAlt,
      route: { name: 'weekly-calendar.delivery.index' },
      style: {
        fontSize: '.85rem',
        whiteSpace: 'nowrap'
      },
    },
    ESTEIRA_DE_PRODUCAO: {
      title: 'Esteira de Produção',
      icon: faTasks,
      route: { name: 'production-track.index' },
      style: {
        fontSize: '.85rem',
        whiteSpace: 'nowrap'
      },
      condition: () => canView(
        ROLES.GERENCIA,
        ROLES.ATENDIMENTO,
        ROLES.DESIGN,
        ROLES.COSTURA,
        ROLES.ESTAMPA
      ),
    },
    PAINEL_DE_PRODUTIVIDADE: {
      title: 'Painel de Produtividade',
      icon: faColumns,
      route: { name: 'productivity-panel.index' },
      style: {
        fontSize: '.85rem',
        whiteSpace: 'nowrap'
      },
      condition: () => canView(
        ROLES.GERENCIA
      )
    }
  },
  FINANCEIRO: {
    title: 'Financeiro',
    icon: faDollarSign,
    condition: () => canView(ROLES.GERENCIA, ROLES.ATENDIMENTO),
    get items () {
      return [
        this.ENTRADAS,
        this.DESPESAS,
        this.FLUXO_DE_CAIXA,
        this.ESPELHO_BANCARIO
      ]
    },
    ENTRADAS: {
      title: 'Entradas',
      icon: faListUl,
      route: { name: 'entries.index' },
      condition: () => canView(ROLES.GERENCIA, ROLES.ATENDIMENTO)
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
    },
    ESPELHO_BANCARIO: {
      title: 'Espelho bancário',
      icon: faFileInvoiceDollar,
      route: { name: 'bank-mirror.index' },
      condition: () => canView(ROLES.GERENCIA)
    }
  },
  GERENCIAMENTO: {
    title: 'Gerenciamento',
    icon: faCog,
    condition: () => canView(ROLES.GERENCIA),
    get items () {
      return [
        this.USUARIOS,
        this.CIDADES,
        this.FILIAIS,
        this.FORMULARIO_DE_PEDIDO,
        this.STATUS,
        this.SETORES,
        this.ENTRADAS_BANCARIAS
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
      condition: () => canView(ROLES.GERENCIA)
    },
    FILIAIS: {
      title: 'Filiais',
      icon: faBuilding,
      route: { name: 'branches.index' },
      condition: () => canView(ROLES.GERENCIA)
    },
    FORMULARIO_DE_PEDIDO: {
      title: 'Formulário de pedido',
      icon: faFileAlt,
      route: { name: 'garments.index' },
      condition: () => canView(ROLES.GERENCIA),
      style: {
        fontSize: '.85rem'
      }
    },
    STATUS: {
      title: 'Status',
      icon: faCheckCircle,
      route: { name: 'status.index' },
      condition: () => canView(ROLES.GERENCIA)
    },
    SETORES: {
      title: 'Setores',
      icon: faUserTag,
      route: { name: 'sectors.index' },
      condition: () => canView(ROLES.GERENCIA)
    },
    ENTRADAS_BANCARIAS: {
      title: 'Entradas bancárias',
      icon: faHandHoldingUsd,
      route: { name: 'bank-entries.index' },
      condition: () => canView(ROLES.GERENCIA)
    }
  },
  OUTROS: {
    title: 'Outros',
    icon: faThLarge,
    condition: () => canView(
      ROLES.GERENCIA,
      ROLES.ATENDIMENTO
    ),
    get items () {
      return [
        this.GERADOR_DE_RECIBO,
        this.GERADOR_DE_ORCAMENTO
      ]
    },
    GERADOR_DE_RECIBO: {
      title: 'Gerador de recibo',
      icon: faFileSignature,
      route: { name: 'receipt-generator.index' },

      condition: () => canView(
        ROLES.GERENCIA,
        ROLES.ATENDIMENTO
      )
    },
    GERADOR_DE_ORCAMENTO: {
      title: 'Gerador de orçamento',
      icon: faFileSignature,
      route: { name: 'budget-generator.index' },
      style: {
        fontSize: '.8rem'
      },
      condition: () => canView(
        ROLES.GERENCIA,
        ROLES.ATENDIMENTO
      )
    }
  },
  PRODUCAO_USUARIOS: {
    title: 'Produção',
    icon: faBox,
    route: { name: 'production-users.index' },
    condition: () => canView(ROLES.GERENCIA)
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
  ITEMS.LINHA_DE_PRODUCAO,
  ITEMS.FINANCEIRO,
  ITEMS.PRODUCAO_USUARIOS,
  ITEMS.GERENCIAMENTO,
  ITEMS.OUTROS,
  ITEMS.MINHA_CONTA,
  ITEMS.ATIVIDADES,
  ITEMS.SAIR
]
