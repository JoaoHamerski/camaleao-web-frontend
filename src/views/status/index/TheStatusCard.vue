<script>
import { GetStatus } from '@/graphql/Status.gql'

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { ReorderStatus } from '@/graphql/Status.gql'

import TheStatusCardItem from './TheStatusCardItem.vue'
import ModalStatusEdit from '../partials/ModalStatusEdit.vue'
import ModalStatusDelete from '../partials/ModalStatusDelete.vue'
import Draggable from 'vuedraggable'

export default {
  components: {
    TheStatusCardItem,
    ModalStatusEdit,
    ModalStatusDelete,
    Draggable
  },
  apollo: {
    status: {
      query: GetStatus
    }
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      reorder: false,
      drag: false,
      status: [],
      isReorderLoading: false,
      modalEdit: {
        value: false,
        status: null
      },
      modalDelete: {
        value: false,
        status: null
      },
      icons: {
        faCheckCircle
      }
    }
  },
  computed: {
    isQueryLoading () {
      return !!this.$apollo.queries.status.loading
    },
    draggableAttrs () {
      return {
        status: [],
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      }
    }
  },
  methods: {
    async onSaveReorderClick () {
      const input = this.status.map((status, index) => ({
        id: status.id,
        order: index
      }))

      this.isReorderLoading = true

      try {
        await this.$apollo.mutate({
          mutation: ReorderStatus,
          variables: { input },
          refetchQueries: [GetStatus]
        })

        this.$toast.success('Reorenação aplicada!')
        this.reorder = false
      } catch (error) {
        this.$toast.error('Ops! Algo deu errado.')
      }

      this.isReorderLoading = false
    },
    onStatusDelete(status) {
      this.modalDelete.status = status
      this.modalDelete.value = true
    },
    onStatusEdit(status) {
      this.modalEdit.status = status
      this.modalEdit.value = true
    },
    onStatusEditSuccess () {
      this.modalEdit.value = false
      this.modalEdit.status = null
    },
    onStatusDeleteSuccess () {
      this.modalDelete.value = false
      this.modalDelete.status = null
    },
    onReorder(value) {
      if (!value) {
        this.$apollo.queries.status.refetch()
      }
    }
  }
}
</script>
<template>
  <div class="position-relative">
    <ModalStatusEdit
      v-model="modalEdit.value"
      :status="modalEdit.status"
      @success="onStatusEditSuccess"
    />

    <ModalStatusDelete
      v-model="modalDelete.value"
      :status="modalDelete.status"
      :status-list="status"
      @success="onStatusDeleteSuccess"
    />

    <AppLoading v-show="isQueryLoading" />

    <AppCard
      class="position-relative"
      color="camaleao"
      :has-body-padding="false"
    >
      <template #header>
        <h6 class="mb-0 fw-bold">
          <FontAwesomeIcon
            :icon="icons.faCheckCircle"
            fixed-width
          />
          Gerenciamento de status
        </h6>
      </template>
      <template #body>
        <AppLoading v-show="isLoading" />

        <div class="mx-3 mb-2 d-flex flex-column">
          <div class="d-flex">
            <AppCheckboxSwitch
              id="reorder"
              v-model="reorder"
              class="me-2"
              @input="onReorder"
            >
              <span class="fw-bold">Reordenar</span>
            </AppCheckboxSwitch>
            <AppButton
              v-if="reorder"
              btn-class="btn-sm fw-bold"
              color="success"
              :loading="isReorderLoading"
              @click.prevent="onSaveReorderClick"
            >
              Salvar
            </AppButton>
          </div>
          <div
            v-show="reorder"
            class="small text-secondary "
          >
            Use o botão <b>sincronizar</b> após concluir a reordenação.
          </div>
        </div>

        <ul class="list-group list-group-flush">
          <template v-if="status.length">
            <Draggable
              v-model="status"
              v-bind="draggableAttrs"
              handle=".draggable-handler"
              @start="drag = true"
              @end="drag = false"
            >
              <TransitionGroup
                tag="div"
                type="transition"
                :name="drag ? 'flip-list' : null"
              >
                <TheStatusCardItem
                  v-for="_status in status"
                  :key="_status.id"
                  :status="_status"
                  :reorder="reorder"
                  @edit="onStatusEdit"
                  @delete="onStatusDelete"
                />
              </TransitionGroup>
            </Draggable>
          </template>
          <div
            v-else
            class="text-center text-secondary py-5"
          >
            Nenhum status registrado
          </div>
        </ul>
      </template>
    </AppCard>
  </div>
</template>
