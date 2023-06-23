<script>
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { TYPES_ENUM } from './garment-items/garment-items-type'

export default {
  data: () => ({
    TYPES_ENUM,
    icons: {
      faFileAlt
    }
  }),
  methods: {
    onItemBtnClick (type) {
      this.$emit('open-modal-item', type)
    }
  }
}
</script>

<template>
  <AppContainer>
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faFileAlt"
        fixed-width
      />
      Itens do formulário
    </template>

    <template #body>
      <div class="row mb-3">
        <div class="col">
          <AppButton
            block
            outlined
            btn-class="fw-bold"
            @click.prevent="onItemBtnClick(TYPES_ENUM.MODELS)"
          >
            Modelos
          </AppButton>
        </div>
        <div class="col">
          <AppButton
            block
            outlined
            btn-class="fw-bold"
            @click.prevent="onItemBtnClick(TYPES_ENUM.MATERIALS)"
          >
            Materiais
          </AppButton>
        </div>
        <div class="col">
          <AppButton
            block
            outlined
            btn-class="fw-bold"
            @click.prevent="onItemBtnClick(TYPES_ENUM.NECK_TYPES)"
          >
            Tipos de gola
          </AppButton>
        </div>
        <div class="col">
          <AppButton
            block
            outlined
            btn-class="fw-bold"
            @click.prevent="onItemBtnClick(TYPES_ENUM.SLEEVE_TYPES)"
          >
            Tipos de manga
          </AppButton>
        </div>
        <div class="col">
          <AppButton
            block
            outlined
            btn-class="fw-bold"
            @click.prevent="onItemBtnClick(TYPES_ENUM.SIZES)"
          >
            Tamanhos
          </AppButton>
        </div>
      </div>
    </template>
  </AppContainer>
</template>
