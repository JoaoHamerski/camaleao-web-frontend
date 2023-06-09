<script>
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { GetClothSizes } from '@/graphql/ClothSize.gql'
import { form } from './ClothMatchForm.vue'
import { maskCurrencyBRL } from '@/utils/masks'

export default {
  apollo: {
    clothSizes: {
      query: GetClothSizes,
      result ({ data }) {
        const sizes = data.clothSizes.map(({ id, name }) => ({
          id,
          name,
          value: 'R$ ',
          is_shown: true
        }))

        form.sizes = [...sizes]
      }
    },
  },
  data: () => ({
    maskCurrencyBRL: maskCurrencyBRL(),
    icons: {
      faQuestionCircle
    },
    form,
    clothSizes: []
  }),
  computed: {
    isClothSizesLoading () {
      return !!this.$apollo.queries.clothSizes.loading
    }
  }
}
</script>

<template>
  <div class="position-relative">
    <div class="row small fw-bold">
      <div class="col-3">
        Tamanho
      </div>
      <div class="col-3">
        Adição de <span class="text-secondary">(opcional)</span>
      </div>
      <div class="col-2">
        Exibir
        <FontAwesomeIcon
          v-tippy
          :icon="icons.faQuestionCircle"
          class="link-primary clickable"
          fixed-width
          content="Selecione se o tamanho vai estar disponível para ser escolhido quando a combinação acima for selecionada."
        />
      </div>
    </div>

    <div
      v-if="isClothSizesLoading"
      class="py-5"
    >
      <AppLoading />
    </div>
    <template v-else>
      <div
        v-for="(size, index) in form.sizes"
        :key="size.id"
        class="row d-flex align-items-baseline"
      >
        <div class="col-3">
          <AppInput
            :id="`sizes.${index}.name`"
            disabled
            :value="size.name"
            :name="`sizes.${index}.name`"
          />
        </div>
        <div class="col-3">
          <AppInput
            :id="`sizes.${index}.value`"
            v-model="form.sizes[index].value"
            :disabled="!size.is_shown"
            :name="`sizes.${index}.value`"
            :mask="maskCurrencyBRL"
          />
        </div>
        <div class="col-2">
          <AppCheckboxSwitch
            :id="`sizes.${index}.is_shown`"
            v-model="form.sizes[index].is_shown"
          />
        </div>
      </div>
    </template>
  </div>
</template>
