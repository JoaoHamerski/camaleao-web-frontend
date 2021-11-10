import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'

export const renderPasswordToggleButton = function (h, context) {
  function renderEyeStateIcon (isTypePassword) {
    if (isTypePassword) {
      return (<FontAwesomeIcon icon={faEyeSlash} fixed-width />)
    }

    return (<FontAwesomeIcon icon={faEye} fixed-width />)
  }

  return (
    <button
      class={'btn btn-outline-primary ' + (context.isDisabled && 'cursor-disabled')}
      disabled={context.isDisabled}
      vOn:click_prevent={context.togglePassord}
    >
      { renderEyeStateIcon(context.isTypePassword)}
    </button>
  )
}

export const MaskedInputPassword = function (h, context, element) {
  return (
    <div class="input-group">
      { element }
      { renderPasswordToggleButton(h, context)}
    </div>
  )
}
