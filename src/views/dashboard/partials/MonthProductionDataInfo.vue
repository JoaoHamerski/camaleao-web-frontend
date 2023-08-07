<script>
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

export default {
  data: () => ({
    icons: {
      faExclamationCircle
    },
    displayInfo: false
  }),
  methods: {
    toggleInfo () {
      this.displayInfo = !this.displayInfo
    }
  }
}
</script>

<template>
  <div class="extra-small">
    <div
      class="link-primary clickable"
      @click.prevent="toggleInfo"
    >
      <FontAwesomeIcon
        :icon="icons.faExclamationCircle"
        fixed-width
      />
      {{ !displayInfo ? 'Ver informações' : 'Esconder informações' }} sobre os dados
    </div>

    <ul
      v-show="displayInfo"
      class="text-secondary"
    >
      <li>
        <b>Estampados e Costurados</b>: Pedidos que foram marcados com os respectivos status no período indicado, independente de quando foram cadastrados.
      </li>
      <li><b>Produção do mês</b>: Pedidos que foram marcados com o status no <b>Disponível para retirada</b> no período indicado.</li>
      <li><b>Pedidos atrasados</b>: Pedidos com status <b>Disponível para retirada</b> com a <b>Data de entrega</b> anterior a hoje.</li>
      <li><b>Aguardando retirada</b>: Pedidos com status <b>Disponível para retirada</b> porém que não possuem o status <b>Entregue</b> desde o início.</li>
    </ul>
  </div>
</template>
