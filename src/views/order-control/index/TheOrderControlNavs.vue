<script>
import { GetAuthUserSectors } from '@/graphql/OrderControl.gql'
import { map } from 'lodash-es'

export default {
  apollo: {
    authUserSectors: {
      query: GetAuthUserSectors,
      result () {
        const firstSector = this.authUserSectors[0].sector

        this.$emit('sectors-loaded', map(this.authUserSectors, 'sector'))

        if (firstSector) {
          this.selectedSector = firstSector
        }
      }
    }
  },
  data () {
    return {
      authUserSectors: [],
      selectedSector: {}
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
          class="nav-item"
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
        </li>
      </ul>
    </div>
  </div>
</template>
