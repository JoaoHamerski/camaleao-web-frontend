import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'

import MaskedInputElement from './MaskedInput'

function MaskedInputPassword (h, context) {
  function getEyeStateIcon (isTypePassword) {
    if (isTypePassword) {
      return (<FontAwesomeIcon icon={faEyeSlash} fixed-width />)
    }

    return (<FontAwesomeIcon icon={faEye} fixed-width />)
  }

  return (
    <div class="input-group">
      { MaskedInputElement(h, context) }

      <button
        class={'btn btn-outline-primary ' + (context.isDisabled && 'cursor-disabled')}
        disabled={context.isDisabled}
        vOn:click_prevent={context.togglePassord}
      >
        { getEyeStateIcon(context.isTypePassword)}
      </button>
    </div>
  )
}

export default MaskedInputPassword
