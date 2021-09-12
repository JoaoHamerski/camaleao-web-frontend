
function normalCardHeader (h, context) {
  return (
    <div class={`card-header bg-${context.color}`}>
      { context.$slots.header}
    </div>
  )
}

function collapsibleCardHeader (h, context) {
  return (
    <div
      ref="collapse"
      class={`card-header card-collapsible bg-${context.color}`}
      data-bs-toggle="collapse"
      href={`#${context.collapseId}`}
      role="button"
      aria-expanded={context.isCollapsed}
      aria-controls={context.collapseId}
    >
      { context.$slots.header}
      <i class={context.collapsibleCardIconClass}></i>
    </div>
  )
}

function renderCardHeader (h, context) {
  if (context.collapsible) {
    return collapsibleCardHeader(h, context)
  }

  return normalCardHeader(h, context)
}

export default renderCardHeader
