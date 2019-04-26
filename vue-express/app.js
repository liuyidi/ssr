const Vue = require('vue')
const app = new Vue({
  template: `<div>Hello World</div>`
})

const renderer = require('vue-server-renderer').createRenderer()

// 渲染一个app实例
renderer.renderToString(app).then(html => {
  console.log(html)
}).catch(err => {
  console.log(err)
})

