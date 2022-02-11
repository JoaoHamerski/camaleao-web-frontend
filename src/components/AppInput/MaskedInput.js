function MaskedInputElement (h, context, events) {
  return (
    <input
      class={context.inputClasses}
      value={context.value}
      name={context.name}
      type={context.inputType}
      disabled={context.isDisabled}
      aria-describedby={context.hintId}
      autocomplete={context.inputAutocomplete}
      vCleave={context.mask}
      ref="input"
      on={{ ...context.$listeners, ...events, input: null }}
      vOn:input={e => { context.$emit('input', e.target.value) }}
      {...{ attrs: context.$attrs }}
    />
  )
}

export default MaskedInputElement
