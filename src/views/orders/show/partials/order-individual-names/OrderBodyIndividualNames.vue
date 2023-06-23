<script>
import { faSpellCheck } from '@fortawesome/free-solid-svg-icons';
import OrderBodyIndividualNamesTBody from './OrderBodyIndividualNamesTBody.vue'

export default {
  components: {
    OrderBodyIndividualNamesTBody
  },
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    icons: {
      faSpellCheck
    }
  }),
  computed: {
    garmentsWithNames () {
      return this.order.garments.filter(garment => garment.individual_names)
    }
  },
}
</script>

<template>
  <AppContainer collapsible>
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faSpellCheck"
        fixed-width
      />
      Nomes nas roupas
    </template>
    <template #body>
      <table class="table table-bordered table-sm">
        <thead>
          <tr class="table-primary">
            <th>Nome</th>
            <th>Tamanho</th>
            <th>Número</th>
          </tr>
        </thead>

        <OrderBodyIndividualNamesTBody
          :garments="order.garments"
        />
      </table>
    </template>
  </AppContainer>
</template>
