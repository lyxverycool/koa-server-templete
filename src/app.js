const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const { historyApiFallback }  = require('koa2-connect-history-api-fallback');
const jwtKoa = require('koa-jwt');
import cors from './utils/corsMiddleware'
import routers from './routers/index'
import Logger from './utils/logger'
import connectMongo from './db/mongo'
import errorJwt from './utils/errorJwt'
import sendMiddleware from './utils/sendMiddleware'
import spaStatic from './utils/koa-spa-static'
// error handler
onerror(app)

//logger
global.logger = Logger(process.env.LOG_DIR, process.env.NODE_ENV == 'development')

//连接mongo
connectMongo(app)

// middlewares
app.use(errorJwt)
app.use(cors())
app.use(sendMiddleware())
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())


app.use(historyApiFallback({whiteList: ['/api'] }))
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

app.use(jwtKoa({ secret: 'secret' }).unless({ path: ['/', /^\/api\/crawler/, /^\/api\/admin/] }))

// apiTime
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
routers(app)

// error-handling
app.on('error', (err, ctx) => {
  logger.error('server error', err, ctx)
});

module.exports = app
