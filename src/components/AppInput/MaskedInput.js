function MaskedInputElement (h, context) {
  return (
    <input
      class={context.inputClasses}
      value={context.value}
      name={context.name}
      type={context.inputType}
      disabled={context.isDisabled}
      aria-describedby={context.hintId}
      vCleave={context.mask}
      on={{ ...context.$listeners, input: null }}
      vOn:input={e => { context.$emit('input', e.target.value) }}
      {...{ attrs: context.$attrs }}
    />
  )
}

export default MaskedInputElement
