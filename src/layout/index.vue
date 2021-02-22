<template>
  <el-container class="layout">
    <el-aside class="el-aside" width="260px">
      <el-scrollbar
          class="the-view-class"
          style="display: flex; width: 260px; height: 100%"
      >
        <v-logo></v-logo>
        <v-menu :menu="menu"></v-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header class="el-header">
        <v-header/>
      </el-header>
      <el-main class="el-main">
        <v-content/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import VLogo from "@/layout/components/side-bar/VLogo.vue";
import VMenu from "@/layout/components/side-bar/index.vue";
import {menu} from '@/menu.ts'
import VHeader from "@/layout/components/VHeader.vue";
import VContent from "@/layout/components/VContent.vue";

export default {
  components: {VContent, VHeader, VMenu, VLogo},

  setup() {
    return {
      menu,
    }
  }
};
</script>
<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;

  .el-aside {
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, .05);
    background-color: #fff;
  }

  .el-header {
    height: 62px;
    background-color: #fff;
    margin: 20px;
    border-radius: 7px;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, .05);
    padding: 10px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .el-main {
    padding-top: 0;
  }
}
</style>
