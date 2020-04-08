export default (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      /* 解决OPTIONS请求 */
      if (ctx.method == 'OPTIONS') {
        ctx.status = 204;
      }
      ctx.body = {
        error: err.originalError ? err.originalError.message : err.message,
      };
    } else {
      throw err;
    }
  });
}
