<script>
import { formatDatetime } from '@/utils/formatters'
import { faTshirt, faBox, faFunnelDollar } from '@fortawesome/free-solid-svg-icons'
import roles from '@/constants/roles'

import DailyCashDetailedFlowShirts from './DailyCashDetailedFlowShirts.vue'
import DailyCashDetailedFlowEntry from './DailyCashDetailedFlowEntry.vue'
import DailyCashDetailedFlowOut from './DailyCashDetailedFlowOut.vue'
import DailyCashDetailedFlowPendencies from './DailyCashDetailedFlowPendencies.vue'

export default {
  components: {
    DailyCashDetailedFlowShirts,
    DailyCashDetailedFlowEntry,
    DailyCashDetailedFlowOut,
    DailyCashDetailedFlowPendencies
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      roles,
      icons: {
        faTshirt,
        faBox,
        faFunnelDollar
      }
    }
  },
  methods: {
    formatDatetime,
    openExpensesModal () {
      this.$emit('open-expenses-modal', this.item.date)
    }
  }
}
</script>

<template>
  <AppContainer
    collapsible
    :value="!$isMobile"
  >
    <template #title>
      <span class="text-uppercase small me-2">{{ formatDatetime(item.date, "LLLL 'de' y") }}</span>
    </template>

    <template #body>
      <div
        class="row position-relative"
        :class="{
          'row-cols-1 row-cols-sm-4': $helpers.canView(roles.GERENCIA),
          'row-cols-12': $helpers.canView(roles.ATENDIMENTO)
        }"
      >
        <template v-if="$helpers.canView(roles.GERENCIA)">
          <DailyCashDetailedFlowShirts :item="item" />
          <DailyCashDetailedFlowEntry :item="item" />
          <DailyCashDetailedFlowOut :item="item" />
        </template>

        <DailyCashDetailedFlowPendencies
          :item="item"
          @open-pendency-orders="$emit('open-pendency-orders', $event)"
        />

        <AppButton
          v-if="$helpers.canView(roles.GERENCIA)"
          class="expenses-button"
          color="danger"
          btn-class="fw-bold w-fit-content"
          outlined
          rounded
          :icon="icons.faFunnelDollar"
          tooltip="Despesas"
          :tippy-settings="{placement: 'left'}"
          @click.prevent="openExpensesModal"
        />
      </div>
    </template>
  </AppContainer>
</template>

<style lang="scss">
.expenses-button {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>

