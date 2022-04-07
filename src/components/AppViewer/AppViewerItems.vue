<script>
const ViewerItemsCard = () => import('./ViewerItemsCard.vue')
const ViewerItemsList = () => import('./ViewerItemsList.vue')

export default {
  props: {
    listType: {
      type: String,
      default: 'card',
      validator: value => ['card', 'list'].indexOf(value) !== -1
    }
  },
  computed: {
    getComponent () {
      if (this.listType === 'list') {
        return ViewerItemsList
      }

      return ViewerItemsCard
    }
  }
}
</script>

<template>
  <AppViewer>
    <Component
      :is="getComponent"
      :key="listType"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template #file-info="{ file }">
        <slot
          name="file-info"
          :file="file"
        />
      </template>
    </Component>
  </AppViewer>
</template>
