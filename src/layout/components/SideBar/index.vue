<template>
  <el-menu
      :default-active="defaultActive"
      router
      class="el-menu-vertical-demo z-menu"
      style="width: 260px"
  >
    <sidebar-item v-for="(item,index) in menu" :key="index" :menu="item"></sidebar-item>
  </el-menu>
</template>

<script lang="ts">
import {onMounted,computed} from 'vue'
import SidebarItem from "@/layout/components/SideBar/SidebarItem.vue";
import {useRouter} from 'vue-router'

export default {
  name: 'z-menu',
  components: {SidebarItem},
  props: {
    menu: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup() {
    let route = useRouter().currentRoute
    let defaultActive = computed(()=>{
      return route.value.path
    })

    onMounted(() => {
    })

    return {
      defaultActive
    }
  }
};
</script>
<style lang="scss" scoped>
.z-menu {
  padding-top: 50px;
  border: 0;
}
</style>
