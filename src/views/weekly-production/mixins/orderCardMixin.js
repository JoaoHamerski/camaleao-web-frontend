import { formatDatetime } from '@/utils/formatters'

const ORDER_TITLES = {
  PRE_REGISTERED: 'PRÉ REGISTRO',
  PRE_CREATED: 'FALTA CADASTRAR'
}

export default {
  props: {
    order: {
      type: Object,
      default: null
    }
  },
  computed: {
    orderImage () {
      if (this.order.art_paths) {
        return this.order.art_paths[0]
      }

      if (this.order.isPreCreated) {
        return this.order.image.base64
      }

      return null
    },
    clientUrl () {
      if (!this.order.client) {
        return null
      }

      const resolvedRoute = this.$router.resolve({
        name: 'clients.show',
        params: {
          clientKey: this.order.client.id
        }
      })

      return resolvedRoute.href
    },
    orderUrl () {
      if (this.order.isPreCreated) {
        return null
      }

      if (!this.order.client) {
        const resolvedRoute = this.$router.resolve({
          name: 'orders.show.pre-registered',
          params: {
            orderKey: this.order.id
          }
        })

        return resolvedRoute.href
      }

      const resolvedRoute = this.$router.resolve({
        name: 'orders.show',
        params: {
          clientKey: this.order.client.id,
          orderKey: this.order.id
        }
      })

      return resolvedRoute.href
    },
    orderTitle () {
      if (this.order.code) {
        return this.order.code
      }

      if (this.order.isPreCreated) {
        return ORDER_TITLES.PRE_CREATED
      }

      return ORDER_TITLES.PRE_REGISTERED
    }
  },
  methods: {
    formatDatetime
  }
}
