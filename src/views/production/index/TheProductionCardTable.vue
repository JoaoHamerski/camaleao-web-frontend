<script>
import roles from '@/constants/roles'
import {
  faExclamationCircle,
  faClipboardCheck,
  faFileImage,
  faCheck
} from '@fortawesome/free-solid-svg-icons'
import { formatDatetime } from '@/utils/formatters'
import { TippyComponent } from 'vue-tippy'
import { ConfirmCommissionProduction } from '@/graphql/Production.gql'

import CommissionDetails from '../partials/CommissionDetails.vue'
import CommissionModal from '@/views/production-users/partials/CommissionModal.vue'

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
      loadingId: '',
      commissionModal: {
        value: false,
        item: {}
      },
      icons: {
        faExclamationCircle,
        faClipboardCheck,
        faFileImage,
        faCheck
      }
    }
  },
  computed: {
    headers () {
      return [
        { text: 'Cód. Pedido', value: 'code' },
        { text: 'Peças', value: 'quantity' },
        { text: 'Comissão', value: 'commission' },
        { text: 'Cadastro em', value: 'created_at', align: 'center' },
        { text: 'Imagem', value: 'image', align: 'center' },
        { text: 'confirmation', value: 'confirmation', align: 'center' }
      ]
    }
  },
  methods: {
    formatDatetime,
    onCommissionInfoClick(event, item) {
      const { role } = item.pivot

      if (!this.$isMobile || (+role.id === roles.ESTAMPA)) {
        return
      }

      if (this.$isMobile && (+role.id === roles.COSTURA)) {
        event.stopPropagation()
      }

      this.commissionModal.item = {
        commission: item,
        role
      }
      this.commissionModal.value = true
    },
    hasImages ({ order: { art_paths, size_paths } }) {
      if (!art_paths || !size_paths) {
        return false
      }

      const images = [...art_paths, ...size_paths]

      return !!images.length
    },
    showImages ({ order: { art_paths, size_paths } }) {
      this.$viewerApi({
        images: [...art_paths, ...size_paths]
      })
    },
    async confirmProduction ({ id }) {
      this.loadingId = id

      try {
        await this.$apollo.mutate({
          mutation: ConfirmCommissionProduction,
          variables: {
            id
          }
        })

        this.$toast.success('Comissão confirmada!')
      } catch (error) {
        this.$toast.error('Ops! Algo deu errado, tente novamente!')
      }

      this.loadingId = ''
    },
    rowClass (item) {
      const classes = []
      if (item.pivot.was_quantity_changed) {
        classes.push('table-warning')
      }

      if (item.pivot.confirmed_at) {
        classes.push('table-success')
      }

      classes.push('align-middle')

      return classes.join(' ')
    }
  }
}
</script>

<template>
  <div>
    <CommissionModal
      v-model="commissionModal.value"
      :commission="commissionModal.item"
    />

    <AppTable
      :row-class="rowClass"
      :items="items"
      :headers="headers"
    >
      <template #[`items.code`]="{ item }">
        {{ item.order.code }}
      </template>

      <template #[`items.quantity`]="{ item }">
        {{ item.order.quantity }}
      </template>

      <template #[`items.commission`]="{ item }">
        <div class="d-flex">
          <div class="col">
            {{ $helpers.toBRL(item.pivot.commission_value) }}
          </div>

          <div class="col-1 col-sm-6 me-3 me-sm-auto">
            <FontAwesomeIcon
              :icon="icons.faExclamationCircle"
              :name="`detailsTriggerFor${item.id}`"
              fixed-width
              class="link-primary clickable"
              size="lg"
              @click="onCommissionInfoClick($event, item)"
            />

            <Tippy
              theme="no-padding light-border"
              trigger="click"
              :to="`detailsTriggerFor${item.id}`"
              placement="right"
              max-width="500"
              :interactive="true"
            >
              <CommissionDetails :commission="item" />
            </Tippy>
          </div>
        </div>
      </template>

      <template #[`items.created_at`]="{ item }">
        <div>{{ formatDatetime(item.order.created_at, "dd/MM 'às' HH:mm") }}</div>
        <div
          v-if="item.pivot.was_quantity_changed"
          class="small text-secondary"
        >
          (última alteração: {{ formatDatetime(item.order.updated_at, "dd/MM 'às' HH:mm") }})
        </div>
      </template>

      <template #[`items.image`]="{ item }">
        <AppButton
          btn-class="btn-sm"
          outlined
          :icon="icons.faFileImage"
          :tooltip="hasImages(item) ? 'Imagem do pedido' : 'Pedido sem imagens'"
          :color="hasImages(item) ? 'primary' : 'secondary'"
          :disabled="!hasImages(item)"
          @click.prevent="showImages(item)"
        />
      </template>

      <template #[`headers.confirmation`]>
        <FontAwesomeIcon
          :icon="icons.faClipboardCheck"
          size="lg"
        />
      </template>
      <template #[`items.confirmation`]="{ item }">
        <template v-if="!item.pivot.confirmed_at">
          <AppButton
            v-tippy
            content="Confirmar produção"
            color="success"
            :icon="icons.faCheck"
            btn-class="btn-sm"
            outlined
            :loading="loadingId === item.id"
            @click.prevent="confirmProduction(item)"
          />
        </template>
        <template v-else>
          <div>
            <FontAwesomeIcon
              class="text-success"
              :icon="icons.faCheck"
            />
          </div>
          <div class="text-secondary small">
            ({{ formatDatetime(item.pivot.confirmed_at, "dd/MM 'às' HH:mm") }})
          </div>
        </template>
      </template>
    </AppTable>
  </div>
</template>
