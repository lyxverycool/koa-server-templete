import sha1 from 'sha1'
import auth from '../utils/auth'

class Admin {
  async VerifyPsd(ctx) {
    try {
      const { password } = ctx.request.query
      let msg, data
      if (sha1(password) == sha1('123')) {
        msg = '验证通过'
        data = true
        auth.sign(ctx)
        ctx.session.isAdmin = true
      } else {
        msg = '验证错了！！'
        data = false
      }
      ctx.body = {
        status: '1',
        type: 'success_psd',
        message: msg,
        data
      }
    } catch (err) {
      ctx.body = {
        status: '0',
        type: 'error_psd',
        message: err.toString()
      }
    }
  }

  async GetInfo(ctx) {
    const data = ctx.state.user;
    console.log(data)
    try {
      ctx.body = {
        status: '1',
        type: 'success',
        message: '22222'
      }
    } catch (err) {
      ctx.body = {
        status: '0',
        type: 'error',
        message: err.toString()
      }
    }
  }
}

export default new Admin()
