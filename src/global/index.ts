import type { App } from 'vue'
import registerElement from './register-element'

const NODE_ENV = process?.env?.NODE_ENV

export default function globalRegister(app: App): void {
  if (NODE_ENV === 'development') {
    require('../mock')
  }
  registerElement(app)
}
