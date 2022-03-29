<script>
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { DeleteShippingCompany } from '@/graphql/ShippingCompany.gql'
import { handleSuccess } from '@/utils/forms'

export default {
  props: {
    company: {
      type: Object,
      default: () => ({})
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
          mutation: DeleteShippingCompany,
          variables: {
            id: this.company.id
          }
        })

        this.$helpers.clearCacheFrom({ id: this.company.id, __typename: 'ShippingCompany' })

        handleSuccess(this, { message: 'Transportadora deletada!' })
      } catch (error) {
        this.$toast.error('Ops! Algo deu errado, tente novamente.')
      }

      this.isLoading = false
    },
    onCancelClick () {
      this.$emit('cancel')
    }
  }
}
</script>

<template>
  <div>
    <div class="text-center">
      <FontAwesomeIcon
        :icon="icons.faTrashAlt"
        size="5x"
        class="text-danger"
      />
      <h6 class="text-danger fw-bold mt-3">
        Você está deletando a transportadora:
      </h6>
    </div>

    <h5 class="fw-bold text-center my-4">
      {{ company.name }}
    </h5>

    <div>
      <div class="">
        Ao deletar a transportadora você terá que:
      </div>
      <ul class="text-subtitle">
        <li>Atualizar as filiais da transportadora.</li>
        <li>Atualizar os clientes registrados nessa transportadora.</li>
      </ul>
    </div>

    <div class="row mt-4">
      <div class="col">
        <AppButton
          color="success"
          btn-class="fw-bold"
          block
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
          @click.prevent="onCancelClick"
        >
          Cancelar
        </AppButton>
      </div>
    </div>
  </div>
</template>
