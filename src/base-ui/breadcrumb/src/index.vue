<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-if="currPath !== '/home'" :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index">
      {{ item.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import { treeFindPath } from '@/utils/utils'
const route = useRoute()
const store = useStore()

interface IBreadcrumbItem {
  url: string
  name: string
}

const breadcrumbs = ref<IBreadcrumbItem[]>([])
const currPath = ref<string>('')

watch(
  route,
  (route, prevRoute) => {
    const { path } = route
    currPath.value = path
    // 从菜单中获取完整的面包屑
    function getFullPaths(path: string, menus: any): IBreadcrumbItem[] {
      let fullPaths: IBreadcrumbItem[] = treeFindPath(menus, (node: any) => node.url === path)
      return fullPaths
    }
    const menus = store.state.login.menus
    breadcrumbs.value = getFullPaths(path, menus)
  },
  {
    immediate: true
  }
)
</script>
