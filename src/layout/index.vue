<template>
  <el-container class="layout">
    <el-aside class="el-aside" width="260px">
      <el-scrollbar
          class="the-view-class"
          style="display: flex; width: 260px; height: 100%"
      >
        <z-logo></z-logo>
        <z-menu :menu="menu"></z-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header class="el-header">
        <el-dropdown>
          <el-avatar> user </el-avatar>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main class="el-main">
        <el-scrollbar class="el-main-scrollbar">
          <router-view v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in">
              <keep-alive>
                <component :is="Component"/>
              </keep-alive>
            </transition>
          </router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import ZLogo from "@/layout/components/SideBar/Logo.vue";
import ZMenu from "@/layout/components/SideBar/index.vue";
import {menu} from '@/menu.ts'
import {useRouter} from 'vue-router'

export default {
  components: {ZMenu, ZLogo},

  setup() {
    const router = useRouter()
    const logout = () => {
      localStorage.clear()
      router.push({path:'/login'})
    }
    return {
      menu,
      logout
    }
  }
};
</script>
<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;

  .el-aside {
    box-shadow :0 0 15px 0 rgba(0,0,0,.05);
    background-color: #fff;
  }
  .el-header {
    height: 62px;
    background-color: #fff;
    margin:20px;
    border-radius: 7px;
    box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
    padding: 10px 14px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .el-main{
    padding-top: 0;
  }
  .el-main-scrollbar{
    border-radius: 7px;
  }
  .fade-transform-leave-active,
  .fade-transform-enter-active {
    transition: all .5s;
  }

  .fade-transform-enter {
    opacity: 0;
    transform: translateX(-20px);
  }

  .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(20px);
  }
}
</style>
