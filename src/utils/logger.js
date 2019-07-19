import log4js from 'log4js'

const Logger = (logPath, isDebugger = false) => {
  const logConfig = {
    appenders: {
      app: {
        type: 'dateFile',
        filename: logPath,
        pattern: '.yyyy-MM-dd-hh'
      }
    },
    categories: {
      default: {
        appenders: ['app'],
        level: 'info'
      }
    },
    pm2: true,
    pm2InstanceVar: 'INSTANCE_ID'
  }

  let logger = null

  if (isDebugger) {
    logger = console
  } else {
    log4js.configure(logConfig)
    logger = log4js.getLogger()
  }

  return logger
}

export default Logger
