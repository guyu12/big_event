const express = require('express')
const router = express.Router()
// 引入定义验证规则
const {reg_schema}=require('../schema/schema')
//实现对表单数据进行自动验证
const expressJoi=require('@escook/express-joi')
// 引入user
const user = require('../router_handle/user')
// 注册
router.post('/regUser',expressJoi(reg_schema), user.regUser)
// 登陆
router.post('/login',expressJoi(reg_schema), user.login)

module.exports = router
