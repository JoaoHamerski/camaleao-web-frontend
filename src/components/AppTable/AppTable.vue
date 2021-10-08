<script>
import classNames from 'classnames'

import TableCell from './TableCell'
import TableEmpty from './TableEmpty'

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
                { header.text }
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
        align={header.align}
        format={header.format}
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
    <tbody>
      {
        context.items.map((item, index) => {
          return (
            <tr
              key={index}
              vOn:click_prevent={() => { context.rowClicked(item) }}
            >
              { renderTableCell(h, context, item) }
            </tr>
          )
        })
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
    rowClicked (item) {
      this.$emit('click:item', item)
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
