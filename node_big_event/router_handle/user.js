const { db, bcrypt } = require('../db/db')
const jwt = require('jsonwebtoken')
const config = require('../config')
//登陆
let login = (req, res) => {
  const userinfo = req.body
  const sqlStr = 'select * from ev_users where username=?'
  db.query(sqlStr, userinfo.username, (err, result) => {
    if (err) return res.cc(err)
    if (result.length !== 1) return res.cc('登录失败')
    // 检测密码是否正确
    const tool = bcrypt.compareSync(userinfo.password, result[0].password)
    if (!tool) return res.cc('登录失败')
    // res.cc('登陆成功',0)
    //返回token字符串
    const user = { ...result[0], password: '', user_pic: '' }
    // console.log(user);
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: config.expiresIn,
    })
    res.send({
      status: 0,
      message: '登陆成功',
      token: 'Bearer ' + tokenStr,
    })
  })
  // res.send('login')
}
//注册
let regUser = (req, res) => {
  const userinfo = req.body
  // 判断用户名是否已存在
  const sqlStr = 'select * from ev_users where username=?'
  db.query(sqlStr, userinfo.username, (err, result) => {
    if (err) return res.cc(err)
    if (result.length !== 0) return res.cc('用户名已存在，请重新输入用户名')

    // 将密码加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    // 注册
    const sql = 'insert into ev_users set ?'
    const user = {
      username: userinfo.username,
      password: userinfo.password,
    }
    db.query(sql, user, (err, result) => {
      if (err) return res.cc(err)
      if (result.affectedRows !== 1) return res.cc('用户注册失败，请稍后再试')
      res.cc('用户注册成功', 0)
    })
  })
}

module.exports = {
  login,
  regUser,
}
