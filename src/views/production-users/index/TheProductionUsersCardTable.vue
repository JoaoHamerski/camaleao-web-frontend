<script>
import roles from '@/constants/roles'
import { faMinus, faQuestionCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { formatDatetime } from '@/utils/formatters'
import { TippyComponent } from 'vue-tippy'
import { orders } from '@/constants/route-names'
import CommissionDetails from '@/views/production/partials/CommissionDetails.vue'
import CommissionModal from '../partials/CommissionModal.vue'

export default {
  components: {
    Tippy: TippyComponent,
    CommissionDetails,
    CommissionModal
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      roles,
      orders,
      commissionModal: {
        item: {},
        value: false
      },
      icons: {
        faMinus,
        faQuestionCircle,
        faExclamationCircle
      }
    }
  },
  computed: {
    headers () {
      return [
        { text: 'Usuário', value: 'user' },
        { text: 'Pedido', value: 'order' },
        { text: 'Comissão', value: 'commission_value', format: 'currencyBRL' },
        { text: 'Confirmação', value: 'confirmed_at', align: 'center' }
      ]
    }
  },
  methods: {
    formatDatetime,
    onCommissionInfoClick(event, item) {
      if (!this.$isMobile || (+item.role.id === roles.ESTAMPA)) {
        return
      }

      if (this.$isMobile && (+item.role.id === roles.COSTURA)) {
        event.stopPropagation()
      }

      this.commissionModal.value = true
      this.commissionModal.item = item
    },
    onCommissionModalHidden () {
      this.commissionModal.item = {}
    },
    orderUrl (clientKey, orderKey) {
      const resolvedRoute = this.$router.resolve({
        name: 'orders.show',
        params: {
          clientKey,
          orderKey
        }
      })

      return resolvedRoute.href
    }
  }
}
</script>

<template>
  <div>
    <CommissionModal
      v-model="commissionModal.value"
      :commission="commissionModal.item"
      @hidden="onCommissionModalHidden"
    />

    <AppTable
      :row-class="() => 'align-middle'"
      :headers="headers"
      :items="items"
    >
      <template #[`items.user`]="{ item }">
        {{ item.user.name }}
        <div>
          <small class="text-secondary">
            ({{ item.role.name }})
          </small>
        </div>
      </template>
      <template #[`items.order`]="{ item }">
        <div>
          <a
            class="text-decoration-none fw-bold"
            :href="$helpers.getUrl(orders.show, {
              client: item.commission.order.client,
              order: item.commission.order
            })"
            target="_blank"
          >{{ item.commission.order.code }}</a>
        </div>
        <small class="text-secondary">
          (cadastro: {{ formatDatetime(item.commission.order.created_at) }})
        </small>
      </template>
      <template #[`items.commission_value`]="{ item }">
        <div class="d-flex">
          <div class="col">
            {{ $helpers.toBRL(item.commission_value) }}
          </div>
          <div class="col ms-2 ms-sm-0">
            <FontAwesomeIcon
              :name="`tippy__${item.id}`"
              :icon="icons.faExclamationCircle"
              class="link-primary clickable"
              fixed-width
              @click="onCommissionInfoClick($event, item)"
            />
            <Tippy
              :for="`tippy__${item.id}`"
              max-width="500"
              theme="light-border no-padding"
              trigger="click"
              placement="left"
              :interactive="true"
            >
              <CommissionDetails
                :commission="item.commission"
                :role="item.role"
              />
            </Tippy>
          </div>
        </div>
      </template>
      <template #[`items.confirmed_at`]="{ item }">
        <div
          v-if="item.confirmed_at"
          class="fw-bold text-success"
        >
          {{ formatDatetime(item.confirmed_at, "dd/MM 'às' HH:mm") }}
        </div>
        <div v-else>
          <div class="fw-bold text-warning">
            <FontAwesomeIcon :icon="icons.faMinus" />
          </div>
          <div
            v-if="item.was_quantity_changed"
            class="text-secondary"
          >
            <small>(reaprovação necessária)</small>
            <FontAwesomeIcon
              v-tippy
              fixed-width
              class="text-primary"
              :icon="icons.faQuestionCircle"
              content="A produção confirmou o pedido, porém alterações foram feitas após isso, por isso é necessário ser reaprovado."
            />
          </div>
        </div>
      </template>
    </AppTable>
  </div>
</template>
