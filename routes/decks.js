const auth = require('../security/auth')
const jwt = require('jsonwebtoken')
const { NotFoundError } = require('objection')

const UserModel = require('../models/UserModel')
const DeckModel = require('../models/DeckModel')

const decksRoutes = ({ app, database }) => {
  app.post('/decks/:userId/add', auth, async (req, res) => {
    const {
      headers: { authentication },
      params: { userId },
      body: { deckName }
    } = req

    const userIdFromToken = jwt.decode(authentication).payload.user.userId

    try {
      const user = await UserModel.query().findById(userId)
      const userDecks = await  DeckModel.query()
        .select("*")
        .where('decks.user_id', '=', user.user_id)

      const existingDeck = userDecks.filter(deck => deck.deckname === deckName)
      if (userIdFromToken !== Number(userId)) {
        res.status(403).send({ message: 'You\'re not allowed to add a deck to this user' })
        return
      }

      if (existingDeck.length > 0) {
        res.status(406).send({message: 'This deck name already exist'})
        return
      }

      const newDeck = await DeckModel.query().insertAndFetch({ deckname: deckName, user_id: user.user_id })
      res.send({ message: `🎇 Deck with name ${deckName} created`, deck: newDeck })
    } catch (e) {
      res.status(500).send({ message: 'An error occurred' })
    }
  })

  app.get('/decks/:userId', auth, async (req, res) => {
    const { userId } = req.params

    try {
      const decks = await DeckModel.query()
        .select('decks')
        .where('decks.user_id', '=', userId)

      res.send(decks)
    } catch (e) {
      if (e instanceof NotFoundError) {
        res.status(401).send({ message: 'User does not exist' })
      }
      res.status(501).send({ message: 'Oupsi' })
    }
  })
}

module.exports = decksRoutes
