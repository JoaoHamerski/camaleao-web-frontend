function MaskedInputElement (h, context, events) {
  const onInput = e => { context.$emit('input', e.target.value) }

  return (
    <input
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
      {...{ attrs: context.$attrs }}
    />
  )
}

export default MaskedInputElement
