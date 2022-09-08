<script>
import { faUserTag, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import { GetSectors } from '@/graphql/Sector.gql'

import SectorEditModal from '../partials/SectorEditModal.vue'
import SectorDeleteModal from '../partials/SectorDeleteModal.vue'

export default {
  apollo: {
    sectors: {
      query: GetSectors
    }
  },
  components: {
    SectorEditModal,
    SectorDeleteModal
  },
  data () {
    return {
      sectors: [],
      sectorDeleteModal: {
        value: false,
        sector: {}
      },
      sectorEditModal: {
        value: false,
        sector: {}
      },
      icons: {
        faUserTag,
        faEdit,
        faTrashAlt
      }
    }
  },
  computed: {
    isQueryLoading () {
      return !!this.$apollo.queries.sectors.loading
    },
    headers () {
      return [
        { text: 'Setor', value: 'name' },
        { text: 'Usuários', value: 'users' },
        { text: 'Status', value: 'status' },
        { text: 'Ações', value: 'actions', align: 'center' }
      ]
    }
  },
  methods: {
    onEditSectorClick (sector) {
      this.sectorEditModal.sector = sector
      this.sectorEditModal.value = true
    },
    onEditSuccess () {
      this.sectorEditModal.value = false
    },
    onEditModalClose () {
      this.sectorEditModal.sector = {}
    },
    onDeleteSectorClick (sector) {
      this.sectorDeleteModal.sector = sector
      this.sectorDeleteModal.value = true
    },
    onDeleteSuccess () {
      this.sectorDeleteModal.value = false
    },
    onDeleteModalClose () {
      this.sectorDeleteModal.sector = {}
    },
  },
}
</script>

<template>
  <AppCard color="camaleao">
    <template #header>
      <h6 class="fw-bold mb-0">
        <FontAwesomeIcon
          :icon="icons.faUserTag"
          fixed-width
        /> Setores
      </h6>
    </template>

    <template #body>
      <AppLoading v-show="isQueryLoading" />

      <SectorEditModal
        v-model="sectorEditModal.value"
        :sector="sectorEditModal.sector"
        @success="onEditSuccess"
        @hidden="onEditModalClose"
      />

      <SectorDeleteModal
        v-model="sectorDeleteModal.value"
        :sector="sectorDeleteModal.sector"
        @success="onDeleteSuccess"
        @hidden="onDeleteModalClose"
      />

      <AppTable
        :headers="headers"
        :items="sectors"
      >
        <template #[`items.users`]="{ item }">
          <div
            v-if="!item.users.length"
            class="d-flex justify-content-center small text-secondary"
          >
            Nenhum usuário neste setor
          </div>
          <ul
            v-else
            class="list-group list-group-sm"
          >
            <li
              v-for="user in item.users"
              :key="user.id"
              class="list-group-item"
            >
              <div>{{ user.name }}</div>
              <div class="small text-secondary">
                <span
                  v-for="sector in user.sectors"
                  :key="sector.id"
                  class="badge bg-primary mx-1"
                >
                  <template v-if="item.id !== sector.id">
                    {{ sector.name }}
                  </template>
                </span>
              </div>
            </li>
          </ul>
        </template>

        <template #[`items.status`]="{ item }">
          <div
            v-if="!item.status.length"
            class="d-flex justify-content-center small text-secondary"
          >
            Nenhum status neste setor
          </div>
          <ul
            v-else
            class="list-group list-group-sm"
          >
            <li
              v-for="status in item.status"
              :key="status.id"
              class="list-group-item"
            >
              {{ status.text }}
            </li>
          </ul>
        </template>

        <template #[`items.actions`]="{ item }">
          <AppButton
            :icon="icons.faEdit"
            outlined
            class="me-2"
            tooltip="Editar"
            @click.prevent="onEditSectorClick(item)"
          />
          <AppButton
            color="danger"
            :icon="icons.faTrashAlt"
            outlined
            tooltip="Deletar"
            @click.prevent="onDeleteSectorClick(item)"
          />
        </template>
      </AppTable>
    </template>
  </AppCard>
</template>
