import { isEmpty, isBoolean } from 'lodash-es'
import MaskedInputElement from './MaskedInput'
import { MaskedInputPassword, renderPasswordToggleButton } from './MaskedInputPassword'

function renderOptionalLabel (h, context) {
  if (context.optional) {
    return (
      <span class="small text-secondary"> (opcional)</span>
    )
  }
}

export const renderInputLabel = function (h, context) {
  if (context.inputLabel) {
    return (
      <label
        for={context.$attrs.id}
        class="form-label"
      >
        <span class="fw-bold">{context.inputLabel}</span>
        { renderOptionalLabel(h, context) }
      </label>
    )
  }
}

export const renderDisabledMessage = function (h, context, element) {
  return (
    <div
      content={context.disabledMessage}
      v-tippy={context.tippyConfig}
    >
      { element }
    </div>
  )
}

export const MaskedInputGroup = function (h, context) {
  return (
    <div class="input-group">
      { context.$slots.prepend }
      { MaskedInputElement(h, context) }
      { context.$slots.append }
      { context.type === 'password' && renderPasswordToggleButton(h, context)}
    </div>
  )
}

export const renderErrorMessage = function (h, context) {
  if (context.hasError && !isBoolean(context.error)) {
    return (
      <div class="small text-danger">
        { context.error }
      </div>
    )
  }
}

export const renderHintMessage = function (h, context) {
  if (!isEmpty(context.hint)) {
    return (
      <small
        class="form-text"
        id={context.hintId}
      >
        { context.hint }
      </small>
    )
  }
}

export const renderInput = function (h, context) {
  let element = MaskedInputElement(h, context)

  if (context.type === 'password') {
    element = MaskedInputPassword(h, context)
  }

  if (context.isInputGroup) {
    element = MaskedInputGroup(h, context)
  }

  return context.shouldRenderDisabledMessage
    ? renderDisabledMessage(h, context, element)
    : element
}
