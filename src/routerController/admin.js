import sha1 from 'sha1'
import auth from '../utils/auth'
import userModel from '../models/user'

class Admin {
  async Login(ctx) {
    const data = ctx.request.body;
    if (!data.username || !data.password) {
      return ctx.sendError('参数不合法');
    }
    const result = await userModel.findOne({
      username: data.username,
      password: sha1(data.password)
    })
    if (result !== null) {
      auth.sign(ctx, {
        username: result.username,
        _id: result._id
      });
      ctx.session.isAdmin = true
      return ctx.send('登录成功');
    } else {
      return ctx.sendError('用户名或密码错误');
    }
  }

  async Register(ctx) {
    const data = ctx.request.body;
    const checkUser = await userModel.findOne({
      username: data.username
    });
    if (checkUser !== null) {
      return ctx.sendError('该用户名已存在');
    }
    const user = new userModel({
      username: data.username,
      password: sha1(data.password),     // 密码加密存储
      age: data.age
    })
    const result = await user.save();
    return result !== null ? ctx.send(true, '注册成功') : ctx.sendError('注册失败');
  }
}

export default new Admin()
