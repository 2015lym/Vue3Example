import type { App } from 'vue'
import { Icon } from './Icon'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

export const setupGlobCom = (app: App<Element>): void => {
  app.component('Icon', Icon)
  app.use(ElementPlus)
}
