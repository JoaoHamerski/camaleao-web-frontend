<script>
import { faBoxes, faTshirt, faDollarSign } from '@fortawesome/free-solid-svg-icons';

export default {
  props: {
    label: {
      type: String,
      required: true
    },
    weekInfo: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    icons: {
      faBoxes,
      faTshirt,
      faDollarSign
    }
  })
}
</script>

<template>
  <div>
    <div class="fw-bold mb-1">
      {{ label }}
    </div>
    <div>
      <FontAwesomeIcon
        :icon="icons.faBoxes"
        fixed-width
      />
      {{ $helpers.toNumber(weekInfo.orders_count) }}
    </div>
    <div>
      <FontAwesomeIcon
        :icon="icons.faTshirt"
        fixed-width
      />
      {{ $helpers.toNumber(weekInfo.shirts_count) }}
    </div>
    <div>
      <span class="fa-fw fw-bold">R$</span>
      {{ $helpers.toBRL(weekInfo.receipt).replace('R$ ', '') }}
    </div>
  </div>
</template>
