<script>
import { faTruck, faPlus } from '@fortawesome/free-solid-svg-icons'
import { shippingCompanyCreate } from '@/graphql/ShippingCompany.gql'
import { handleError } from '@/utils/forms'
import Form from '@/utils/Form'

import ModalShippingCompaniesTable from './ModalShippingCompaniesTable'
import ModalShippingCompaniesDelete from './ModalShippingCompaniesDelete'

export default {
  components: {
    ModalShippingCompaniesTable,
    ModalShippingCompaniesDelete
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    shippingCompanies: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isLoadingNewCompany: false,
      newCompany: false,
      companyToDelete: null,
      form: new Form({
        name: ''
      }),
      icons: {
        faTruck,
        faPlus
      }
    }
  },
  methods: {
    setCompaniesDefaultEditState () {
      for (const company of this.shippingCompanies) {
        company.isEdit = false
      }
    },
    onNewCompanyClick () {
      this.newCompany = true
      this.$nextTick(() => {
        this.$refs.newShippingCompanyInput.focusInput()
      })
    },
    onCancelNewCompanyClick () {
      this.newCompany = false
    },
    onDeleteSuccess () {
      this.companyToDelete = null
    },
    onDeleteCancel () {
      this.companyToDelete = null
    },
    onAction ({ action, item }) {
      if (action === 'delete') {
        this.setCompaniesDefaultEditState()
        this.companyToDelete = item
      }
    },
    async onSubmit () {
      const data = this.form.data()

      this.isLoadingNewCompany = true

      try {
        await this.$apollo.mutate({
          mutation: shippingCompanyCreate,
          variables: {
            name: data.name
          }
        })

        this.$toast.success('Transportadora registrada!')
        this.form.reset()
      } catch (error) {
        handleError(this, error)
      }

      this.isLoadingNewCompany = false
    }
  }
}
</script>

<template>
  <AppModal
    id="modalShippingCompanies"
    :value="value"
    centered
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faTruck"
        fixed-width
      />
      Transportadoras
    </template>

    <template #body>
      <AppLoading v-show="isLoading" />
      <AppTransition
        enter="fadeIn"
        mode="out-in"
        speed="faster"
      >
        <div
          v-if="companyToDelete"
          key="deleteTemplate"
        >
          <ModalShippingCompaniesDelete
            :company="companyToDelete"
            @success="onDeleteSuccess"
            @cancel="onDeleteCancel"
          />
        </div>
        <div
          v-else
          key="modalTemplate"
        >
          <div class="mb-3">
            <AppButton
              :icon="icons.faPlus"
              btn-class="fw-bold btn-sm"
              color="success"
              @click.prevent="onNewCompanyClick"
            >
              Nova transportadora
            </AppButton>
          </div>

          <ModalShippingCompaniesTable
            :items="shippingCompanies"
            :set-companies-default-edit-state="setCompaniesDefaultEditState"
            @action="onAction"
          />

          <div class="mt-3">
            <div v-if="newCompany">
              <AppForm
                :form="form"
                :on-submit="onSubmit"
              >
                <AppInput
                  ref="newShippingCompanyInput"
                  v-model="form.name"
                  name="name"
                  placeholder="Nome da nova transportadora..."
                  :error="form.errors.get('name')"
                />
              </AppForm>
            </div>

            <div
              class="d-flex "
              :class="newCompany ? 'justify-content-between' : 'justify-content-end'"
            >
              <div v-if="newCompany">
                <AppButton
                  class="me-2"
                  btn-class="fw-bold"
                  color="success"
                  :loading="isLoadingNewCompany"
                  @click.prevent="onSubmit"
                >
                  Salvar
                </AppButton>
                <AppButton
                  color="light"
                  @click.prevent="onCancelNewCompanyClick"
                >
                  Cancelar
                </AppButton>
              </div>

              <AppButton
                data-bs-dismiss="modal"
                color="light"
              >
                Fechar
              </AppButton>
            </div>
          </div>
        </div>
      </AppTransition>
    </template>
  </AppModal>
</template>
