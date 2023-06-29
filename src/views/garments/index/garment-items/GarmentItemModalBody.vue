<script>
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { ReorderGarmentOption } from '@/graphql/Garment.gql'

import GarmentItemModalItems from './GarmentItemModalItems.vue'
import { snakeCase } from 'lodash-es'

export default {
  components: {
    GarmentItemModalItems
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    icons: {
      faPlus,
    },
    newItem: false,
    reorder: false,
    isLoading: false,
  }),
  methods: {
    onNewItemClick () {
      this.newItem = !this.newItem
    },
    onCancelNewItem () {
      this.newItem = false
    },
    async onReorderConcluded () {
      this.isLoading = true

      const items = this.$refs.garmentItemModalItems.items.map((item, index) => ({
        id: item.id,
        order: index
      }))

      const option = snakeCase(this.item.queryName.substring(0, this.item.queryName.length - 1))

      const input = {
        option: option.toUpperCase(),
        items
      }

      try {
        await this.$apollo.mutate({
          mutation: ReorderGarmentOption,
          variables: { input }
        })

        this.$toast.success('Itens reordenados!')
        this.reorder = false
      } catch (error) {
        this.$toast.error('Ops! Algo deu errado.')
      }

      this.isLoading = false
    }
  }
}
</script>

<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <AppButton
        outlined
        color="success"
        btn-class="fw-bold"
        :icon="icons.faPlus"
        @click.prevent="onNewItemClick"
      >
        Novo item
      </AppButton>
      <AppCheckboxSwitch
        id="reordeing"
        v-model="reorder"
      >
        Reordenar
      </AppCheckboxSwitch>
    </div>

    <GarmentItemModalItems
      ref="garmentItemModalItems"
      class="my-3"
      :item="item"
      :new-item="newItem"
      :reorder="reorder"
      @cancel-new-item="onCancelNewItem"
    />

    <div class="d-flex justify-content-between text-end">
      <div>
        <AppButton
          v-if="reorder"
          color="success"
          btn-class="fw-bold"
          :loading="isLoading"
          @click.prevent="onReorderConcluded"
        >
          Concluir reordenação
        </AppButton>
      </div>
      <div>
        <AppButton
          color="light"
          data-bs-dismiss="modal"
          :disabled="isLoading"
        >
          Fechar
        </AppButton>
      </div>
    </div>
  </div>
</template>
