<script>
import {
  faStickyNote,
  faEdit,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons'

import { noteCreate, noteUpdate } from '@/graphql/Note.gql'
import { formatDatetime } from '@/utils/formatters'
import Form from '@/utils/Form'
import { handleError } from '@/utils/forms'

export default {
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
        value: false,
        isLoading: false
      },
      editNote: {
        note: {},
        isLoading: false
      },
      form: new Form({
        text: ''
      }),
      icons: {
        faEdit,
        faStickyNote,
        faCheck,
        faTimes
      }
    }
  },
  methods: {
    formatDatetime,
    async onUpdate () {
      const { id } = this.editNote.note
      const { text } = this.form.data()

      this.editNote.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: noteUpdate,
          variables: { id, text }
        })

        this.editNote.note = {}
      } catch (error) {
        handleError(this, error)
      }

      this.editNote.isLoading = false
    },
    async onCreate () {
      const { text } = this.form.data()

      this.newNote.isLoading = true

      try {
        await this.$apollo.mutate({
          mutation: noteCreate,
          variables: {
            order_id: this.orderId,
            text
          }
        })

        this.newNote.value = false
      } catch (error) {
        handleError(this, error)
      }

      this.newNote.isLoading = false
    },
    onNewNoteClick () {
      this.form.reset()
      this.editNote.note = {}
      this.newNote.value = !this.newNote.value
    },
    onCancelNewNoteClick () {
      this.newNote.value = false
    },
    onEditClick (note) {
      this.form.reset()
      this.newNote.value = false
      this.form.text = note.text
      this.editNote.note = note
    },
    onCancelEditClick () {
      this.editNote.note = {}
    }
  }
}
</script>

<template>
  <div>
    <div class="d-flex align-items-baseline">
      <h5 class="fw-bold text-secondary">
        <FontAwesomeIcon :icon="icons.faStickyNote" />
        Anotações
      </h5>
      <div
        class="link-primary clickable small ms-2"
        @click.prevent="onNewNoteClick"
      >
        (+ NOVA NOTA)
      </div>
    </div>

    <ul
      v-if="notes.length || newNote.value"
      class="list-group list-group-flush"
    >
      <li
        v-if="newNote.value"
        class="list-group-item d-flex align-items-center"
      >
        <AppForm
          :form="form"
          :on-submit="onCreate"
          class="w-100"
        >
          <div class="d-flex">
            <div class="flex-grow-1">
              <AppInput
                v-model="form.text"
                name="text"
                placeholder="Digite a anotação..."
                :default-margin="false"
                :error="form.errors.get('text')"
              />
            </div>
            <div class="ms-2">
              <AppButton
                :loading="newNote.isLoading"
                tooltip="Registrar"
                class="me-2"
                :icon="icons.faCheck"
                color="success"
                @click.prevent="onCreate"
              />
              <AppButton
                :disabled="newNote.isLoading"
                tooltip="Cancelar"
                type="button"
                :icon="icons.faTimes"
                color="light"
                @click.prevent="onCancelNewNoteClick"
              />
            </div>
          </div>
        </AppForm>
      </li>

      <li
        v-for="note in notes"
        :key="note.id"
        class="list-group-item text-subtitle d-flex justify-content-between align-items-center"
      >
        <template v-if="editNote.note.id === note.id">
          <AppForm
            :form="form"
            :on-submit="onUpdate"
            class="w-100"
          >
            <div class="d-flex justify-content-between">
              <div class="flex-grow-1">
                <AppInput
                  v-model="form.text"
                  name="text"
                  :default-margin="false"
                />
              </div>
              <div class="ms-2">
                <AppButton
                  tooltip="Concluir"
                  :icon="icons.faCheck"
                  color="success"
                  class="me-2"
                  :loading="editNote.isLoading && editNote.note.id === note.id"
                  @click.prevent="onUpdate"
                />

                <AppButton
                  tooltip="Cancelar "
                  type="buttoon"
                  :icon="icons.faTimes"
                  color="light"
                  :disabled="editNote.isLoading && editNote.note.id === note.id"
                  @click.prevent="onCancelEditClick"
                />
              </div>
            </div>
          </AppForm>
        </template>
        <template v-else>
          <div>
            <div>
              {{ note.text }}
            </div>
            <small class="text-secondary">
              {{ formatDatetime(note.created_at, "dd/MM/y 'ás' HH:mm") }}
            </small>
          </div>
          <div>
            <AppButton
              tooltip="Editar"
              btn-class="btn-sm"
              outlined
              :icon="icons.faEdit"
              @click.prevent="onEditClick(note)"
            />
          </div>
        </template>
      </li>
    </ul>
    <div
      v-else
      class="text-secondary text-center py-3"
    >
      Nenhuma anotação registrada
    </div>
  </div>
</template>
