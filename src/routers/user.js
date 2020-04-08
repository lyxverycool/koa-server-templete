'use strict'

import User from '../routerController/user'
import Router from 'koa-router'

const API_PATH = process.env.API_PATH
const router = new Router({
  prefix: `/${API_PATH}/user`
})

router.get('/getInfo', User.GetInfo)

export default router
