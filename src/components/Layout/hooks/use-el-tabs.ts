import { ref, watch, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElTabPane } from 'element-plus'

interface ITabItem {
  title: string
  name: string
}

export default function useElTabs(): any {
  const editTabsValue = ref<string>('1')
  const editableTabs = ref<ITabItem[]>([])
  const route = useRoute()
  const router = useRouter()

  const addTab = (name: string, path: string) => {
    // 没有的时候再添加
    const hasPath = editableTabs.value.find((item) => item.name === path)
    if (!hasPath) {
      editableTabs.value.push({
        title: name,
        name: path
      })
    }
    editTabsValue.value = path
  }

  const handleRemoveTab = (targetName: string) => {
    const tabs = editableTabs.value
    if (targetName === '/home') return
    let activeName = editTabsValue.value
    let nextTab: ITabItem = {
      title: '',
      name: ''
    }
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.name
          }
        }
      })
    }
    editTabsValue.value = activeName
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
    router.push({
      path: nextTab.name
    })
  }

  const handleTabClick = (tabPane: InstanceType<typeof ElTabPane>) => {
    const path = tabPane.paneName
    if (path) {
      router.push({ path })
    }
  }

  watch(
    route,
    (newRoute) => {
      const path = newRoute.path
      const name = newRoute.meta?.title
      addTab(name as string, path)
    },
    {
      immediate: true
    }
  )

  return {
    editTabsValue,
    editableTabs,
    handleRemoveTab,
    addTab,
    handleTabClick
  }
}
