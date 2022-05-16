const xss = require('xss')
const { exec } = require('../db/mysql')

const getList = async (type) => {
    let sql = `select * from netsite where 1=1 `
    if (type) {
        sql += `and type='${type}' `
    }

    return await exec(sql)
}


module.exports = {
    getList,
}