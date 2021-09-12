function normalCardBody (h, context) {
  return (
    <div class="card-body">
      { context.$slots.body}
    </div>
  )
}

function collapsibleCardBody (h, context) {
  return (
    <div
      id={context.collapseId}
      class={context.collapsibleCardBodyClass}
    >
      { normalCardBody(h, context)}
    </div>
  )
}

function renderCardBody (h, context) {
  if (context.collapsible) {
    return collapsibleCardBody(h, context)
  }

  return normalCardBody(h, context)
}

export default renderCardBody
