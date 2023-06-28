<script>
import { faTshirt } from '@fortawesome/free-solid-svg-icons';

import FormGarmentItem from './FormGarmentItem.vue'

export default {
  components: {
    FormGarmentItem
  },
  props: {
    form: {
      type: Object,
      required: true
    },
    order: {
      type: Object,
      default: () => ({})
    },
    garmentMatches: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    activeItem: 0,
    icons: {
      faTshirt
    }
  }),
  computed: {
    navItems () {
      return this.form.garments.map((item, index) => ({
        text: `ITEM ${index + 1}`,
        value: 'nav-' + item.id
      }))
    }
  },
  methods: {
    onNewGarment () {
      this.$emit('new-garment')
      this.activeItem = this.form.garments.length - 1
    },
    onDuplicateGarment (event) {
      this.$emit('duplicate-garment', event)
      this.activeItem = this.form.garments.length - 1
    },
    onDeleteGarment (event) {
      this.$emit('delete-garment', event)
      this.activeItem = this.activeItem === 0
        ? 0
        : this.activeItem - 1
    },
    onNewGarmentSize (event) {
      this.$emit('new-garment-size', event)
    },
    onDeleteGarmentSize (event) {
      this.$emit('delete-garment-size', event)
    }
  }
}
</script>

<template>
  <AppContainer>
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faTshirt"
        fixed-width
      />
      Roupas
    </template>
    <template #body>
      <AppNavPills
        v-model="activeItem"
        :items="navItems"
        no-fill
        tabs-style
        header-class="small"
      >
        <template
          v-for="garment in form.garments"
          #[`headers.nav-${garment.id}`]="{ item }"
        >
          <div
            :key="garment.id"
            :class="{
              'text-success': garment.total
            }"
          >
            {{ item.text }}
            <template v-if="garment.total">
              ({{ $helpers.toBRL(garment.total) }})
            </template>
          </div>
        </template>

        <template
          v-for="(garment, index) in form.garments"
          #[`nav-${garment.id}`]
        >
          <FormGarmentItem
            :key="garment.id"
            v-bind="{ garment, index, garmentMatches, order, form }"
            @new-garment="onNewGarment"
            @duplicate-garment="onDuplicateGarment"
            @delete-garment="onDeleteGarment"
            @new-garment-size="onNewGarmentSize"
            @delete-garment-size="onDeleteGarmentSize"
          />
        </template>
      </AppNavPills>
    </template>
  </AppContainer>
</template>
