<script>
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { GetGarmentSizes } from '@/graphql/GarmentSize.gql'
import { maskCurrencyBRL } from '@/utils/masks'
import { isEmpty } from 'lodash-es'

export default {
  apollo: {
    garmentSizes: {
      query: GetGarmentSizes,
      result ({ data }) {
        const sizes = data.garmentSizes.map(({ id, name }) => ({
          id,
          name,
          value: 'R$ ',
          is_shown: true
        }))

        this.form.set({
          sizes: [...sizes]
        })

        if (!isEmpty(this.match)) {
          this.populateForm()
        }
      }
    },
  },
  props: {
    form: {
      type: Object,
      required: true
    },
    match: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    garmentSizes: [],
    maskCurrencyBRL: maskCurrencyBRL(),
    icons: {
      faQuestionCircle
    },
  }),
  computed: {
    isGarmentSizesLoading () {
      return !!this.$apollo.loading
    }
  },
  methods: {
    populateForm () {
      const sizes = this.match.sizes
      const sizesIds = this.match.sizes.map(({id}) => id)

      this.form.sizes.forEach(size => {
        const value = sizes.find(({ id }) => id === size.id)?.pivot?.value

        Object.assign(size, {
          value: value ? this.$helpers.toBRL(value) : 'R$ ',
          is_shown: sizesIds.includes(size.id)
        })
      })
    }
  }
}
</script>

<template>
  <div class="position-relative">
    <div class="small text-secondary mb-2">
      Escolha como os tamanhos irão aparecer quando essa combinação for selecionada
    </div>
    <div class="row small fw-bold">
      <div class="col-4 col-md-3">
        Tamanho
      </div>
      <div class="col-4 col-md-3">
        Adição de <span class="text-secondary">(opcional)</span>
      </div>
      <div class="col-4 col-md-2">
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
      v-if="isGarmentSizesLoading"
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
        <div class="col-4 col-md-3">
          <AppInput
            :id="`sizes.${index}.name`"
            disabled
            :value="size.name"
            :name="`sizes.${index}.name`"
          />
        </div>
        <div class="col-4 col-md-3">
          <AppInput
            :id="`sizes.${index}.value`"
            :value="form.sizes[index].value"
            :disabled="!size.is_shown"
            :name="`sizes.${index}.value`"
            :mask="maskCurrencyBRL"
            @input="form.set({
              [`sizes.${index}.value`]: $event
            })"
          />
        </div>
        <div class="col-4 col-md-2">
          <AppCheckboxSwitch
            :id="`sizes.${index}.is_shown`"
            :value="form.sizes[index].is_shown"
            @input="form.set({
              [`sizes.${index}.is_shown`]: $event
            })"
          />
        </div>
      </div>
    </template>
  </div>
</template>
