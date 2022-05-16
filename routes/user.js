const router = require('koa-router')()
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { sign } = require('../utils/jwt')
const redisClient = require('../db/redis')

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
  let { username, password } = ctx.request.body
  const data = await login(username, password)
  let token = sign({ username })
  if (data && data.username) {
    redisClient.set(`token_${username}`, token)
    //每次存入最新的登录token
    let res = await redisClient.get(`token_${username}`)
    console.log("获取最新的redisToken", res);

    ctx.body = new SuccessModel({ ...data, token })
    return
  }
  ctx.body = new ErrorModel('登录失败')
})

module.exports = router