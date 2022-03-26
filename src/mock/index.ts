import Mock from 'mockjs'

Mock.mock('/login', {
  code: 200,
  data: [],
  msg: '请求成功'
})
