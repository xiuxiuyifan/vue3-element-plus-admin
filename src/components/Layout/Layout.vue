<template>
  <el-container class="z-layout" ref="rootRef">
    <el-drawer
      v-model="drawer"
      :with-header="false"
      direction="ltr"
      custom-class="z-layout-drawer"
      size="255px"
      @close="drawerClose"
    >
      <div ref="drawerRef"></div>
    </el-drawer>
    <el-aside ref="asideRef" :width="asideWidth + 'px'" class="z-aside">
      <div class="icon-item">
        <img class="logo" src="@/assets/img/logo.png" alt="logo" />
        <span class="sys-name" v-show="!isCollapse">外存宝术</span>
      </div>
      <el-scrollbar>
        <z-menu
          :is-collapse="isCollapse"
          :aside-width="asideWidth"
          :is-modile="isMobile"
          @select-menu="onSelectMenu"
        ></z-menu>
      </el-scrollbar>
    </el-aside>
    <el-container class="z-section">
      <el-header class="z-header">
        <div class="header-wrapper">
          <div class="header-right">
            <div class="fold-wrapper">
              <div class="fold-icon" @click="handleShrink">
                <el-icon class="f-icon">
                  <expand v-if="isExpand" />
                  <fold v-else />
                </el-icon>
              </div>
              <breadcrumb></breadcrumb>
            </div>
            <div class="user-wrapper">
              <el-icon class="bell-icon">
                <bell />
              </el-icon>
              <el-dropdown>
                <el-avatar
                  class="z-avatar"
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                ></el-avatar>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </div>
      </el-header>
      <el-tabs
        v-model="editTabsValue"
        type="card"
        closable
        @tab-click="handleTabClick"
        @tab-remove="handleRemoveTab"
        class="z-el-tabs"
      >
        <el-tab-pane
          v-for="item in editableTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >
        </el-tab-pane>
      </el-tabs>
      <el-main class="z-el-main">
        <el-scrollbar class="z-el-main-scroll">
          <router-view v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Fold, Bell, Expand } from '@element-plus/icons'
import { debounce } from 'lodash'
import { ElContainer } from 'element-plus'
import ZMenu from './Menu/Menu.vue'
import breadcrumb from '@/base-ui/breadcrumb'
import useElTabs from './hooks/use-el-tabs'

const router = useRouter()
const isCollapse = ref<boolean>(false)
const asideWidth = ref<number>(255)
const drawer = ref<boolean>(false)
const isMobile = ref<boolean>(false)
const rootRef = ref<InstanceType<typeof ElContainer>>()
const asideRef = ref<any>()
const drawerRef = ref<HTMLElement>()
const isExpand = ref<boolean>()
const { editTabsValue, editableTabs, handleTabClick, handleRemoveTab } = useElTabs()

const handleShrink = () => {
  if (isMobile.value) {
    drawer.value = !drawer.value
    isCollapse.value = false
    asideWidth.value = 255
  } else {
    if (asideWidth.value === 255) {
      asideWidth.value = 64
    } else {
      asideWidth.value = 255
    }
    isCollapse.value = !isCollapse.value
  }
  isExpand.value = !isExpand.value
}
const handleLogout = () => {
  router.push({ path: '/login' })
}
function watchChangeSize() {
  //可视区的宽/高(DOM)
  var offsetW = document.documentElement.clientWidth || document.body.clientWidth
  if (offsetW < 992) {
    isMobile.value = true
    drawer.value = true
    isCollapse.value = false
    asideWidth.value = 255
    isExpand.value = false
    nextTick(() => {
      drawerRef.value?.appendChild(asideRef.value?.$el)
    })
  } else {
    isMobile.value = false
    drawer.value = false
    let aside = asideRef?.value?.$el
    let insertNextDom = rootRef.value?.$el?.childNodes[0]
    rootRef.value?.$el?.insertBefore(aside, insertNextDom)
  }
}
const drawerClose = () => {
  isExpand.value = true
}
const onSelectMenu = (select: { path: string }) => {
  drawer.value = false
}
onMounted(() => {
  watchChangeSize()
})
window.onload = function () {
  watchChangeSize()
}
onUnmounted(() => {
  window.onresize = null
  window.onload = null
})
window.onresize = debounce(watchChangeSize, 200)
</script>

<style lang="less" scoped>
::v-deep(.el-drawer__body) {
  padding: 0;
}
.z-layout {
  .fade-transform-leave-active,
  .fade-transform-enter-active {
    transition: all 0.5s;
  }
  .fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
  }
  .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  height: 100%;
  .z-section {
    overflow: hidden;
  }
  .z-aside {
    box-shadow: 4px 0px 4px 0px rgba(43, 45, 54, 0.04);
    transition: width 0.3s linear;
    ::v-deep(.el-scrollbar) {
      height: calc(100% - 70px);
    }
  }
  .icon-item {
    height: 70px;
    display: flex;
    align-items: center;
    padding: 20px;
    .logo {
      height: 32px;
    }
    .sys-name {
      font-size: 22px;
      font-weight: bold;
      margin-left: 10px;
      letter-spacing: 2px;
    }
  }
  .z-el-main {
    background: #f5f6fa;
    padding: 6px 10px;
    overflow: hidden;
    .z-el-main-scroll {
      border-radius: 4px;
    }
  }
  .z-el-tabs {
    z-index: 10;
    height: 32px;
    line-height: 32px;
    ::v-deep(.el-tabs__header) {
      margin: 0;
    }
    ::v-deep(.el-tabs__item) {
      height: 28px;
      line-height: 28px;
      border: 1px solid var(--el-border-color-light);
      margin-left: 3px;
      font-size: 12px;
    }
    ::v-deep(.el-tabs__item:first-child) {
      border-left: 1px solid var(--el-border-color-light);
      border: 1px solid var(--el-border-color-light);
      margin-left: 0;
    }
    ::v-deep(.el-tabs__nav) {
      padding: 0 6px;
      border: 0;
    }
    ::v-deep(.el-tabs__nav-next) {
      padding-right: 4px;
    }
    ::v-deep(.el-tabs__nav-prev) {
      padding-left: 4px;
    }
    ::v-deep(.el-tabs__nav-next),
    ::v-deep(.el-tabs__nav-prev) {
      line-height: 28px;
      height: 28px;
      width: 20px;
      top: 3px;
      border: 1px solid var(--el-border-color-light);
    }
  }
  .z-header {
    height: 70px;
    box-shadow: 0px 4px 4px 0px rgba(43, 45, 54, 0.04);
    z-index: 1;
    padding: 0;
    .header-wrapper {
      display: flex;
      justify-content: space-between;
      height: 100%;
      .header-right {
        .fold-wrapper {
          display: flex;
          align-items: center;
          .fold-icon {
            padding: 20px;
            cursor: pointer;
            .f-icon {
              font-size: 20px;
            }
          }
        }

        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px 0 0;
        .user-wrapper {
          display: flex;
          align-items: center;
          .bell-icon {
            font-size: 20px;
          }
          .z-avatar {
            margin-left: 20px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
