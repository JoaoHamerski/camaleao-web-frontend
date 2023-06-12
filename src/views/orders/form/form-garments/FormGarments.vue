<script>
import { GetGarmentMatches } from '@/graphql/GarmentMatch.gql'
import { faTshirt, faTrashAlt } from  '@fortawesome/free-solid-svg-icons'
import { uniqBy, uniqueId, cloneDeep, omit } from 'lodash-es'

import { form, DEFAULT_GARMENT } from '../OrderForm.vue'
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
  apollo: {
    garmentMatches: {
      query: GetGarmentMatches,
      fetchPolicy: 'no-cache'
    }
  },
  data: () => ({
    form,
    match: null,
    activeItem: 0,
    icons: {
      faTshirt,
      faTrashAlt
    },
    garmentMatches: []
  }),
  computed: {
    navItems () {
      return this.form.garments.map((item, index) => ({
        text: `ITEM ${index + 1}`,
        value: 'nav-' + item.id
      }))
    },
    isClothMatchesLoading () {
      return !!this.$apollo.queries.garmentMatches.loading
    },
    optionsListeners () {
      return {
        new: this.onNewItem,
        duplicate: this.onDuplicateItem,
        delete: this.onDeleteItem
      }
    }
  },
  methods: {
    onNewItem () {
      this.form.garments.push({
        ...cloneDeep(DEFAULT_GARMENT),
        id: uniqueId()
      })

      this.activeItem = this.form.garments.length - 1
    },
    onDuplicateItem (indexToClone) {
      const duplicate = cloneDeep(this.form.garments[indexToClone])
      const newIndex = this.form.garments.length

      this.onNewItem()

      this.$nextTick(() => {
        Object.assign(this.form.garments[newIndex], omit(duplicate, ['id']))
      })
    },
    onDeleteItem (index) {
      if (this.form.garments.length <= 1) {
        return
      }

      this.activeItem = index === 0
        ? index
        : index - 1

      this.form.garments.splice(index, 1)
    }
  }
}
</script>

<template>
  <div class="position-relative">
    <AppLoading v-if="isClothMatchesLoading" />
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
            v-for="cloth in form.garments"
            #[`headers.nav-${cloth.id}`]="{ item }"
          >
            <div :key="cloth.id">
              <div>
                {{ item.text }}
                <span v-if="cloth.total">
                  ({{ $helpers.toBRL(cloth.total) }})
                </span>
              </div>
            </div>
          </template>

          <template
            v-for="(cloth, index) in form.garments"
            #[`nav-${cloth.id}`]
          >
            <FormGarmentsItem
              :key="cloth.id"
              v-bind="{ index, cloth, garmentMatches, optionsListeners }"
            />
          </template>
        </AppNavPills>
      </template>
    </AppContainer>
  </div>
</template>
