'use strict'
import Test from '../routerController/test'
import Router from 'koa-router'

const API_PATH = process.env.API_PATH
const router = new Router({
  prefix: `/${API_PATH}/test`
})

router.get('/getMes', Test.getMes)

export default router