### mongoose

##### mongoose

```

npm i -S mongoose

```

##### 定义 Model

/server/models/user.js

```

import { Schema, model } from 'mongoose'
const userModel = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
})
export default model('user', userModel)

```

### possport

##### koa-passport/possport-local

```

npm i -S koa-passport passport-local

```

##### /server/utils/passport.js

```

import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import UserModel from '../models/users'
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const result = await UserModel.findOne({ username })
    if (!result) return done(null, false, '用户不存在')
    if (result.password !== password) return done(null, false, '密码错误')
    return done(null, result)
  })
)
// 登陆成功后将用户信息存入session
passport.serializeUser((user, done) => {
  done(null, user)
})
// 请求时从session中获取信息
passport.deserializeUser((user, done) => {
  return done(null, user)
})
export default passport

```

### 初始化配置

##### 依赖

```

npm i -S koa-redis koa-generic-session koa-bodyparser koa-json

```

##### /server/utils/config.js

```

export const db = 'mongod://127.0.0.1:27017/demo'



export const smtp = {
  get host() {
    return 'smtp.qq.com'
  },
  get user() {
    return 'xxxx@qq.com'
  },
  get pass() {
    return ''
  },
  get code() {
    return () => {
      return Math.random()
        .toString(16)
        .slice(2, 6)
        .toUpperCase()
    }
  },
  get expire() {
    return () => {
      return new Date().getTime() + 60 * 1000
    }
  }
}

```

##### /server/index.js

```

import { connect } from 'mongoose'

import bodyParser from 'koa-bodyparser'

import json from 'koa-redis'

import session from 'koa-generic-session'

import redis from 'koa-redis'

import {db} from './utils/config'

import passport from './utils/passport'



app.keys = ['demo', 'keyskeys']

app.use(

    session({

        key: 'app',

        prefix: 'app:uid',

        store: new redis()

    })

)



app.use(
  bodyParser({
    extendTypes: ['json', 'form', 'text']
  })
)
app.use(json())
connect(
  dbConfig.dbs,
  {
    useNewUrlParser: true
  }
)
app.use(passport.initialize())
app.use(passport.session())

```

### 接口鉴权

##### 依赖

```

npm i -S axios nodemailer

```

##### /server/models/user.js

```

import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import passport from '../utils/passport'
import UserModel from '../models/users'
import { smtp } from '../utils/config'
const Store = new Redis().client
const router = new Router({
  prefix: '/users'
})
// 错误提示
const maps = new Map([
  ['code.required', '请输入验证码'],
  ['code.expire', '验证码已过期'],
  ['code.error', '验证码不正确'],
  ['user.exist', '用户已注册'],
  ['register.error', '注册失败'],
  ['user.notlogin', '用户未登录'],
  ['verify.over', '1分钟内只能发送一次']
])
// 错误集中处理
const errorHandler = (ctx, key, msg = null) => {
  if (msg)
    return (ctx.body = {
      code: -1,
      msg
    })
  if (maps.has(key)) {
    return (ctx.body = {
      code: -1,
      msg: maps.get(key)
    })
  }
}
router.post('/signup', async ctx => {
  const { username, password, email, code } = ctx.request.body
  if (!code) return errorHandler(ctx, 'code.required')
  const redisExpire = Store.hget(`nodemail:${username}`, 'expire')
  if (new Date().getTime() - redisExpire < 0) return errorHandler(ctx, 'code.expire')
  const redisCode = Store.hget(`nodemail:${username}`, 'code')
  if (code !== redisCode) return errorHandler(ctx, 'code.error')
  const user = await UserModel.find({ username })
  if (user.length > 0) return errorHandler(ctx, 'user.exist')
  const newUser = await UserModel.create({
    username,
    password,
    email
  })
  if (!newUser) return errorHandler(ctx, 'register.error')
  return (ctx.body = {
    code: 0,
    msg: '注册成功'
  })
})
router.post('/signin', async ctx => {
  return passport.authenticate('local', async (err, user, info, status) => {
    if (err) return errorHandler(ctx, null, err)
    if (user) {
      ctx.body = {
        code: 0,
        msg: '登录成功',
        user
      }
      return ctx.login(user)
    }
    ctx.body = {
      code: 1,
      msg: info
    }
  })(ctx)
})
router.post('/verify', async ctx => {
  const { username, email } = ctx.request.body
  const redisExpire = Store.hget(`nodemail:${username}`, 'expire')
  if (redisExpire && new Date().getTime() - redisExpire < 0) return errorHandler(ctx, 'verify.over')
  const { host, user, pass, code, expire } = smtp
  const transporter = nodeMailer.createTransport({
    host,
    port: 587,
    secure: false,
    auth: {
      user,
      pass
    }
  })
  const info = {
    code: code(),
    expire: expire()
  }
  const emailOptions = {
    from: `"发件人"<${user}>`,
    to: email,
    subject: `测试邀请码`,
    html: `您的邀请码是: ${info.code}`
  }
  await transporter.sendMail(emailOptions, err => {
    if (err) return console.log('邮件发送失败!')
    Store.hmset(`nodemail:${username}`, 'code', info.code, 'expire', info.expire)
  })
  ctx.body = {
    code: 0,
    msg: '验证已发送,有效期1分钟'
  }
})
router.get('/exit', async ctx => {
  await ctx.logout()
  const result = ctx.isAuthenticated()
  ctx.body = {
    code: result ? -1 : 0,
    msg: `退出${result ? '失败' : '成功'}`
  }
})
router.get('/getUser', async ctx => {
  if (!ctx.isAuthenticated()) return errorHandler(ctx, 'user.notlogin')
  const { username, email } = ctx.session.passport.user
  ctx.body = {
    code: 0,
    user: username,
    email
  }
})
export default router

```

##### 引入路由

```

import users from './routers/user'

app.use(users.routes()).use(users.allowedMethods())

```
