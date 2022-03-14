import { isBoolean } from 'lodash-es'
import { faCalendarAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import DatePicker from 'vue2-datepicker'
import { DateTime } from 'luxon'
import 'vue2-datepicker/locale/pt-br'

import MaskedInputElement from './MaskedInput'
import {
  MaskedInputPassword,
  renderPasswordToggleButton
} from './MaskedInputPassword'

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

const emitDate = (context, event) => {
  if (event === null) {
    context.$emit('input', null)
    return
  }

  if (context.type === 'week') {
    const [day, month, year] = event.split('/')
    const date = DateTime.local(+year, +month, +day)
    const startOfWeek = date.startOf('week').toFormat('dd/MM/y')
    const endOfWeek = date.endOf('week').toFormat('dd/MM/y')

    context.$emit('input', [startOfWeek, endOfWeek].join(' - '))
    return
  }

  context.$emit('input', event)
}

export const MaskedInputDate = function (h, context) {
  const formats = {
    date: 'DD/MM/YYYY',
    month: 'MM/YYYY',
    week: 'DD/MM/YYYY',
    year: 'YYYY'
  }

  return (
    <DatePicker
      class={[context.todayButton && 'today-btn', 'custom-date-picker'] }
      format={formats[context.type]}
      value-type="format"
      type={context.type}
      popup-style={{ top: '100%', left: 0 }}
      append-to-body={false}
      value={context.value}
      vOn:input={e => { emitDate(context, e) }}
      show-week-number={false}
      lang={{
        formatLocale: {
          weekdaysMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
          firstDayOfWeek: 1
        }
      }}
      {
        ...{
          scopedSlots: {
            input: ({ events }) => MaskedInputElement(h, context, events),
            'icon-calendar': () => <FontAwesomeIcon icon={faCalendarAlt} />,
            'icon-clear': () => <FontAwesomeIcon icon={faTimesCircle} />
          }
        }
      }
    />
  )
}

export const renderInput = function (h, context) {
  let element = MaskedInputElement(h, context)

  if (context.type === 'password') {
    element = MaskedInputPassword(h, context, element)
  }

  if (context.dateRelated.includes(context.type)) {
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
