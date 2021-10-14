function MaskedInputElement (h, context) {
  return (
    <input
      class={context.inputClasses}
      value={context.value}
      name={context.name}
      type={context.inputType}
      disabled={context.isDisabled}
      aria-describedby={context.hintId}
      on={{ ...context.$listeners, input: null }}
      vCleave={context.mask}
      vOn:input={event => { context.$emit('input', event.target.value) }}
      {...{ attrs: context.$attrs }}
    />
  )
}

export default MaskedInputElement
