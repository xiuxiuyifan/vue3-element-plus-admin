<template>
  <div>
    <BaseTableSearch>
      <div>fsdafa</div>
    </BaseTableSearch>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseTableSearch from '@/base-ui/base-table-search/index.vue'

export default defineComponent({
  components: {
    BaseTableSearch
  },
  setup(ctx, props) {
    console.log(props.slots)
    return {}
  }
})
</script>
