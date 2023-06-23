<script>
import { GetGarmentMatches } from '@/graphql/GarmentMatch.gql'
import { faTshirt, faTrashAlt } from  '@fortawesome/free-solid-svg-icons'
import { uniqBy } from 'lodash-es'

import FormGarmentsItem from './FormGarmentsItem.vue'

export const getUniqueValues = (items, prop) => uniqBy(
  items.map(item => item[prop])
    .filter(item => item !== null),
    'id'
)

export default {
  components: {
    FormGarmentsItem
  },
  props: {
    order: {
      type: Object,
      default: () => ({})
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      required: true
    }
  },
  apollo: {
    garmentMatches: {
      query: GetGarmentMatches,
      fetchPolicy: 'no-cache',
      async result () {
        await this.$nextTick()

        if (this.isEdit) {
          this.populateForm()
        }
      }
    }
  },
  data: () => ({
    match: null,
    activeItem: 0,
    icons: {
      faTshirt,
      faTrashAlt
    },
    garmentMatches: ['empty']
  }),
  computed: {
    navItems () {
      return this.form.garments.map((item, index) => ({
        text: `ITEM ${index + 1}`,
        value: 'nav-' + item.id
      }))
    },
    isGarmentMatchesLoading () {
      return this.garmentMatches[0] === 'empty'
    },
    optionsListeners () {
      return {
        new: () => this.onNewItem(true),
        duplicate: this.onDuplicateItem,
        delete: this.onDeleteItem
      }
    }
  },
  methods: {
    populateForm() {
      const garments = this.order.garments
      const garmentsCount = garments.length

      for (const i of Array.from({length: garmentsCount - 1})) {
        this.onNewItem(false)
      }
    },
    onNewItem (focusNewItem = true) {
      this.$emit('new-garment')

      if (focusNewItem) {
        this.activeItem = this.form.garments.length - 1
      }
    },
    onNewGarmentSize (event) {
      this.$emit('new-garment-size', event)
    },
    onDeleteGarmentSize(event) {
      this.$emit('delete-garment-size', event)
    },
    onDuplicateItem (indexToClone) {
      this.$emit('duplicate-garment', {indexToClone})
      this.activeItem = this.form.garments.length - 1
    },
    onDeleteItem (index) {
      if (this.form.garments.length <= 1) {
        return
      }

      this.activeItem = index === 0
        ? index
        : index - 1

      this.$emit('delete-garment', {indexToDelete: index})
    }
  }
}
</script>

<template>
  <div class="position-relative">
    <AppContainer>
      <template #title>
        <FontAwesomeIcon
          :icon="icons.faTshirt"
          fixed-width
        />
        Roupas
      </template>
      <template #body>
        <div
          v-if="isGarmentMatchesLoading"
          class="text-center my-5"
        >
          <div
            class="spinner-grow text-primary"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <AppNavPills
          v-else-if="!isGarmentMatchesLoading && garmentMatches.length"
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
            <div :key="garment.id">
              <div>
                {{ item.text }}
                <span v-if="garment.total">
                  ({{ $helpers.toBRL(garment.total) }})
                </span>
              </div>
            </div>
          </template>

          <template
            v-for="(garment, index) in form.garments"
            #[`nav-${garment.id}`]
          >
            <FormGarmentsItem
              :key="garment.id"
              v-bind="{ index, garment, garmentMatches, optionsListeners, order, form }"
              @new-garment-size="onNewGarmentSize"
              @delete-garment-size="onDeleteGarmentSize"
            />
          </template>
        </AppNavPills>
      </template>
    </AppContainer>
  </div>
</template>
