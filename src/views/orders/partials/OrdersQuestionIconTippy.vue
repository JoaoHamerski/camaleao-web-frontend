<script>
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

import { TippyComponent } from 'vue-tippy'
import OrdersListLegend from '../../orders/partials/OrdersListLegend'

export default {
  components: {
    OrdersListLegend,
    Tippy: TippyComponent
  },
  data () {
    return {
      icons: {
        faQuestionCircle
      }
    }
  }
}
</script>

<template>
  <div>
    <Tippy
      to="icon-question"
      placement="bottom"
      arrow
      theme="light-border"
      :duration="150"
      :hide-on-click="false"
    >
      <OrdersListLegend />
    </Tippy>
    <FontAwesomeIcon
      name="icon-question"
      :icon="icons.faQuestionCircle"
    />
  </div>
</template>
