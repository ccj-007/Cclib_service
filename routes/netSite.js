const router = require('koa-router')()
const {
  getList,
} = require('../controller/netSite')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { checkToken } = require('../utils/jwt')

// const loginCheck = require('../middleware/loginCheck')
router.prefix('/api/netSite')

router.post('/link', async function (ctx, next) {
  let sucCheck = await checkToken(ctx)
  if (!sucCheck) return
  let { type } = ctx.request.body
  const listData = await getList(type)
  ctx.body = new SuccessModel(listData)
})

router.post('/like', async function (ctx, next) {
  let author = ctx.query.author || ''
  const keyword = ctx.query.keyword || ''

  const listData = await getList(author, keyword)
  ctx.body = new SuccessModel(listData)
})


module.exports = router
