function getAttrs (context) {
  const attrs = []
  const objAttrs = {}
  const dateTypesToHideKeyboard = [
    'month',
    'week',
    'year'
  ]

  attrs.push(context.$attrs)

  if (context.numeric) {
    attrs.push({ inputmode: 'numeric' })
  }

  if (dateTypesToHideKeyboard.includes(context.type)) {
    attrs.push({inputmode: 'none'})
  }

  attrs.reduce((initial, obj) => {
    Object.assign(objAttrs, obj)
  }, {})

  return objAttrs
}

function MaskedInputElement (h, context, events) {
  const onInput = e => { context.$emit('input', e.target.value) }
  const attrs = getAttrs(context)

  return (
    <input
      data-disable-clear-error={!context.autoClearError}
      class={context.inputClasses}
      value={context.value}
      name={context.name}
      type={context.typeComputed}
      disabled={context.isDisabled}
      aria-describedby={context.hintId}
      autocomplete={context.inputAutocomplete}
      vCleave={context.mask}
      ref="input"
      on={{ ...context.$listeners, ...events, input: null }}
      vOn:input={onInput}
      {...{ attrs }}
    />
  )
}

export default MaskedInputElement
