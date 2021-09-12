function renderCardFooter (h, context) {
  if (context.$slots.footer) {
    return (
      <div class="card-footer">
        { context.$slots.body}
      </div>
    )
  }
}

export default renderCardFooter
