'use strict'
import session from 'koa-session'
import MongooseStore from 'koa-session-mongoose'
import mongoose from 'mongoose'
import config from '../config'

function connectMongo(app) {
  mongoose.Promise = global.Promise
  const { mongodb, sessions } = config
  try {
    mongoose.connect(mongodb, { useMongoClient: true })
    app.keys = ['some secret hurr']
    const sessionConfig = Object.assign(sessions, {
      store: new MongooseStore({
        collection: 'sessions',
        expires: 86400, // 1 day is the default
      })
    })
    app.use(session(sessionConfig, app))
    logger.info('数据库已连接')
  } catch (error) {
    logger.error(error)
  }
}

export default connectMongo


