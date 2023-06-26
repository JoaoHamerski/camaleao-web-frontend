<script>
export const filledNames = (garment) => {
  const keys = ['model', 'material', 'neck_type', 'sleeve_type']
  const names = keys.map(key => garment.match[key]?.name || null)

  return names.filter(name => !!name)
}

export default {
  props: {
    hasIndividualItems: {
      type: Boolean,
      required: true
    },
    garments: {
      type: Array,
      required: true
    },
  },
  methods: {
    filledNames
  }
}
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="table-responsive-sm">
    <table class="table">
      <thead>
        <tr>
          <th v-if="hasIndividualItems">
            Item
          </th>
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
          v-for="(garment, index) in garments"
          :key="garment.id"
        >
          <td
            v-if="hasIndividualItems"
            class="align-middle text-center"
          >
            <span class="fw-bold text-primary">
              {{ index + 1 }}
            </span>
          </td>
          <td>
            <ul class="list-group list-group-sm">
              <li
                v-for="name in filledNames(garment)"
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
                class="list-group-item text-nowrap"
              >
                <b>{{ size.name }}</b>
                <template v-if="size.pivot.value">
                  ({{ $helpers.toBRL(size.pivot.value) }}):
                </template>:
                <b>{{ size.pivot.quantity }}</b> peças
              </li>
            </ul>
            <div
              v-if="garment.sizes_value"
              class="small mt-1 text-nowrap"
            >
              Total: <b>{{ $helpers.toBRL(garment.sizes_value, false, true) }}</b>
            </div>
          </td>
          <td
            class="align-middle text-center text-nowrap"
          >
            <h6 v-html="$helpers.toBRL(garment.value, true)" />
            <div class="small text-secondary">
              {{ $helpers.toBRL(garment.value_per_unit) }} x {{ garment.quantity }} pçs
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
