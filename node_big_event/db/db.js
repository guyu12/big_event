const mysql = require('mysql')
// 引入密码加密
const bcrypt = require('bcryptjs')
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'my_db_01',
})

module.exports = {
  db,
  bcrypt,
}
