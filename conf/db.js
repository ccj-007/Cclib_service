const env = process.env.NODE_ENV  // 环境参数

// 配置
let MYSQL_CONF
let REDIS_CONF

if (env === 'dev' || !env) {
  // mysql
  MYSQL_CONF = {
      host: 'localhost',
      user: 'root',
      password: 'root',
      port: '3306',
      database: 'cclib'
  }

  // redis
  REDIS_CONF = {
      port: 6379,
      host: '127.0.0.1'
  }
}

if (env === 'production') {
  // mysql
  MYSQL_CONF = {
      host: '124.223.162.201',
      user: 'chencaijun',
      password: '8CaKC5a4eh7sdwNh',
      port: '3306',
      database: 'chencaijun'
  }

  // redis
  REDIS_CONF = {
      port: 6379,
      host: '127.0.0.1'
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}