export default {
  computed: {
    isOrderPreRegistered () {
      if (!this.order.states) {
        return true
      }

      return this.order.states.includes('PRE-REGISTERED')
    },
    isOrderClosed () {
      if (!this.order.states) {
        return false
      }

      return this.order.states.includes('CLOSED')
    },
    isOrderPaid () {
      if (!this.order.states) {
        return false
      }

      return this.order.states.includes('PAID')
    }
  }
}
