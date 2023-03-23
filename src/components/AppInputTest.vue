<script lang="jsx">
import Cleave from 'cleave.js'

function renderInput (h, context) {
  return (
    <input
      value={context.value}
      on={{ ...context.$listeners, input: null }}
      vOn:input={(e) => { context.$emit('input', e.target.value) }}
      vCleave={context.mask}
    />
  )
}

export default {
  directives: {
    cleave: {
      inserted: (el, binding, vnode) => {
        if (vnode.context.mask !== undefined) {
          el.cleave = new Cleave(el, binding.value || {})
        }
      },
      update: (el, binding, vnode) => {
        const event = new Event('input', { bubbles: true })

        if (vnode.context.mask !== undefined) {
          setTimeout(function () {
            el.dispatchEvent(event)
          }, 100)
        }
      }
    }
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    mask: undefined
  },
  render (h) {
    return renderInput(h, this)
  }
}
</script>
