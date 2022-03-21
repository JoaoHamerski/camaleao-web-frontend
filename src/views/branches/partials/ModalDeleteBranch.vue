<script>
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { branchDelete } from '@/graphql/Branch.gql'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    branch: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      isLoading: false,
      icons: {
        faTrashAlt
      }
    }
  },
  methods: {
    async onConfirmClick () {
      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: branchDelete,
          variables: {
            id: this.branch.id
          }
        })

        this.$toast.success('Filial deletada!')
        this.$emit('success')
      } catch (error) {
        this.$toast.error('Ops! Algo deu errado, tente novamente!')
      }

      this.isLoading = false
    },
    getCityName (city) {
      if (!city) {
        return 'N/A'
      }

      if (city.state) {
        return `${city.name} - ${city.state.abbreviation}`
      }

      return city.name
    }
  }
}
</script>

<template>
  <AppModal
    id="modalDeleteBranch"
    :value="value"
    color="danger"
    centered
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faTrashAlt"
        fixed-width
      />
      Deletar filial
    </template>

    <template
      v-if="branch"
      #body
    >
      <div>
        <div class="text-center">
          <FontAwesomeIcon
            :icon="icons.faTrashAlt"
            class="text-danger"
            size="5x"
          />
          <h6 class="text-danger fw-bold mt-3">
            Você está deletando a filial:
          </h6>
        </div>

        <div>
          <h5 class="fw-bold text-center">
            {{ getCityName(branch.city) }}
          </h5>
        </div>
        <div class="mt-3">
          <div>
            <b>Transportadora:</b> {{ $helpers.fallback(branch.shipping_company, 'name') }}
          </div>

          <div class="mt-2">
            <div class="mb-2">
              <b>Cidades:</b>
            </div>
            <div v-if="branch.cities.length">
              <ul class="list-group list-group-sm">
                <li
                  v-for="city in branch.cities"
                  :key="city.id"
                  class="list-group-item"
                >
                  {{ getCityName(city) }}
                </li>
              </ul>
            </div>
            <div v-else>
              N/A
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col">
          <AppButton
            color="success"
            block
            btn-class="fw-bold"
            :loading="isLoading"
            @click.prevent="onConfirmClick"
          >
            Confirmar
          </AppButton>
        </div>
        <div class="col">
          <AppButton
            color="light"
            block
            data-bs-dismiss="modal"
          >
            Cancelar
          </AppButton>
        </div>
      </div>
    </template>
  </AppModal>
</template>
