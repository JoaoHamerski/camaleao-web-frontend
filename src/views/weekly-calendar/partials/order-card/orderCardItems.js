import { getUrl, plural } from '@/utils/helpers'
import { formatDatetime, formatCurrencyBRL } from '@/utils/formatters'
import { upperFirst } from 'lodash-es'
import {
  faUser,
  faTshirt,
  faCalendarAlt,
  faDollarSign,
  faHandHoldingUsd,
  faCheckCircle,
  faDotCircle
} from '@fortawesome/free-solid-svg-icons'

export default [
  {
    title: 'Nome do cliente',
    prop: 'client.name',
    icon: faUser,
    classes: 'fw-bold',
    link: (context) => {
      if (!context.order.client) {
        return null
      }

      return getUrl('clients.show', {client: context.order.client.id})
    },
  },
  {
    title: 'Quantidade',
    prop: 'quantity',
    icon: faTshirt,
    classes: (context) => context.isExpanded && 'fw-bold',
    computedProp: (prop) => upperFirst(plural(prop, 'F', 'peça'))
  },
  {
    hideOnShrink: true,
    title: 'Valor do pedido',
    prop: 'price',
    icon: faDollarSign,
    classes: 'fw-bold',
    computedProp: (prop) => formatCurrencyBRL(prop)
  },
  {
    hideOnShrink: true,
    title: 'Falta pagar',
    prop: 'total_owing',
    icon: faHandHoldingUsd,
    classes: (context) => context.order.total_owing <= 0
      ? 'text-success fw-bold'
      : 'text-danger fw-bold',
    computedProp: (prop) => prop <= 0
      ? 'Pedido pago'
      : formatCurrencyBRL(prop)
  },
  {
    hideOnShrink: true,
    title: 'Status do pedido',
    prop: 'status.text',
    icon: (context) => context.order.status.is_available
      ? faCheckCircle
      : faDotCircle,
    classes: (context) => context.order.status.is_available
      ? 'text-success fw-bold'
      : 'text-warning fw-bold',
    renderCheckButton: (context) => context.order.can_be_concluded
  },
  {
    title: 'Data de cadastro',
    prop: 'created_at',
    icon: faCalendarAlt,
    computedProp: (prop) => formatDatetime(prop)
  }
]
