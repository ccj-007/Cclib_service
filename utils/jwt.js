let jwt = require('jsonwebtoken')
const { ErrorModel } = require('../model/resModel')
const key = 'web_cclibs'
const redisClient = require('../db/redis')

// 产生token方法
function sign (data) {
  // 载体
  let payload = data
  // 密钥
  let secretOrPrivateKey = key
  //  配置,1天有效期
  let options = { expiresIn: 86400 }
  return jwt.sign(payload, secretOrPrivateKey, options)
}

// 处理校验token
async function checkToken (ctx) {
  try {
    let token = ctx.headers.token
    let rt = jwt.verify(token, key)
    console.log('your token msg:--------------->', rt)
    //校验token是否合法
    if (!token || !rt || !rt.username) {
      ctx.body = new ErrorModel('token校验失败')
      return false
    }
    //在redis中检查账号token是否是最新的
    const TOKEN_USERNAME = `token_${rt.username}`
    let getNewToken = await redisClient.get(`token_${rt.username}`)
    if (getNewToken !== token) {
      ctx.body = new ErrorModel('你的账号被顶掉了')
      return false
    }
    return true
  } catch (e) {
    let msg = e
    if (JSON.stringify(e).includes('TokenExpiredError')) {
      msg = '密钥已过期，请重新登录'
    }
    ctx.body = new ErrorModel(msg)
  }
}


module.exports = { sign, checkToken }