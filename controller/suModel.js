const { exec } = require('../db/mysql')

const getModelList = async () => {
  const sql = `
        select * from sumodel
    `
  const rows = await exec(sql)
  return rows || {}
}

module.exports = {
  getModelList,
}