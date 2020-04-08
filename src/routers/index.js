import crawler from './crawler'
import homepage from './homepage'
import admin from './admin'
import user from './user'

export default app => {
  app.use(homepage.routes()).use(homepage.allowedMethods())
  app.use(crawler.routes()).use(crawler.allowedMethods())
  app.use(admin.routes()).use(admin.allowedMethods())
  app.use(user.routes()).use(user.allowedMethods())
}
