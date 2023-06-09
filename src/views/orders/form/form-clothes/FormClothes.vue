<script>
import { GetClothMatches } from '@/graphql/ClothMatch.gql'
import { faTshirt, faTrashAlt } from  '@fortawesome/free-solid-svg-icons'
import { uniqueId, cloneDeep, uniq, map } from 'lodash-es'

import FormClothesIndNames from './FormClothesIndNames.vue';
import FormClothesNoIndNames from './FormClothesNoIndNames.vue'
import FormClothesOptions from './FormClothesOptions.vue';

import { form, DEFAULT_CLOTH } from '../OrderForm.vue'

export const getUniqueValues = (items, property) => {
  const plucked = items.map(item => item[property])
  const filtered = plucked.filter(item => item !== null)

  return uniq(filtered)
}

export default {
  components: {
    FormClothesIndNames,
    FormClothesNoIndNames,
    FormClothesOptions
  },
  apollo: {
    clothMatches: {
      query: GetClothMatches
    }
  },
  data: () => ({
    form,
    icons: {
      faTshirt,
      faTrashAlt
    },
    clothMatches: []
  }),
  computed: {
    models () {
      return getUniqueValues(this.clothMatches, 'model')
    },
    materials () {
      return getUniqueValues(this.clothMatches, 'material')
    },
    neckTypes () {
      return getUniqueValues(this.clothMatches, 'neck_type')
    },
    sleeveTypes () {
      return getUniqueValues(this.clothMatches, 'sleeve_type')
    },
    isClothMatchesLoading () {
      return !!this.$apollo.queries.clothMatches.loading
    }
  },
  methods: {
    toggleClothItem (index, value) {
      if (index < 0) {
        return
      }

      this.form.clothes[index].open = value
    },
    onNewItem (index) {
      this.toggleClothItem(index, false)

      this.form.clothes.push({
        ...cloneDeep(DEFAULT_CLOTH),
        id: uniqueId(),
        open: true
      })
    },
    onDuplicateItem (index) {
      const duplicate = cloneDeep(this.form.clothes[index])
      this.toggleClothItem(index, false)

      this.form.clothes.push({
        ...duplicate,
        id: uniqueId(),
        open: true
      })
    },
    onDeleteItem (index) {
      this.toggleClothItem(index - 1, true)

      if (this.form.clothes.length <= 1) {
        return
      }

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
        <template v-for="(cloth, index) in form.clothes">
          <div
            :key="cloth.id"
            class="mb-2"
          >
            <AppContainer
              v-model="form.clothes[index].open"
              :color="form.clothes[index].open ? 'primary' : 'secondary'"
              collapsible
            >
              <template #title>
                <small>
                  ITEM {{ index + 1 }}
                </small>
              </template>

              <template #body>
                <FormClothesOptions
                  class="mb-3"
                  v-bind="{ index, models, materials, neckTypes, sleeveTypes, clothMatches }"
                  @new="onNewItem"
                  @duplicate="onDuplicateItem"
                  @delete="onDeleteItem"
                />

                <AppContainer color="secondary">
                  <template #title>
                    <small>
                      Nomes
                      {{ form.clothes[index].individual_names ? '(individuais)' : '' }}
                    </small>
                  </template>

                  <template #body>
                    <FormClothesIndNames
                      v-if="form.clothes[index].individual_names"
                      :cloth-index="index"
                    />

                    <FormClothesNoIndNames
                      v-else
                      :cloth-index="index"
                    />
                  </template>
                </AppContainer>
              </template>
            </AppContainer>
          </div>
        </template>
      </template>
    </AppContainer>
  </div>
</template>
