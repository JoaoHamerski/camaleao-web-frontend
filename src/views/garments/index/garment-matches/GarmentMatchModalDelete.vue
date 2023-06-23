<script>
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { map, pickBy } from 'lodash-es';
import { DeleteGarmentMatch } from '@/graphql/GarmentMatch.gql'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    match: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    isLoading: false,
    icons: {
      faTrashAlt
    }
  }),
  computed: {
    matchJoined () {
      const fields = ['model', 'material', 'neck_type', 'sleeve_type']
      const filled = pickBy(this.match, (item, key) => fields.includes(key) && !!item)
      const names = map(filled, ({ name }) => name)

      return names.join(' + ')
    }
  },
  methods: {
    async onDeleteClick () {
      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: DeleteGarmentMatch,
          variables: {
            id: this.match.id
          },
          refetchQueries: ['GetGarmentMatches'],
          awaitRefetchQueries: true
        })

        this.$emit('success')
      } catch (error) {
        this.$toast.error('Ops! Algo deu errado.')
      }

      this.isLoading = false
    }
  }
}
</script>

<template>
  <AppModal
    id="garmentMatchModalEdit"
    v-bind="$attrs"
    :value="value"
    color="danger"
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faTrashAlt"
        fixed-width
      />
      Deletar combinação
    </template>
    <template #body>
      <h5 class="text-center fw-bold mb-4">
        Você tem certeza?
      </h5>

      <div
        v-if="value"
        class="text-center"
      >
        {{ matchJoined }}
      </div>

      <div class="text-secondary mb-5 text-center small">
        Isso não afeta nenhum pedido que use esta combinação
      </div>

      <div class="row">
        <div class="col">
          <AppButton
            color="success"
            block
            btn-class="fw-bold"
            :loading="isLoading"
            @click.prevent="onDeleteClick"
          >
            Confirmar
          </AppButton>
        </div>
        <div class="col">
          <AppButton
            color="light"
            block
            data-bs-dismiss="modal"
            :disabled="isLoading"
          >
            Cancelar
          </AppButton>
        </div>
      </div>
    </template>
  </AppModal>
</template>
