import { createApp } from './app'

export default context => {
    // 返回一个promise，以便服务器等待 异步路由钩子函数或组件 渲染完成
    return new Promise((resolve, reject) => {
        const { app, router } = createApp()
        router.push(context.url)
        // 将所有的异步组件和钩子都解析完毕
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            // 匹配不到的路由，执行 reject 函数，并返回 404
            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }
            // 对匹配的组件调用 asyncData()
            Promise.all(matchedComponents.map(Component => {
              if (Component.asyncData) {
                return Component.asyncData({
                  store,
                  route: router.currentRoute
                })
              }
            })).then(() => {
              // 所有组件都执行完 asyncData 以后

              // 我们的 store 现在已经填充入渲染应用程序所需的状态。
              // 当我们将状态附加到上下文，
              // 并且 `template` 选项用于 renderer 时，
              // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。

              context.state = store.state
              resolve(app)
            })
        }, reject)
    })
}