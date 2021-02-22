<template>
  <el-scrollbar class="el-main-scrollbar">
    <router-view v-slot="{ Component }">
      <transition mode="out-in" name="fade-transform">
        <keep-alive>
          <component :is="Component"/>
        </keep-alive>
      </transition>
    </router-view>
  </el-scrollbar>
</template>

<script lang="ts">
export default {
  name: 'v-content'
}
</script>

<style lang="scss" scoped>
.el-main-scrollbar {
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
</style>
