const jwt = require("jsonwebtoken")
const expiresIn = "2 days"
const tokenName = 'lyxTooken'
const secret = 'secret'

const auth = {
  sign: (ctx, info) => {
    const token = jwt.sign(info || { name: 'cool' }, secret, { expiresIn })
    ctx.cookies.set(tokenName, token, {
      maxAge: expiresIn,
      httpOnly: false
    })
    return token
  }
}

export default auth