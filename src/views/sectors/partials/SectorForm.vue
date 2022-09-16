<script>
import Form from '@/utils/Form'
import { handleSuccess, handleError } from '@/utils/forms'
import { map } from 'lodash-es'

import { GetStatus } from '@/graphql/Status.gql'
import { GetUsers } from '@/graphql/User.gql'
import { GetSectors, CreateSector, UpdateSector } from '@/graphql/Sector.gql'
import { GetAuthUserSectors, GetOrdersBySector } from '@/graphql/OrderControl.gql'

const NUMBER_OF_QUERIES = 3

export default {
  apollo: {
    sectors: {
      query: GetSectors,
      result () {
        this.loadingQueries--
      }
    },
    status: {
      query: GetStatus,
      result () {
        this.loadingQueries--
      }
    },
    users: {
      query: GetUsers,
      result () {
        this.loadingQueries--
      }
    }
  },
  props: {
    isEdit: {
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
      status: [],
      users: [],
      sectors: [],
      loadingQueries: NUMBER_OF_QUERIES,
      isLoading: false,
      form: new Form({
        name: '',
        users: [],
        status: []
      })
    }
  },
  watch: {
    loadingQueries: {
      immediate: true,
      handler (value) {
        if (!value && this.isEdit) {
          this.populateForm()
        }
      }
    }
  },
  methods: {
    populateForm() {
      const usersIds = map(this.sector.users, 'id')
      const statusIds = map(this.sector.status, 'id')

      this.form.name = this.sector.name
      this.form.users = this.users.filter(user => usersIds.includes(user.id))
      this.form.status = this.status.filter(status => statusIds.includes(status.id))
    },
    getFormattedForm(data) {
      data.users = data.users.map(user => user.id)
      data.status = data.status.map(status => status.id)

      return data
    },
    async create (input) {
      try {
        await this.$apollo.mutate({
          mutation: CreateSector,
          variables: { input },
          refetchQueries: [
            GetSectors,
            GetStatus,
            GetAuthUserSectors,
            GetOrdersBySector
          ],
          awaitRefetchQueries: true
        })

        handleSuccess(this, { message: 'Setor cadastrado!' })
      } catch (error) {
        handleError(this, error)
      }
    },
    async update(input) {
      try {
        await this.$apollo.mutate({
          mutation: UpdateSector,
          variables: {
            id: this.sector.id,
            input
          },
          refetchQueries: [
            GetSectors,
            GetStatus,
            GetAuthUserSectors,
            GetOrdersBySector
          ],
          awaitRefetchQueries: true
        })

        handleSuccess(this, { message: 'Setor atualizado!' })
      } catch (error) {
        handleError(this, error)
      }
    },
    async submit() {
      const data = this.getFormattedForm(this.form.data())

      this.isLoading = true

      if (this.isEdit) {
        await this.update(data)
      } else {
        await this.create(data)
      }

      this.isLoading = false
    },
    statusSelectLabel (status) {
      if (status.sector) {
        return `${status.text} [${status.sector.name}]`
      }

      return status.text
    },
    usersSelectLabel (user) {
      return user.name
    }
  }
}
</script>
<template>
  <AppForm
    :on-submit="submit"
    :form="form"
  >
    <AppLoading v-show="loadingQueries" />
    <AppInput
      id="name"
      v-model="form.name"
      name="name"
      placeholder="Digite um nome para o setor..."
      :error="form.errors.get('name')"
    >
      Nome do setor
    </AppInput>

    <AppSelect
      id="status"
      v-model="form.status"
      track-by="id"
      name="status"
      placeholder="Selecione os status do setor"
      :options="status"
      :custom-label="statusSelectLabel"
      multiple
      :close-on-select="false"
      :error="form.errors.get('status')"
    >
      Status do setor
      <template #hint>
        <div>Caso o status selecionado já esteja em outro setor, ele será removido.</div>
      </template>
    </AppSelect>

    <AppSelect
      id="users"
      v-model="form.users"
      track-by="id"
      name="users"
      placeholder="Selecione os usuários do setor"
      :options="users"
      :custom-label="usersSelectLabel"
      multiple
      :close-on-select="false"
      :error="form.errors.get('users')"
    >
      Usuários do setor
    </AppSelect>

    <div class="mt-4 d-flex justify-content-between">
      <AppButton
        :loading="isLoading"
        color="success"
        btn-class="fw-bold"
        type="submit"
      >
        {{ isEdit ? 'Atualizar' : 'Cadastrar' }}
      </AppButton>

      <AppButton
        color="light"
        data-bs-dismiss="modal"
        type="button"
      >
        Fechar
      </AppButton>
    </div>
  </AppForm>
</template>
