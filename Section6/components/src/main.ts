import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import MyComponent from './components/MyComponent.vue'

// 旧的写法
// createApp(App).mount('#app')

// 错误写法 1
// createApp(App).mount('#app').component('MyComponent', MyComponent)

// 错误写法 2
// const app = createApp(App).mount('#app')
// app.component('MyComponent', MyComponent)

// 正确写法
// 创建应用实例 必须第一个执行
const app = createApp(App)
// 注册组件
// app.component('MyComponent', MyComponent)
// 将应用实例挂载到容器中 必须最后执行
app.mount('#app')