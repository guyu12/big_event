const { db } = require('../db/db')

let getUserInfo = (req, res) => {
  const id = req.user.id
  const sqlStr =
    'select id,username,nickname,email,user_pic from ev_users where id=?'
  db.query(sqlStr,id, (err, result) => {
    if (err) return res.cc(err)
    console.log(result);
    if (result.length !== 1) return res.cc('获取用户信息失败')
    res.send({
      status: 0,
      message: '获取用户信息成功',
      data: result[0],
    })
  })
}

module.exports = {
  getUserInfo,
}
