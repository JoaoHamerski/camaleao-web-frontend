<script>
import {
  faTshirt,
  faPlus,
  faEye,
  faEyeSlash,
  faEdit,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons'
import { GetClothingTypes, UpdateClothingType } from '@/graphql/ClothingType.gql'

export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    clothingTypes: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      loadingId: '',
      icons: {
        faTshirt,
        faPlus,
        faEye,
        faEyeSlash,
        faEdit,
        faExclamationCircle
      }
    }
  },
  methods: {
    async toggleIsHidden (clothingType) {
      this.loadingId = clothingType.id

      try {
        await this.$apollo.mutate({
          mutation: UpdateClothingType,
          variables: {
            id: clothingType.id,
            input: {
              is_hidden: !clothingType.is_hidden
            }
          },
          refetchQueries: [{ query: GetClothingTypes, variables: { is_hidden: false } }],
          awaitRefetchQueries: true
        })

        if (clothingType.is_hidden) {
          this.$toast.success(`${clothingType.name} agora está sendo exibido.`)
        } else {
          this.$toast.success(`${clothingType.name} agora está oculto.`)
        }
      } catch (error) {
        this.$toast.error('Ops! Algo deu errado, tente novamente.')
      }

      this.loadingId = ''
    },
    onActionClick (clothingType, action) {
      this.$emit('action', { clothingType, action })
    }
  }
}
</script>

<template>
  <AppCard color="camaleao">
    <template #header>
      <h6 class="fw-bold mb-0">
        <FontAwesomeIcon
          :icon="icons.faTshirt"
          fixed-width
        />
        Gerenciamento de tipos de roupas
      </h6>
    </template>

    <template #body>
      <AppLoading v-show="isLoading" />

      <div class="text-center mb-4">
        <FontAwesomeIcon
          :icon="icons.faExclamationCircle"
          class="text-primary"
          size="2x"
        />

        <div class="text-subtitle text-secondary mt-2">
          Gerencie os tipos de camisas presentes no sistema
          <br>
          Você pode ocultar tipos que não devem mais ser preenchidos no momento do cadastrado de pedidos.
        </div>
      </div>

      <div>
        <ul class="list-group">
          <li
            v-for="type in clothingTypes"
            :key="type.id"
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <div>
                {{ type.name }}
              </div>
              <div class="text-subtitle text-secondary">
                Comissão: <b>{{ $helpers.toBRL(type.commission) }}</b>
              </div>
            </div>
            <div>
              <div class="row flex-sm-row flex-column mb-2">
                <div class="col mb-2 mb-sm-0">
                  <AppButton
                    v-tippy
                    :icon="type.is_hidden ? icons.faEyeSlash : icons.faEye"
                    outlined
                    btn-class="btn-sm px-4"
                    :content="type.is_hidden ? 'Exibir' : 'Ocultar'"
                    :loading="loadingId === type.id"
                    @click.prevent="toggleIsHidden(type)"
                  />
                </div>
                <div class="col">
                  <AppButton
                    v-tippy
                    :icon="icons.faEdit"
                    color="success"
                    btn-class="btn-sm px-4"
                    content="Editar"
                    @click.prevent="onActionClick(type, 'edit')"
                  />
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </AppCard>
</template>
