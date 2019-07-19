'use strict'
import Crawler from '../routerController/crawler'
import Router from 'koa-router'

const API_PATH = process.env.API_PATH
const router = new Router({
  prefix: `/${API_PATH}/crawler`
})

router.get('/getQQWeibo', Crawler.getQQWeibo)
router.get('/getCnblogs', Crawler.getCnblogs)
router.get('/getZhihuImgs', Crawler.getZhihuImgs)

export default router
