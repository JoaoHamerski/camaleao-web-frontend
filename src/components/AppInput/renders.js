import { isBoolean } from 'lodash-es'
import MaskedInputElement from './MaskedInput'
import {
  MaskedInputPassword,
  renderPasswordToggleButton
} from './MaskedInputPassword'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

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

export const renderErrorMessage = function (h, context) {
  if (context.hasError && !isBoolean(context.error)) {
    return (
      <div class="small text-danger mb-n1">
        { context.error }
      </div>
    )
  }
}

export const renderHintMessage = function (h, context) {
  if (context.hasHint) {
    return (
      <small
        class="form-text"
        id={context.hintId}
      >
        { context.hint || context.$slots.hint }
      </small>
    )
  }
}

export const MaskedInputTodayBtn = function (h, context, element) {
  return (
    <div class="input-group">
      { element }
      <button
        class="btn btn-outline-primary"
        vOn:click_prevent={ context.emitTodayDate }
      >Hoje</button>
    </div>
  )
}

export const MaskedInputGroup = function (h, context, element) {
  return (
    <div class="input-group">
      { context.$slots.prepend }
      { element }
      { context.$slots.append }
      { context.type === 'password' && renderPasswordToggleButton(h, context)}
    </div>
  )
}

export const MaskedInputDate = function (h, context) {
  return (
    <DatePicker
      class="col"
      value={context.value}
      model-config={{
        type: 'string',
        mask: 'DD/MM/YYYY'
      }}
      attributes={[{
        key: 'today',
        bar: true,
        dates: new Date()
      }]}
      popover={{
        visibility: 'focus'
      }}
      vOn:input={e => { context.$emit('input', e) }}
    >
      {
        ({ inputEvents }) => MaskedInputElement(h, context, inputEvents)
      }
    </DatePicker>
  )
}

export const renderInput = function (h, context) {
  let element = MaskedInputElement(h, context)

  if (context.type === 'password') {
    element = MaskedInputPassword(h, context, element)
  }

  if (context.type === 'date') {
    element = MaskedInputDate(h, context)
  }

  if (context.todayButton) {
    element = MaskedInputTodayBtn(h, context, element)
  }

  if (context.isInputGroup) {
    element = MaskedInputGroup(h, context, element)
  }

  return context.shouldRenderDisabledMessage
    ? renderDisabledMessage(h, context, element)
    : element
}
