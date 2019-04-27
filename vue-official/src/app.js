import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'

export function createApp () {
  // 创建router，store实例
  const router = createRouter()
  const store = createStore()
  // 同步路由状态（route, state) 到store
  sync(store, router)
  // 应用程序实例
  const app = new Vue({
    store,
    router,
    render: h => h(App)
  })
  return { app, router, store }
}