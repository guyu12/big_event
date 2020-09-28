const express = require('express')
const app = express()
const cors = require('cors')
const joi = require('@hapi/joi')
const config = require('./config')
// 解析token
const expressJWT = require('express-jwt')
app.use(cors())
// 解析表单数据
app.use(express.urlencoded({ extended: false }))
//封装res.cc函数
app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    res.send({
      message: err instanceof Error ? err.message : err,
      status,
    })
  }
  next()
})
//解析token
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(
  expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] })
)

//引入路由
app.use('/api', require('./router/user'))
app.use('/my', require('./router/userinfo'))
//定义错误级别的中间件
app.use((err, req, res, next) => {
  //验证失败的错误
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 解析token失败
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  res.cc(err)
})
app.listen(80)
console.log('http://127.0.0.1')
