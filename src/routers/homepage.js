'use strict'
import Router from 'koa-router'

const router = new Router()

router.get('/', async (ctx) => {
  let title = 'Its a server of lyxcool'
  await ctx.render('index', { title })
})

export default router
