<template>
  <router-link v-if="!menu.children" :to="menu.path">
    <el-menu-item :index="menu.path">
      <i class="el-icon-folder-opened"></i>
      <span>{{ menu.meta.title }}</span>
    </el-menu-item>
  </router-link>
  <el-submenu v-else :index="menu.path">
    <template #title>
      <i class="el-icon-folder-opened"></i>
      <span>{{ menu.meta.title }}</span>
    </template>
    <template
        v-for="(item,index) in menu.children" :key="index"
    >
      <router-link v-if="!item.children" :to="item.path">
        <el-menu-item :index="item.path">
          <i class="el-icon-folder-opened"></i>
          <span>{{ item.meta.title }}</span>
        </el-menu-item>
      </router-link>
      <sidebar-item v-else :menu="item"></sidebar-item>
    </template>
  </el-submenu>
</template>

<script lang="ts">
export default {
  name: 'sidebar-item',
  props: {
    menu: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
