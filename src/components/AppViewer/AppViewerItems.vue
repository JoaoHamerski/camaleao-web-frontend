<script>
import ViewerItemsCard from './ViewerItemsCard'
import ViewerItemsList from './ViewerItemsList'

export default {
  components: {
    ViewerItemsCard,
    ViewerItemsList
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
      <template #attach-info="{ attach }">
        <slot
          name="attach-info"
          :attach="attach"
        />
      </template>
    </ViewerItemsList>

    <ViewerItemsCard
      v-if="listType === 'card'"
      key="typeCard"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template #attach-info="{ attach }">
        <slot
          name="attach-info"
          :attach="attach"
        />
      </template>
    </ViewerItemsCard>
  </AppViewer>
</template>
