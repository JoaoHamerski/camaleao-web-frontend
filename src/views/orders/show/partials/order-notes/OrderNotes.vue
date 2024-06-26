<script>
import { faStickyNote } from '@fortawesome/free-solid-svg-icons'

import { DeleteNote } from '@/graphql/Note.gql'
import { formatDatetime } from '@/utils/formatters'
import Form from '@/utils/Form'
import OrderNotesForm from './OrderNotesForm.vue'
import OrderNotesActionButtons from './OrderNotesActionButtons.vue'

export default {
  components: {
    OrderNotesForm,
    OrderNotesActionButtons
  },
  props: {
    orderId: {
      type: String,
      default: ''
    },
    notes: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      newNote: {
        value: false
      },
      editNote: {
        note: {}
      },
      deleteNote: {
        note: {},
        isLoading: false
      },
      form: new Form({
        text: ''
      }),
      icons: {
        faStickyNote
      }
    }
  },
  methods: {
    formatDatetime,
    async onDelete () {
      const { id } = this.deleteNote.note
      this.deleteNote.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: DeleteNote,
          variables: { id }
        })

        this.$helpers.clearCacheFrom({ id, __typename: 'Note' })
        this.$toast.success('Anotação deletada!')
      } catch (error) {
        this.$toast.error('Ops! Algo deu errado, tente novamente!')
      }

      this.deleteNote.note = {}
      this.deleteNote.isLoading = false
    },
    onNewNoteClick () {
      this.form.reset()
      this.editNote.note = {}
      this.newNote.value = !this.newNote.value
    },
    onEditNote (note) {
      this.form.reset()
      this.newNote.value = false
      this.form.text = note.text
      this.editNote.note = note
    },
    dismissNewNote () {
      this.newNote.value = false
    },
    dismissEditNote () {
      this.editNote.note = {}
    },
    onDeleteNote (note) {
      this.deleteNote.note = note
    },
    onConfirmDelete () {
      this.onDelete()
    },
    onCancelDelete () {
      this.deleteNote.note = {}
    }
  }
}
</script>

<template>
  <AppContainer>
    <template #title>
      <FontAwesomeIcon :icon="icons.faStickyNote" />
      Anotações
      <span
        class="link-white clickable small ms-2"
        @click.prevent="onNewNoteClick"
      >
        (+ NOVA NOTA)
      </span>
    </template>

    <template #body>
      <ul
        v-if="notes.length || newNote.value"
        class="list-group list-group-flush"
      >
        <li
          v-if="newNote.value"
          class="list-group-item d-flex align-items-center"
        >
          <OrderNotesForm
            :order-id="orderId"
            @cancel="dismissNewNote"
            @success="dismissNewNote"
          />
        </li>
        <li
          v-for="note in notes"
          :key="note.id"
          class="list-group-item text-subtitle"
        >
          <template v-if="editNote.note.id === note.id">
            <OrderNotesForm
              :is-edit="true"
              :order-id="orderId"
              :note="editNote.note"
              @cancel="dismissEditNote"
              @success="dismissEditNote"
            />
          </template>
          <div
            v-else
            class="d-flex flex-column "
          >
            <div class="d-flex justify-content-between mb-2">
              <div>
                {{ note.text }}
              </div>
              <div class="text-secondary small">
                {{ formatDatetime(note.created_at, "dd/MM/y 'ás' HH:mm") }}
              </div>
            </div>
            <OrderNotesActionButtons
              v-bind="{note, deleteNote}"
              @edit="onEditNote"
              @delete="onDeleteNote"
              @cancel-delete="onCancelDelete"
              @confirm-delete="onConfirmDelete"
            />
          </div>
        </li>
      </ul>
      <div
        v-else
        class="text-secondary text-center py-3"
      >
        Nenhuma anotação registrada
      </div>
    </template>
  </AppContainer>
</template>
