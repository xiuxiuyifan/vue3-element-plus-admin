import { ref, onMounted } from 'vue'
import type { StyleList } from '../types'

type useTabsKey = 'solidStyle' | 'activeKey' | 'tabList' | 'handleTab'
type useTabsType = Record<useTabsKey, any>

export default function useTabs(): useTabsType {
  const solidStyle = ref({ width: '0px', left: '0px' })
  let styleList: StyleList[]
  const computedTabsWidth = () => {
    const tabs = document.querySelectorAll('.tab-top') as NodeListOf<HTMLElement>
    styleList = Array.from(tabs).map((item, index) => {
      const left = item.offsetLeft
      const width = item.offsetWidth
      return {
        width,
        left
      }
    })
    solidStyle.value.width = styleList[0].width + 'px'
  }
  const tabList = ['账号密码登录', '手机号登录']
  const activeKey = ref<number>(0)
  const handleTab = (index: number) => {
    activeKey.value = index
    solidStyle.value.width = styleList[index].width + 'px'
    solidStyle.value.left = styleList[index].left + 'px'
  }

  onMounted(() => {
    computedTabsWidth()
  })
  return {
    solidStyle,
    activeKey,
    tabList,
    handleTab
  }
}
