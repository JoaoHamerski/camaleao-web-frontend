<script>
import { faTshirt } from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      icons: {
        faTshirt
      }
    }
  }
}
</script>

<template>
  <table class="table table-sm">
    <thead>
      <tr class="small">
        <th colspan="4">
          <FontAwesomeIcon
            :icon="icons.faTshirt"
            fixed-width
          />
          Pedidos com peças:
        </th>
      </tr>
      <tr class="small">
        <th class="table-primary">
          Intervalo
        </th>
        <th>
          <span
            v-tippy
            content="Quantidade de PEDIDOS que estão no INTERVALO de peças"
          >Qtd.</span>
        </th>
        <th>Total</th>
        <th>Peças</th>
      </tr>
    </thead>
    <tbody>
      <tr class="small">
        <td class="fw-bold table-primary">
          &lt; 5
        </td>
        <td>{{ item.shirts_details.less_than_five.count }}</td>
        <td nowrap>
          {{ $helpers.toBRL(item.shirts_details.less_than_five.value) }}
        </td>
        <td>{{ item.shirts_details.less_than_five.quantity }}</td>
      </tr>
      <tr class="small">
        <td class="fw-bold table-primary">
          5 ~ 10
        </td>
        <td>{{ item.shirts_details.between_five_and_ten.count }}</td>
        <td nowrap>
          {{ $helpers.toBRL(item.shirts_details.between_five_and_ten.value) }}
        </td>
        <td>{{ item.shirts_details.between_five_and_ten.quantity }}</td>
      </tr>
      <tr class="small">
        <td class="fw-bold table-primary">
          &gt; 10
        </td>
        <td>{{ item.shirts_details.more_than_ten.count }}</td>
        <td nowrap>
          {{ $helpers.toBRL(item.shirts_details.more_than_ten.value) }}
        </td>
        <td>{{ item.shirts_details.more_than_ten.quantity }}</td>
      </tr>
    </tbody>
  </table>
</template>
