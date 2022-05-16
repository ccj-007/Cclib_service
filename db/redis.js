const redisStore = require('koa-redis')
const { REDIS_CONF } = require('../conf/db.js')

// 创建客户端
const redisClient = redisStore({
  all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
})
redisClient.on('error', err => {
  console.error(err)
})


module.exports = redisClient