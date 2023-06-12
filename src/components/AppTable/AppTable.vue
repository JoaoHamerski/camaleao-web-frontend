<script lang="jsx">
import { get, map, uniqueId } from 'lodash-es'
import classNames from 'classnames'

import TableCell from './TableCell.vue'
import TableEmpty from './TableEmpty.vue'

const tableHeadContent = (h, context, header) => {
  if (!context.hasSlot(`headers.${header.value}`)) {
    return header.text
  }

  return context.$scopedSlots[`headers.${header.value}`]({ header })
  || context.$slots[`headers.${header.value}`]
}

const renderTableHead = (h, context) => {
  return (
    <thead>
      <tr>
        {
          map(context.headers, (header, index) => {
            return (
              <th
                key={index}
                class={[
                  header.align && `text-${header.align}`,
                  'text-nowrap'
                ]}>
                { tableHeadContent(h, context, header) }
              </th>
            )
          })
        }
      </tr>
    </thead>
  )
}

const tableCellContent = (h, context, header, item) => {
  if (!context.hasSlot(`items.${header.value}`)) {
    return item[header.value]
  }

  return (
    context.$scopedSlots[`items.${header.value}`]({ item })
    || context.$slots[`items.${header.value}`]
  )
}

const renderTableCell = (h, context, item) => {
  return map(context.headers, (header, index) => {
    return (
      <TableCell
        key={uniqueId()}
        vOn:clicked={() => { context.redirectTo(item) }}
        isUsingSlot={context.hasSlot(`items.${header.value}`)}
        hasRowLinks={context.hasRowLinks}
        url={() => context.routeUrl(item)}
        header={header}
        openInNewTab={context.openInNewTab}
        value={get(item, header.value)}
      >
        { tableCellContent(h, context, header, item) }
      </TableCell>
    )
  })
}

const renderTableRow = (h, context, item, index) => {
  return ([
    <tr
      key={`tr_${index}`}
      class={context.rowClass(item)}
    >
      { renderTableCell(h, context, item) }
    </tr>,
    context.$scopedSlots['table-row.item']
      ? context.$scopedSlots['table-row.item']({ item })
      : null
  ])
}

const renderTableBody = (h, context) => {
  return (
    <tbody class="position-relative">
      {
        map(context.items, (item, index) => {
          if (item.hidden === true || item.show === true || item.display === false) {
            return
          }

          return renderTableRow(h, context, item, index)
        })
      }

      { context.$slots.bodyAppend }
    </tbody>
  )
}

const renderTable = (h, context) => {
  if (context.items.length) {
    return (
      <table class={context.tableClasses}>
        { renderTableHead(h, context) }
        { renderTableBody(h, context) }
      </table>
    )
  }

  return (<TableEmpty />)
}

export default {
  components: {
    TableCell
  },
  props: {
    rowClass: {
      type: Function,
      default: () => {}
    },
    tableClass: {
      type: String,
      default: ''
    },
    headers: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    route: {
      type: Function,
      default: () => {}
    },
    openInNewTab: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    tableClasses () {
      return classNames([
        'table',
        this.tableClass,
        this.hasRowLinks && 'table-hover table-click'
      ])
    },
    hasRowLinks () {
      return !!this.$props.route.length
    }
  },
  methods: {
    routeUrl (item) {
      const resolvedRoute = this.$router.resolve(
        this.route(item)
      )

      return resolvedRoute.href
    },
    hasSlot (name) {
      return !!(this.$slots[name] || this.$scopedSlots[name])
    }
  },
  render (h) {
    return (
      <div class="table-responsive">
        { renderTable(h, this) }
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  td.has-link {
    padding: 0;

    a {
      padding: 0.5rem 0.5rem
    }
  }
}
</style>
