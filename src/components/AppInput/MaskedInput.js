import MaskedInput from 'vue-text-mask'

function MaskedInputElement (h, context) {
  return (
    <MaskedInput
      ref="input"
      class={context.inputClasses}
      name={context.name}
      type={context.inputType}
      mask={context.mask}
      value={context.value}
      disabled={context.isDisabled}
      onInput={e => { context.$emit('input', e) }}
      aria-describedby={context.hintId}
      on={context.$listeners}
      {...{ attrs: context.$attrs }}
    />
  )
}

export default MaskedInputElement
