<template>
  <el-sub-menu :index="subItemData.url">
    <template #title>
      <i :class="subItemData.icon"></i>
      <span>{{ subItemData.name }}</span>
    </template>
    <template v-for="(item, index) in subItemData.children" :key="index">
      <el-menu-item :index="item.url" v-if="!item.children">
        {{ item.name }}
      </el-menu-item>
      <sub-menu v-else :sub-item-data="item"></sub-menu>
    </template>
  </el-sub-menu>
</template>

<script lang="ts" setup>
import { IMenus } from '@/store/login/types'
import { defineProps } from 'vue'

interface Props {
  subItemData: IMenus
}

const name = 'sub-menu'
const props = defineProps<Props>()
</script>
<style lang="less">
.el-menu-item.is-active {
  background-color: var(--el-menu-item-hover-fill);
}
</style>
