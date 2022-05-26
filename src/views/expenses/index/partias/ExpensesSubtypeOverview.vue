<script>
import { faCalendarAlt, faFunnelDollar } from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    expensesTypesTotal: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      icons: {
        faCalendarAlt,
        faFunnelDollar
      }
    }
  }
}
</script>
<template>
  <!-- eslint-disable vue/no-v-html -->
  <div>
    <AppContainer
      color="danger"
      :collapsible="$isMobile"
    >
      <template #title>
        <FontAwesomeIcon
          :icon="icons.faCalendarAlt"
          fixed-width
        />
        {{ title }}
      </template>
      <template #body>
        <div
          class="position-relative"
          :class="loading && 'py-4'"
        >
          <AppLoading v-if="loading" />
          <template v-else-if="expensesTypesTotal.subtypes.length">
            <div class="row">
              <div
                v-for="type in expensesTypesTotal.subtypes"
                :key="type.name"
                class="col-12 col-sm-3 mb-2"
              >
                <div class="text-subtitle fw-bold">
                  <FontAwesomeIcon
                    :icon="icons.faFunnelDollar"
                    fixed-width
                    class="text-danger"
                  />
                  {{ type.name }}
                </div>
                <div
                  class="text-danger"
                  v-html="$helpers.toBRL(-type.expense, true)"
                />
              </div>
            </div>
            <div>
              <div class="text-subtitle fw-bold">
                TOTAL
              </div>
              <h5
                class="fw-bold text-danger"
              >
                {{ $helpers.toBRL(-expensesTypesTotal.total) }}
              </h5>
            </div>
          </template>
          <div
            v-else
            class="text-center text-subtitle text-secondary my-4"
          >
            Nenhuma despesa neste mês
          </div>
        </div>
      </template>
    </AppContainer>
  </div>
</template>
