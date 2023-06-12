<script>
export default {
  props: {
    garments: {
      type: Array,
      required: true
    },
  },
  methods: {
    matchNames (garment) {
      const keys = ['model', 'material', 'neck_type', 'sleeve_type']
      const names = keys.map(key => garment.match[key]?.name || null)

      return names.filter(name => !!name)
    }
  }
}
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th>
          Roupa
        </th>
        <th>Tamanhos</th>
        <th class="text-center">
          Valor
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="garment in garments"
        :key="garment.id"
      >
        <td>
          <ul class="list-group list-group-sm">
            <li
              v-for="name in matchNames(garment)"
              :key="name"
              class="list-group-item small"
            >
              {{ name }}
            </li>
          </ul>
        </td>



        <td>
          <ul class="list-group list-group-sm">
            <li
              v-for="size in garment.sizes"
              :key="size.pivot.id"
              class="list-group-item"
            >
              <b>{{ size.name }}</b> ({{ $helpers.toBRL(size.pivot.value) }}): <b>{{ size.pivot.quantity }}</b> peças
            </li>
          </ul>
          <div
            v-if="garment.sizes_value"
            class="small mt-1"
          >
            Total: <b>{{ $helpers.toBRL(garment.sizes_value, false, true) }}</b>
          </div>
        </td>

        <td
          class="align-middle text-center"
        >
          <h6 v-html="$helpers.toBRL(garment.value, true)" />
          <div class="small text-secondary">
            {{ $helpers.toBRL(garment.value_per_unit) }} x {{ garment.quantity }} pçs
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
