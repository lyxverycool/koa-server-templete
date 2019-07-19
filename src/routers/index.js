import crawler from './crawler'
import homepage from './homepage'
import test from './test'

export default app => {
  app.use(homepage.routes()).use(homepage.allowedMethods())
  app.use(crawler.routes()).use(crawler.allowedMethods())
  app.use(test.routes()).use(test.allowedMethods())
}
