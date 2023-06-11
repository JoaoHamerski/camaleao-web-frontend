<script>
import { GetClothMatches } from '@/graphql/ClothMatch.gql'
import { faTshirt, faTrashAlt } from  '@fortawesome/free-solid-svg-icons'
import { uniq, uniqueId, cloneDeep, omit } from 'lodash-es'

import { form, DEFAULT_CLOTH } from '../OrderForm.vue'
import FormClothItem from './FormClothItem.vue'

export const getUniqueValues = (items, prop) => uniq(
  items.map(item => item[prop])
    .filter(item => item !== null)
)

export default {
  components: {
    FormClothItem
  },
  apollo: {
    clothMatches: {
      query: GetClothMatches
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
    clothMatches: []
  }),
  computed: {
    navItems () {
      return this.form.clothes.map((item, index) => ({
        text: `ITEM ${index + 1}`,
        value: 'nav-' + item.id
      }))
    },
    isClothMatchesLoading () {
      return !!this.$apollo.queries.clothMatches.loading
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
      this.form.clothes.push({
        ...cloneDeep(DEFAULT_CLOTH),
        id: uniqueId()
      })

      this.activeItem = this.form.clothes.length - 1
    },
    onDuplicateItem (indexToClone) {
      const duplicate = cloneDeep(this.form.clothes[indexToClone])
      const newIndex = this.form.clothes.length

      this.onNewItem()

      this.$nextTick(() => {
        Object.assign(this.form.clothes[newIndex], omit(duplicate, ['id']))
      })
    },
    onDeleteItem (index) {
      if (this.form.clothes.length <= 1) {
        return
      }

      this.activeItem = index === 0
        ? index
        : index - 1

      this.form.clothes.splice(index, 1)
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
            v-for="cloth in form.clothes"
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
            v-for="(cloth, index) in form.clothes"
            #[`nav-${cloth.id}`]
          >
            <FormClothItem
              :key="cloth.id"
              v-bind="{ index, cloth, clothMatches, optionsListeners }"
            />
          </template>
        </AppNavPills>
      </template>
    </AppContainer>
  </div>
</template>
