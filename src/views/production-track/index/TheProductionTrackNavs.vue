<script>
import { GetAuthUserSectors } from '@/graphql/OrderControl.gql'
import { map, isEmpty } from 'lodash-es'
import { faTshirt, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons'

import roles from '@/constants/roles'

export default {
  apollo: {
    authUserSectors: {
      query: GetAuthUserSectors,
      result () {
        const firstSector = this.authUserSectors[0].sector

        this.$emit('sectors-loaded', map(
          this.authUserSectors,
          ({sector, next_status}) => ({...sector, next_status})
        ))

        if (isEmpty(this.selectedSector)) {
          this.selectedSector = firstSector
        }
      }
    }
  },
  data () {
    return {
      roles,
      icons: {
        faHandHoldingUsd,
        faTshirt
      },
      authUserSectors: [],
      selectedSector: {}
    }
  },
  computed: {
    isLoading () {
      return !!this.$apollo.queries.authUserSectors.loading
    }
  },
  watch: {
    selectedSector (value) {
      this.$emit('sector-change', value)
    }
  },
  methods: {
    isSectorActive (sector) {
      return sector.id === this.selectedSector.id
    },
    onSectorClick (sector) {
      this.selectedSector = sector
    },
  }
}
</script>

<template>
  <div>
    <AppLoading v-show="isLoading" />
    <div>
      <ul
        v-if="authUserSectors.length"
        class="nav nav-pills nav-fill flex-nowrap"
        :class="{
          'table-responsive': $isMobile
        }"
      >
        <li
          v-for="sector in authUserSectors"
          :key="sector.sector.id"
          class="nav-item small"
        >
          <a
            class="nav-link"
            :class="{
              'active fw-bold': isSectorActive(sector.sector),
              'bg-white': !isSectorActive(sector.sector),
              'text-nowrap': $isMobile
            }"
            href="#"
            @click.prevent="onSectorClick(sector.sector)"
          >
            {{ sector.sector.name }}

            <span
              class="badge"
              :class="{
                'bg-light text-dark': isSectorActive(sector.sector),
                'bg-primary': !isSectorActive(sector.sector)
              }"
            >{{ sector.orders_count }}</span>
          </a>

          <div
            v-if="$helpers.canView(roles.GERENCIA)"
            class="d-flex flex-column bg-white justify-content-between"
          >
            <span class="fw-bold text-primary text-nowrap mt-2">
              <FontAwesomeIcon :icon="icons.faTshirt" />
              {{ sector.quantity_count }}
            </span>
            <span class="fw-bold text-success text-nowrap mb-2">
              <FontAwesomeIcon :icon="icons.faHandHoldingUsd" />
              {{ $helpers.toBRL(sector.pendency_total) }}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
