<script>
import { get } from 'lodash-es';
export default {
  props: {
    possibleMatch: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    get,
    onFillClick () {
      this.$emit('fill-options')
    }
  }
}
</script>

<template>
  <div>
    <div class="small">
      <span class="text-success">Apenas uma combinação possível</span>
      <span
        class="link-primary fw-bold clickable ms-1"
        @click.prevent="onFillClick"
      >(preencher)</span>
    </div>

    <table class="table table-sm table-bordered ">
      <tbody>
        <tr>
          <td class="fw-bold">
            Modelo
          </td>
          <td>{{ get(possibleMatch, 'model.name', 'N/A') }}</td>
        </tr>

        <tr>
          <td class="fw-bold">
            Material
          </td>
          <td>{{ get(possibleMatch, 'material.name', 'N/A') }}</td>
        </tr>

        <tr>
          <td class="fw-bold">
            Tipo de gola
          </td>
          <td>{{ get(possibleMatch, 'neck_type.name', 'N/A') }}</td>
        </tr>

        <tr>
          <td class="fw-bold">
            Tipo de manga
          </td>
          <td>{{ get(possibleMatch, 'sleeve_type.name', 'N/A') }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
