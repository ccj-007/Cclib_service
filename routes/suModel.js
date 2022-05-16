const router = require('koa-router')()
const { getModelList } = require('../controller/suModel')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/suModel')

router.get('/list', async function (ctx, next) {
  const data = await getModelList()
  if (data) {
    ctx.body = new SuccessModel(data)
    return
  }
  ctx.body = new ErrorModel('文件获取失败')
})

module.exports = router