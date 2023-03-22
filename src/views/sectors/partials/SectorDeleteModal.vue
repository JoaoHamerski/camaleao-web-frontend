<script>
import { isEmpty } from 'lodash-es'
import { faTrashAlt, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { GetSectors, DeleteSector } from '@/graphql/Sector.gql'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    sector: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      isLoading: false,
      icons: {
        faTrashAlt,
        faExclamationCircle
      }
    }
  },
  methods: {
    isEmpty,
    async onConfirmDeleteClick () {
      this.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: DeleteSector,
          variables: {
            id: this.sector.id
          },
          refetchQueries: [GetSectors],
          awaitRefetchQueries: true
        })

        this.$toast.success('Setor deletado!')
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
    id="sectorDeleteModal"
    color="danger"
    :value="value"
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faTrashAlt"
        fixed-width
      />
      Deletar setor
    </template>
    <template
      v-if="!isEmpty(sector)"
      #body
    >
      <div class="text-center text-secondary mt-3">
        Você está prestes a deletar o setor:
      </div>

      <h5 class="text-center text-danger fw-bold my-3">
        {{ sector.name }}
      </h5>

      <div class="small text-secondary">
        <FontAwesomeIcon
          :icon="icons.faExclamationCircle"
          fixed-width
        />
        Nenhum usuário ou status serão deletados.
      </div>

      <div
        v-if="!sector.users.length"
        class="fw-bold small mt-3"
      >
        Nenhum usuário relacionado a este setor
      </div>
      <div
        v-else
        class="mt-3"
      >
        <div class="fw-bold small">
          Usuários relacionados:
        </div>
        <div>
          <ul class="list-group list-group-sm">
            <li
              v-for="user in sector.users"
              :key="user.id"
              class="list-group-item"
            >
              {{ user.name }}
            </li>
          </ul>
        </div>
      </div>

      <div
        v-if="!sector.status.length"
        class="fw-bold small mt-3"
      >
        Nenhum status relacionado a este setor
      </div>
      <div
        v-else
        class="mt-3"
      >
        <div class="fw-bold small">
          Status relacionados:
        </div>
        <div>
          <ul class="list-group list-group-sm">
            <li
              v-for="status in sector.status"
              :key="status.id"
              class="list-group-item"
            >
              {{ status.text }}
            </li>
          </ul>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col">
          <AppButton
            color="success"
            block
            btn-class="fw-bold"
            :loading="isLoading"
            @click.prevent="onConfirmDeleteClick"
          >
            Confirmar
          </AppButton>
        </div>
        <div class="col">
          <AppButton
            color="light"
            block
            type="button"
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
