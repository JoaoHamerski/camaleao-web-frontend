function renderCardFooter (h, context) {
  if (context.$slots.footer) {
    return (
      <div class="card-footer">
        { context.$slots.footer}
      </div>
    )
  }
}

export default renderCardFooter
