const express = require('express')
const router = express.Router()
const { getUserInfo } = require('../router_handle/userinfo')

router.get('/userinfo', getUserInfo)

module.exports = router
