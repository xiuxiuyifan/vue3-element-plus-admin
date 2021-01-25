<template>
  <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo z-menu"
      style="width: 260px"
  >
    <sidebar-item v-for="(item,index) in menu" :key="index" :menu="item"></sidebar-item>
  </el-menu>
</template>

<script lang="ts">
import {onMounted} from 'vue'
import SidebarItem from "@/layout/components/SideBar/SidebarItem.vue";

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
  data() {
    return {
      defaultActive: '',
    }
  },
  setup(props: any) {
    onMounted(() => {
      console.log(props.menu)
    })
  }
};
</script>
<style lang="scss" scoped>
.z-menu {
  padding-top: 50px;
  border: 0;
}
</style>
