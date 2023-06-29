<script>
import { faEdit, faBars } from '@fortawesome/free-solid-svg-icons'
import { getOperationName } from '@apollo/client/utilities'

import GarmentItemForm from './GarmentItemForm.vue'
import Draggable from 'vuedraggable'

export default {
  components: {
    GarmentItemForm,
    Draggable
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
    },
    reorder: {
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
      faEdit,
      faBars
    },
    drag: false,
  }),
  computed: {
    isQueryLoading () {
      return this.$apollo.queries.items.loading
    },
    draggableAttrs () {
      return {
        animation: 200,
        disabled: !this.reorder,
        ghostClass: "ghost"
      }
    }
  },
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

      this.$toast.success(id ? 'Atualizado!' : 'Registrado!')

      this.$emit('cancel-new-item')
      this.isEdit = {
        id: ''
      }
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
  <div
    v-if="isQueryLoading"
    class="py-5"
  >
    <AppLoading />
  </div>
  <div v-else>
    <ul class="list-group">
      <div
        v-if="!items.length && !newItem"
        class="text-secondary small text-center my-3"
      >
        Nenhum item para exibir
      </div>

      <Draggable
        v-model="items"
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
          <li
            v-for="_item in items"
            :key="_item.id"
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <template v-if="isEdit.id === _item.id">
              <GarmentItemForm
                :item="_item"
                :item-query-name="item.queryName"
                :submit="submit"
                @cancel="onCancelEdit"
              />
            </template>
            <template v-else>
              <span>{{ _item.name }}</span>
              <FontAwesomeIcon
                v-if="reorder"
                :key="`icon__${_item.id}`"
                :icon="icons.faBars"
                class="me-3 my-2 draggable-handler"
              />
              <AppButton
                v-if="!reorder"
                btn-class="btn-sm"
                :icon="icons.faEdit"
                outlined
                @click.prevent="onEditClick(_item)"
              />
            </template>
          </li>
        </TransitionGroup>
      </Draggable>

      <li
        v-if="newItem"
        class="list-group-item"
      >
        <GarmentItemForm
          :item-query-name="item.queryName"
          :submit="submit"
          @cancel="onCancelForm"
        />
      </li>
    </ul>
  </div>
</template>
