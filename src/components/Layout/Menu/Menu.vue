<template>
  <el-menu
    :default-active="defaultActive"
    class="z-menu"
    :unique-opened="true"
    :collapse="isCollapse"
    @select="handleSelectMenu"
  >
    <template v-for="(menuItem, index) in menus" :key="index">
      <el-menu-item v-if="!menuItem.children" :index="menuItem.url">
        <i :class="menuItem.icon"></i><span v-if="!isCollapse">{{ menuItem.name }}</span>
      </el-menu-item>
      <sub-menu v-else :sub-item-data="menuItem"></sub-menu>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import SubMenu from './SubMenu.vue'

const emit = defineEmits(['select-menu'])
const props = defineProps({
  asideWidth: Number,
  isCollapse: Boolean
})

const store = useStore()
const router = useRouter()
const route = useRoute()
const defaultActive = ref<string>()
const menus = computed(() => {
  return store.state.login.menus
})
const handleSelectMenu = (index: string, indexPath: string) => {
  router.push({ path: index })
  emit('select-menu', { path: index })
}
onMounted(() => {
  defaultActive.value = route.path
})
</script>

<style lang="less" scoped>
.z-menu {
  border-right: 0;
}
.z-menu:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
