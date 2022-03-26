import type { App } from 'vue'
// import { ElButton } from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// const components = [ElButton]

export default function registerElement(app: App): void {
  const ElementPlus = require('element-plus')
  app.use(ElementPlus, { size: 'small', zIndex: 3000, locale: zhCn })
  // 按需引入
  // for (const component of components) {
  //   app.component(component.name, component)
  // }
}
