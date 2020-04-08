'use strict'

import Admin from '../routerController/admin'
import Router from 'koa-router'

const API_PATH = process.env.API_PATH
const router = new Router({
  prefix: `/${API_PATH}/admin`
})

router.get('/login', Admin.VerifyPsd)
router.get('/getInfo', Admin.GetInfo)

export default router
