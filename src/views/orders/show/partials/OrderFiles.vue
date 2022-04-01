<script>
import { faFileImage } from '@fortawesome/free-solid-svg-icons'
import { keys, isEmpty } from 'lodash-es'

const FILES_MAP = {
  art_paths: 'Imagens da arte',
  size_paths: 'Imagens do tamanho',
  payment_voucher_paths: 'Comprovantes de pagamento'
}

export default {
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
        <div
          v-for="(label, key) in FILES_MAP"
          :key="key"
        >
          <div
            v-if="order[key]"
            class="mb-3"
          >
            <div class="text-subtitle fw-bold text-secondary mb-1">
              {{ label }}
            </div>
            <div v-if="order[key].length">
              <AppViewerItems
                :alt="label"
                :files="order[key]"
              />
            </div>
            <div
              v-else
              class="text-center text-secondary py-4"
            >
              Nenhum anexo registrado
            </div>
          </div>
          <div v-else>
            <div class="texse me dissesset-secondary mb-1">
              &bull; {{ label }}
            </div>
            <div class="small text-center text-secondary py-5">
              Nenhum anexo registrado
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="text-center text-secondary py-3">
          Nenhum anexo registrado
        </div>
      </div>
    </template>
  </AppContainer>
</template>
