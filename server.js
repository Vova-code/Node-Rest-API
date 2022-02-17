const express = require('express')
const { Model } = require('objection')
const knex = require('knex')
const knexfile = require('./knexfile')

const database = knex(knexfile)
Model.knex(database)

const usersRoutes = require('./routes/users')
const decksRoutes = require('./routes/decks')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello You')
})

usersRoutes({ app, database })
decksRoutes({app, database})

app.listen(process.env.PORT, () => {
  console.info(`🎉 App started on port : ${process.env.PORT}`)
})
