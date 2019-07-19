const cors = async (ctx, next) => {
  const orginList = process.env.REFER_URL || []
  if (orginList.includes(ctx.headers.origin)) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    ctx.set("Access-Control-Allow-Origin", ctx.headers.origin);
  }
  ctx.set('Access-Control-Max-Age', '31536000')
  ctx.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
  )
  ctx.set('Access-Control-Allow-Credentials', true)
  ctx.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,HEAD,OPTIONS')
  await next()
}

export default () => cors
