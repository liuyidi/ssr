const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()

server.get('*', (req, res) => {
  const instance = new Vue({
    data: {
      url: req.url
    },
    template: `<div>Hello World, 访问的URL是：{{ url }}</div>`
  })

  // 渲染一个app实例
  renderer.renderToString(instance).then(html => {
    console.log(html)
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>Hello</title>
          <meta charset="utf-8"/>
        </head>
        <body>${html}</body>
      </html>
    `)
  }).catch(err => {
    console.log(err)
  })
})

server.listen(8080)

