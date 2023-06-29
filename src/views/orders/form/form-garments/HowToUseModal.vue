<script>
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

export default {
  data: () => ({
    icons: {
      faLightbulb
    }
  })
}
</script>

<template>
  <AppModal
    v-bind="$attrs"
    id="howToUseModal"
    modal-dialog-class="modal-dialog-centered"
    v-on="$listeners"
  >
    <template #title>
      <FontAwesomeIcon
        :icon="icons.faLightbulb"
        fixed-width
      />
      Como usar o formulário de roupas
    </template>
    <template #body>
      <div
        class="small mb-3"
        style="text-align: justify"
      >
        O formulário de roupas funciona com <b>combinações</b> de diferentes campos,
        não é possível selecionar qualquer valor para qualquer campo.
        Essas <b>combinações</b> são cadastradas pelo administrador do sistema.
      </div>

      <div>
        <h6 class="fw-bold">
          Como usar
        </h6>
        <ol class="small">
          <li>
            Selecione o campo <b>modelo</b> para iniciar.
          </li>
          <li>
            Após selecionar o <b>modelo</b>,
            os demais campos irão atualizar para exibir as possíveis opções do modelo selecionado,
            <b>as opções que não estão disponíveis irão ficar cinza</b>.
          </li>
          <li>
            Conforme você seleciona outras opções, todas os campos irão se atualizar para refletir as opções disponíveis.
          </li>
          <li>Caso apenas uma combinação seja possível, o sistema irá sugerir essa combinação para você usar e auto-preencher os campos.</li>
        </ol>
      </div>

      <div>
        <h6 class="fw-bold">
          Por que eu não é possível selecionar qualquer opção nos campos?
        </h6>
        <div class="small">
          Somente o administrador registra as opções e combinações, pois junto com elas são registrados os valores das roupas, que são automaticamente computados.
        </div>
      </div>

      <div class="text-end mt-3">
        <AppButton
          color="light"
          data-bs-dismiss="modal"
          type="button"
        >
          Fechar
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>
