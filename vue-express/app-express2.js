const Vue = require('vue')
const server = require('express')()
const fs = require('fs')
const vueServerRenderer = require('vue-server-renderer')
const template = fs.readFileSync('./index.template.html', 'utf-8') 
const renderer = vueServerRenderer.createRenderer({ template })

server.get('*', (req, res) => {
  const instance = new Vue({
    data: {
      url: req.url
    },
    template: `<div>Hello World, 访问的URL是：{{ url }}</div>`
  })

  // 渲染上下文
  const context = {
    title: 'hello, world（包含上下文）',
    meta: `
      <meta charset="utf-8"/>
    `
  }

  // 渲染一个app实例
  renderer.renderToString(instance, context).then(html => {
    // vue拼接html
    console.log(html)
    // 服务端响应
    res.end(html)
  }).catch(err => {
    console.log(err)
  })
})

server.listen(8010, function () {
  console.log('server on listening on 8010')
})

