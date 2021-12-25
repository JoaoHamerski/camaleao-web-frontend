import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'

function normalCardHeader (h, context) {
  return (
    <div class={`card-header text-white bg-${context.color}`}>
      { context.$slots.header}
    </div>
  )
}

function collapsibleCardHeader (h, context) {
  return (
    <div
      ref="collapse"
      class={[
        {
          'no-select': context.collapsible
        },
        `bg-${context.color}`,
        'card-header text-white card-collapsible',
        'd-flex justify-content-between',
        'align-items-center'
      ]}
      data-bs-toggle="collapse"
      href={`#${context.collapseId}`}
      role="button"
      aria-expanded={context.isCollapsed}
      aria-controls={context.collapseId}
    >
      { context.$slots.header}
      <FontAwesomeIcon
        size="lg"
        icon={faCaretLeft}
        class={context.collapsibleCardIconClass}
      ></FontAwesomeIcon>
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
