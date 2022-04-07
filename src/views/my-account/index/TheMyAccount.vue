<script>
import {
  faUser,
  faUserCircle,
  faTrashAlt,
  faEdit
} from '@fortawesome/free-solid-svg-icons'
import { formatDatetime } from '@/utils/formatters'

import ModalEditAccount from '../partials/ModalEditAccount.vue'
import ModalDeleteAccount from '../partials/ModalDeleteAccount.vue'

export default {
  metaInfo: {
    title () {
      return 'Minha conta'
    }
  },
  components: {
    ModalEditAccount,
    ModalDeleteAccount
  },
  data () {
    return {
      modalEditAccount: false,
      modalDeleteAccount: false,
      icons: {
        faUser,
        faUserCircle,
        faTrashAlt,
        faEdit
      }
    }
  },
  computed: {
    authUser () {
      return this.$store.getters['auth/authUser']
    }
  },
  methods: {
    formatDatetime,
    onEditAccountClick () {
      this.modalEditAccount = true
    },
    async onEditAccountSuccess () {
      this.modalEditAccount = false
      await this.$store.dispatch('auth/getAuthUser')
    },
    onDeleteAccountClick () {
      this.modalDeleteAccount = true
    },
    onDeleteAccountSuccess () {
      this.modalDeleteAccount = false
      this.$nextTick(async () => {
        await this.$store.dispatch('auth/logout')
      })
    }
  }
}
</script>

<template>
  <div class="py-5">
    <div class="col col-sm-6 mx-auto">
      <AppCard>
        <template #header>
          <h6 class="fw-bold mb-0">
            <FontAwesomeIcon :icon="icons.faUser" />
            Minha conta
          </h6>
        </template>

        <template #body>
          <ModalEditAccount
            v-model="modalEditAccount"
            :auth-user="authUser"
            @success="onEditAccountSuccess"
          />

          <ModalDeleteAccount
            v-model="modalDeleteAccount"
            :auth-user="authUser"
            @success="onDeleteAccountSuccess"
          />

          <div class="text-center mb-3">
            <FontAwesomeIcon
              :icon="icons.faUserCircle"
              size="5x"
              class="text-primary"
            />
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <b>Nome: </b> {{ authUser.name }}
            </li>
            <li class="list-group-item">
              <b>E-mail: </b> {{ authUser.email }}
            </li>
            <li class="list-group-item">
              <b>Nível de usuário: </b> {{ authUser.role.name }}
            </li>
            <li class="list-group-item">
              <b>Senha: </b> *****
            </li>
            <li class="list-group-item">
              <b>Criada em:</b> {{ formatDatetime(authUser.created_at) }}
            </li>
          </ul>

          <div class="mt-3">
            <AppButton
              block
              outlined
              btn-class="fw-bold"
              :icon="icons.faEdit"
              @click.prevent="onEditAccountClick"
            >
              Editar dados
            </AppButton>
          </div>
          <div class="text-end text-subtitle mt-2">
            <span
              class="link-danger clickable"
              @click.prevent="onDeleteAccountClick"
            >
              <FontAwesomeIcon :icon="icons.faTrashAlt" />
              Deletar conta
            </span>
          </div>
        </template>
      </AppCard>
    </div>
  </div>
</template>
