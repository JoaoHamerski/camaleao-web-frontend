<script>
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { getOperationName } from '@apollo/client/utilities'

import ClothItemForm from './ClothItemForm.vue'

export default {
  components: {
    ClothItemForm
  },
  apollo: {
    items () {
      return {
        query: this.item.query,
        update: (data) => {
          return data[this.item.queryName]
        }
      }
    },
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    newItem: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    isEdit: {
      id: '',
    },
    items: [],
    icons: {
      faEdit
    }
  }),
  methods: {
    async submit (id = null, input) {
      const mutation = id ? this.item.updateMutation : this.item.createMutation
      const variables = id ? { id, input } : { input }

      await this.$apollo.mutate({
        mutation,
        variables,
        refetchQueries: [getOperationName(this.item.query)],
        awaitRefetchQueries: true
      })

      this.$emit('cancel-new-item')
    },
    onEditClick({ id }) {
      this.isEdit.id = id
    },
    onCancelEdit () {
      this.isEdit.id = ''
    },
    onCancelForm () {
      this.$emit('cancel-new-item')
    }
  }
}
</script>

<template>
  <div>
    <ul class="list-group">
      <div
        v-if="!items.length && !newItem"
        class="text-secondary small text-center my-3"
      >
        Nenhum item para exibir
      </div>

      <li
        v-for="_item in items"
        :key="_item.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <template v-if="isEdit.id === _item.id">
          <ClothItemForm
            :item="_item"
            :item-query-name="item.queryName"
            @cancel="onCancelEdit"
          />
        </template>
        <template v-else>
          <span>{{ _item.name }}</span>

          <AppButton
            btn-class="btn-sm"
            :icon="icons.faEdit"
            outlined
            @click.prevent="onEditClick(_item)"
          />
        </template>
      </li>

      <li
        v-if="newItem"
        class="list-group-item"
      >
        <ClothItemForm
          :item-query-name="item.queryName"
          :submit="submit"
          @cancel="onCancelForm"
        />
      </li>
    </ul>
  </div>
</template>
