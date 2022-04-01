<script>
export default {
  components: {
    ViewerItemsCard: () => import(
      /* webpackPrefetch: true */
      './ViewerItemsCard.vue'
    ),
    ViewerItemsList: () => import(
      /* webpackPrefetch: true */
      './ViewerItemsList.vue'
    )
  },
  props: {
    listType: {
      type: String,
      default: 'card',
      validator: value => ['card', 'list'].indexOf(value) !== -1
    }
  }
}
</script>

<template>
  <AppViewer>
    <ViewerItemsList
      v-if="listType === 'list'"
      key="typeList"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template #file-info="{ file }">
        <slot
          name="file-info"
          :file="file"
        />
      </template>
    </ViewerItemsList>

    <ViewerItemsCard
      v-if="listType === 'card'"
      key="typeCard"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template #file-info="{ file }">
        <slot
          name="file-info"
          :file="file"
        />
      </template>
    </ViewerItemsCard>
  </AppViewer>
</template>
