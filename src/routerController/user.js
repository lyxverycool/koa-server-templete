import userModel from '../models/user'

class User {
  async GetInfo(ctx) {
    const data = ctx.state.user;
    const user = await userModel.findById(data._id);
    if (user !== null) {
      const result = {
        _id: user._id,
        username: user.username,
        age: user.age
      };
      return ctx.send(result);
    } else {
      return ctx.sendError('error');
    }
  }
}

export default new User()
