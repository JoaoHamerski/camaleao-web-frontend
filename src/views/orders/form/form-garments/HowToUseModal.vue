<script>
import { faLightbulb, faCaretRight } from '@fortawesome/free-solid-svg-icons';

export default {
  data: () => ({
    collapse1: false,
    icons: {
      faLightbulb,
      faCaretRight
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
        <h6 class="fw-bold text-primary">
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
          <li>Quando você selecionar uma combinação que exista e seja válida, os campos irão ficar verdes, e a seção para escolher os tamanhos irá aparecer.</li>
          <li>Se os campos não estiverem verdes, é porque nenhuma combinação válida ou que exista foi selecionada, você pode conferir as combinações clicando em <b>Combinações</b>.</li>
        </ol>
      </div>

      <AppCollapsible
        :value="false"
        hide-arrow
        class="mb-3"
      >
        <template #header>
          <h6 class="fw-bold link-primary">
            <FontAwesomeIcon
              :icon="icons.faCaretRight"
              fixed-width
            />
            Para que serve o botão Reset?
          </h6>
        </template>
        <template #body>
          <div
            class="small"
            style="text-align: justify;"
          >
            Conforme descrito no item 3 acima, em <b>Como usar</b>,
            conforme você seleciona as opções,
            todos campos são atualizados,
            e as opções que não fazem parte de uma possível combinação ficam cinzas (indisponíveis),
            caso queira voltar elas ao normal, você pode usar a opção <b>Resetar</b>.
          </div>
        </template>
      </AppCollapsible>

      <AppCollapsible
        :value="false"
        hide-arrow
      >
        <template #header>
          <h6
            class="fw-bold link-primary"
          >
            <FontAwesomeIcon
              :icon="icons.faCaretRight"
              fixed-width
            />
            Por que eu não é possível selecionar qualquer opção nos campos?
          </h6>
        </template>
        <template #body>
          <div
            class="small"
            style="text-align: justify;"
          >
            Somente o administrador registra as opções e combinações, pois junto com elas são registrados os valores das roupas, que são automaticamente computados.
          </div>
        </template>
      </AppCollapsible>

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
