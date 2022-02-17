const objection = require('objection')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')
const hashPassword = require('../security/hashPassword')
const auth = require('../security/auth')

const usersRoutes = ({ app, database }) => {
  app.get('/users', async (req, res) => {
    const users = await UserModel.query()
    res.send(users)
  })

  app.get('/users/:userId', async (req, res) => {
    const { userId } = req.params

    try {
      const searchedUser = await UserModel.query().findById(userId)
      res.send(searchedUser)
    } catch (e) {
      res.status(404).send({ error: 'User does not exist' })
    }

  })

  // app.post('/users/new', async (req, res) => {
  //   const { username } = req.body
  //
  //   try {
  //     const userToAdd = await User.query().insert({ username: username })
  //     res.send(userToAdd)
  //   } catch (e) {
  //     res.status(501).send({ error: 'Something went wrong' })
  //   }
  // })

  app.post('/sign-up', async (req, res) => {
    const { username, password } = req.body

    const user = await UserModel.query().findOne({ username })

    if (user) {
      res.send({ message: 'Mmmh !' })
      return
    }

    const [hash, salt] = hashPassword(password)

    try {
      const { passwordHash, passwordSalt, ...newUser } = await UserModel.query().insertAndFetch({
        username: username,
        passwordHash: hash,
        passwordSalt: salt
      })
      res.send(newUser)
    } catch (err) {
      res.status(501).send({ error: 'Something went wrong' })
    }
  })

  app.post('/sign-in', async (req, res) => {
    const { username, password } = req.body

    const user = await UserModel.query().findOne({ username })

    if (!user) {
      res.send({ message: 'Please try again' })
      return
    }

    const [hashedPassword] = hashPassword(password, user.passwordSalt)

    if (hashedPassword !== user.passwordHash) {
      res.status(403).send({ message: 'Wrong credentials' })
    }

    const token = jwt.sign({
        payload: { user: { userId: user.user_id, username: user.username } }
      },
      process.env.JWT_SECRET, { expiresIn: '20 min', algorithm: 'HS512' })

    res.send({ token })
  })
}

module.exports = usersRoutes
