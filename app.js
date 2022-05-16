const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
var cors = require('koa2-cors');
const blog = require('./routes/blog')
const index = require('./routes/index')
const user = require('./routes/user')
const netSite = require('./routes/netSite')
const suModel = require('./routes/suModel')
const redisClient = require('./db/redis')
app.use(cors());
// error handler
onerror(app)

// session 配置
// app.keys = ['WJiol#23123_']
// app.use(session({
//   // 配置 redis
//   store: redisClient
// }))

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(netSite.routes(), netSite.allowedMethods())
app.use(suModel.routes(), suModel.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
