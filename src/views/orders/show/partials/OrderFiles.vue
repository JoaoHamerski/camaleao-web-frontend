<script>
import { faFileImage } from '@fortawesome/free-solid-svg-icons'
import { keys, isEmpty } from 'lodash-es'
import OrderFilesItems from './OrderFilesItems.vue'

const FILES_MAP = {
  art_paths: 'Imagens da arte',
  size_paths: 'Imagens do tamanho',
  payment_voucher_paths: 'Comprovantes de pagamento'
}

export default {
  components: {
    OrderFilesItems
  },
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      FILES_MAP,
      icons: {
        faFileImage
      }
    }
  },
  computed: {
    filesCount () {
      const fields = keys(FILES_MAP)

      return fields.reduce((total, field) => {
        const length = !isEmpty(this.order[field])
          ? this.order[field].length
          : 0

        return length + total
      }, 0)
    }
  }
}
</script>

<template>
  <AppContainer
    id="files"
    header-class="text-secondary"
    collapsible
    :value="!filesCount"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faFileImage"
        fixed-width
      />
      <span class="me-2">Anexos</span>
      <small
        v-if="filesCount"
        class="badge rounded-pill bg-light text-dark "
      >{{ filesCount }}</small>
    </template>

    <template #body>
      <div v-if="filesCount">
        <OrderFilesItems
          :order="order"
          :files-map="FILES_MAP"
        />
      </div>
      <div v-else>
        <div class="text-center text-secondary py-3">
          Nenhum anexo registrado
        </div>
      </div>
    </template>
  </AppContainer>
</template>
