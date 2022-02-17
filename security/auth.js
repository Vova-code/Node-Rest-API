const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')
const { JsonWebTokenError } = require('jsonwebtoken')

const auth = async (req, res, next) => {
  const { authentication } = req.headers

  try {
    const {
      payload: {
        user: { username }
      }
    } = jwt.verify(authentication, process.env.JWT_SECRET)

    req.user = await User.query().findOne({ username })

    next()
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      res.send({ message: 'Nahh you joking' })
      return
    }
    res.status(500).send({ message: 'Something went wrong during auth' })
  }
}

module.exports = auth
