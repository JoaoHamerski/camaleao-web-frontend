<script>
import VueLoadImage from 'vue-load-image'
import {
  faImage,
  faTshirt,
  faDollarSign,
  faHandHoldingUsd,
  faDotCircle,
  faCalendarAlt,
  faTruck,
  faUserAlt
} from '@fortawesome/free-solid-svg-icons'
import { formatDatetime } from '@/utils/formatters'

export default {
  components: {
    VueLoadImage
  },
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      icons: {
        faImage,
        faTshirt,
        faDollarSign,
        faHandHoldingUsd,
        faDotCircle,
        faCalendarAlt,
        faTruck,
        faUserAlt
      }
    }
  },
  computed: {
    isPreRegistered () {
      return this.order.states.includes('PRE-REGISTERED')
    },
    orderImage () {
      if (!this.order.art_paths) {
        return null
      }

      return this.order.art_paths[0]
    },
    clientUrl () {
      return this.$helpers.getUrl('clients.show', {
        client: this.order.client.id
      })
    },
    orderUrl () {
      if (this.isPreRegistered) {
        return this.$helpers.getUrl('orders.showPreRegistered', {
          order: this.order.id
        })
      }

      return this.$helpers.getUrl('orders.show', {
        client: this.order.client.id,
        order: this.order.id
      })
    },
  },
  methods: {
    formatDatetime,
  }
}
</script>
<template>
  <div class="card card-sm mb-2">
    <div
      class="card-header fw-bold text-white clickable position-relative"
      :class="isPreRegistered ? 'bg-link-warning' : 'bg-link-primary'"
    >
      <a
        target="_blank"
        :href="orderUrl"
        class="stretched-link"
      />
      {{ order.code }}
    </div>
    <div class="card-body p-0">
      <VueLoadImage v-if="orderImage">
        <img
          slot="image"
          class="img-fluid"
          :src="orderImage"
          alt="Imagem da arte"
        >
        <div
          slot="preloader"
          class="position-relative py-5"
        >
          <AppLoading />
        </div>
      </VueLoadImage>
      <div
        v-else
        class="text-center img-thumbnail py-3 rounded-0"
      >
        <FontAwesomeIcon
          :icon="icons.faImage"
          size="3x"
          class="text-secondary"
        />
        <div class="fw-bold text-secondary">
          SEM IMAGEM
        </div>
      </div>
    </div>
    <div class="card-body p-0">
      <ul class="list-group list-group-flush list-group-sm">
        <li
          v-if="order.client"
          class="list-group-item fw-bold"
        >
          <FontAwesomeIcon
            :icon="icons.faUserAlt"
            fixed-width
          />
          <a
            :href="clientUrl"
            target="_blank"
            class="text-decoration-none"
          >{{ order.client.name }}</a>
        </li>

        <li
          v-if="order.quantity !== null"
          class="list-group-item fw-bold"
        >
          <FontAwesomeIcon
            :icon="icons.faTshirt"
            fixed-width
          />
          {{ $helpers.plural(order.quantity, 'f', 'CAMISA', null, true) }}
        </li>

        <li
          v-if="order.price !== null"
          v-tippy
          class="list-group-item fw-bold text-success"
          content="Valor total"
        >
          <FontAwesomeIcon
            :icon="icons.faDollarSign"
            fixed-width
          />
          {{ $helpers.toBRL(order.price) }}
        </li>

        <li
          v-if="order.total_owing !== null"
          v-tippy
          content="Pendente"
          class="list-group-item fw-bold text-danger"
        >
          <FontAwesomeIcon
            :icon="icons.faHandHoldingUsd"
            fixed-width
          />
          {{ $helpers.toBRL(order.total_owing) }}
        </li>

        <li
          v-if="order.status"
          class="list-group-item fw-bold"
        >
          <span
            :class="order.status.is_available ? 'text-success' : 'text-warning'"
          >
            <FontAwesomeIcon
              :icon="icons.faDotCircle"
              fixed-width
            />
            {{ order.status.text }}
          </span>
        </li>

        <li
          v-if="order.print_date"
          v-tippy
          class="list-group-item fw-bold"
          content="Data de estampa"
        >
          <span class="text-nowrap">
            <FontAwesomeIcon
              :icon="icons.faCalendarAlt"
              fixed-width
            />
            <FontAwesomeIcon
              :icon="icons.faTshirt"
              fixed-width
            />
            {{ formatDatetime(order.print_date) }}
          </span>
        </li>

        <li
          v-if="order.delivery_date"
          v-tippy
          content="Data de entrega"
          class="list-group-item fw-bold"
        >
          <span class="text-nowrap">
            <FontAwesomeIcon
              :icon="icons.faCalendarAlt"
              fixed-width
            />
            <FontAwesomeIcon
              :icon="icons.faTruck"
              fixed-width
            />
            {{ formatDatetime(order.delivery_date) }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
