<script>
import classNames from 'classnames'

import TableCell from './TableCell'
import TableEmpty from './TableEmpty'

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
          context.headers.map((header, index) => {
            return (
              <th
                key={index}
                class={`text-${header.align}`}>
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
  return context.headers.map((header, index) => {
    return (
      <TableCell
        isUsingSlot={context.hasSlot(`items.${header.value}`)}
        hasRowLinks={context.hasRowLinks}
        url={context.rowUrl(item)}
        align={header.align}
        format={header.format}
        formatting={header.formatting}
        key={index}
        value={item[header.value]}
      >
        { tableCellContent(h, context, header, item) }
      </TableCell>
    )
  })
}

const renderTableBody = (h, context) => {
  return (
    <tbody class="position-relative">
      {
        context.items.map((item, index) => {
          return (
            <tr
              key={index}
              class={context.rowClass(item)}
              vOn:mousedown={(e) => { context.rowClicked(e, item) }}
            >
              { renderTableCell(h, context, item) }
            </tr>
          )
        })
      }
      {
        context.$slots.bodyAppend
      }
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
    rowUrl: {
      type: Function,
      default: () => ''
    },
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
      return !!this.$listeners['click:item']
    }
  },
  methods: {
    rowClicked (event, item) {
      if (event.which === 1) {
        this.$emit('click:item', item)
      }
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
