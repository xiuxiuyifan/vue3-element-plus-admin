<template>
  <div class="v-header">
    <z-icon icon="menu" class="menu-icon"></z-icon>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item) in breadListRef" :key="item">{{ item }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <el-dropdown>
    <el-avatar style="cursor:pointer;"> user</el-avatar>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import {useRoute, useRouter} from "vue-router";
import {computed, watchEffect, ref} from "vue";
import {useStore} from "vuex";
import ZIcon from "@/components/Icon";

type a = string []
export default {
  name: 'v-header',
  components: {ZIcon},
  setup() {
    const route = useRoute()
    const store = useStore()
    const menu = computed(() => store.state.permission.menu)


    let breadList: any = []
    let breadListRef: any = ref([])
    let currentId: any = {
      id: '',
      pid: ''
    }

    const computedBread = (path: any, menu: any) => {
      for (let i = 0; i < menu.length; i++) {
        let item = menu[i]
        // eslint-disable-next-line no-empty
        if (item.path === '/dashboard') {
        } else {
          if (path === item.path) {
            //计算出父节点的title集合
            currentId.pid = item.pid
            currentId.id = item.id
            return
          } else if (item.children) {
            computedBread(path, item.children)
          }
        }
      }
    }

    //先展开
    let menu2Arr: any = []

    const menu2ArrFunc = (menu: any) => {
      for (let i = 0; i < menu.length; i++) {
        if (menu[i].children) {
          menu2ArrFunc(menu[i].children)
        }
        menu2Arr.push({
          title: menu[i].meta.title,
          id: menu[i].id,
          pid: menu[i].pid
        })
      }
    }

    menu2ArrFunc(menu.value)

    const getParentTitle = (currentId: any, menu2Arr: any) => {
      for (let i = 0; i < menu2Arr.length; i++) {
        if (currentId.id !== null) {
          if (currentId.id === menu2Arr[i].id) {
            breadList.unshift(menu2Arr[i].title)
            currentId.id = menu2Arr[i].pid
            getParentTitle(currentId, menu2Arr)
          }
        }
      }
    }

    computedBread(route.path, menu.value)
    getParentTitle(currentId, menu2Arr)
    breadListRef.value = breadList

    watchEffect(() => {
      breadList = []
      computedBread(route.path, menu.value)
      getParentTitle(currentId, menu2Arr)
      breadListRef.value = [...breadList]
    })


    //获取当前菜单名称和祖先菜单的名字，放到一个数组中遍历出来
    const router = useRouter()
    const logout = () => {
      localStorage.clear()
      router.push({path: '/login'})
    }

    return {
      logout,
      breadListRef,
    }
  }
}
</script>

<style lang="scss" scoped>
.v-header{
  display: flex;
  height: 100%;
  align-items: center;
  .menu-icon{
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>
